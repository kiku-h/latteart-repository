/**
 * Copyright 2022 NTT Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NoteEntity } from "@/entities/NoteEntity";
import { ScreenshotEntity } from "@/entities/ScreenshotEntity";
import { TestPurposeEntity } from "@/entities/TestPurposeEntity";
import { TestResultEntity } from "@/entities/TestResultEntity";
import { TestStepEntity } from "@/entities/TestStepEntity";
import {
  GetTestStepResponse,
  CreateTestStepDto,
  CreateTestStepResponse,
  PatchTestStepResponse,
  ElementInfo,
  Operation,
  TestStep,
} from "@/interfaces/TestSteps";
import { getRepository } from "typeorm";
import { TimestampService } from "./TimestampService";
import { ImageFileRepositoryService } from "./ImageFileRepositoryService";
import { CoverageSourceEntity } from "@/entities/CoverageSourceEntity";
import { ConfigsService } from "./ConfigsService";
import {
  DiffCheckFunction,
  OperationDiffChecker,
} from "@/lib/OperationDiffChecker";
import LoggingService from "@/logger/LoggingService";

export interface TestStepService {
  getTestStep(testStepId: string): Promise<GetTestStepResponse>;

  createTestStep(
    testResultId: string,
    requestBody: CreateTestStepDto
  ): Promise<CreateTestStepResponse>;

  attachNotesToTestStep(
    testStepId: string,
    noteIds: string[]
  ): Promise<PatchTestStepResponse>;

  attachTestPurposeToTestStep(
    testStepId: string,
    testPurposeId: string | null
  ): Promise<PatchTestStepResponse>;

  getTestStepOperation(testStepId: string): Promise<{
    input: string;
    type: string;
    elementInfo: any;
    title: string;
    url: string;
    imageFileUrl: string;
    timestamp: string;
    inputElements: any;
    windowHandle: string;
    keywordTexts: any;
  }>;

  getTestStepOperationForDB(testStepId: string): Promise<{
    input: string;
    type: string;
    elementInfo: ElementInfo | null;
    title: string;
    url: string;
    imageFileUrl: string;
    timestamp: string;
    inputElements: ElementInfo[];
    windowHandle: string;
    keywordTexts: string[];
    screenElements: { tagname: string; ownedText?: string | null }[];
  }>;

  getTestStepScreenshot(
    testStepId: string
  ): Promise<{ id: string; fileUrl: string }>;

  compareTestSteps(
    testStepId1: string,
    testStepId2: string,
    option?: Partial<{ excludeParamNames: string[] }>,
    excludeTagsNames?: string[]
  ): Promise<{
    [key: string]: { a: string | undefined; b: string | undefined };
  }>;
}

export class TestStepServiceImpl implements TestStepService {
  constructor(
    private service: {
      imageFileRepository: ImageFileRepositoryService;
      timestamp: TimestampService;
      config: ConfigsService;
    }
  ) {}

  public async getTestStep(testStepId: string): Promise<GetTestStepResponse> {
    const testStepEntity = await this.getTestStepEntity(testStepId);

    return this.convertTestStepEntityToTestStep(testStepEntity);
  }

  public async getTestStepForDiff(testStepId: string): Promise<TestStep> {
    const testStepEntity = await this.getTestStepEntity(testStepId);

    return this.convertTestStepEntityToTestStepForDiff(testStepEntity);
  }

  public async createTestStep(
    testResultId: string,
    requestBody: CreateTestStepDto
  ): Promise<CreateTestStepResponse> {
    // update test result.
    const testResultEntity = await getRepository(
      TestResultEntity
    ).findOneOrFail(testResultId, {
      relations: ["coverageSources"],
    });

    const targetCoverageSource = testResultEntity.coverageSources?.find(
      (coverageSource) => {
        return (
          coverageSource.title === requestBody.title &&
          coverageSource.url === requestBody.url
        );
      }
    );
    if (targetCoverageSource) {
      const newElements: ElementInfo[] = [
        ...JSON.parse(targetCoverageSource.screenElements),
        ...(await this.removeIgnoreTagsFrom(requestBody.screenElements)),
      ];
      targetCoverageSource.screenElements = JSON.stringify(
        newElements.filter((newElement, index) => {
          return (
            newElements.findIndex((elem) => elem.xpath === newElement.xpath) ===
            index
          );
        })
      );
    } else {
      testResultEntity.coverageSources?.push(
        new CoverageSourceEntity({
          title: requestBody.title,
          url: requestBody.url,
          screenElements: JSON.stringify(requestBody.screenElements),
          testResult: testResultEntity,
        })
      );
    }

    const savedTestResultEntity = await getRepository(TestResultEntity).save({
      ...testResultEntity,
    });

    const screenTagAndText = requestBody.screenElements
      .filter((element) => {
        return element.ownedText;
      })
      .map((element) => {
        return {
          tagname: element.tagname,
          ownedText: element.ownedText,
        };
      });

    // add test step.
    const newTestStepEntity = await getRepository(TestStepEntity).save({
      pageTitle: requestBody.title,
      pageUrl: requestBody.url,
      operationType: requestBody.type,
      operationInput: requestBody.input,
      operationElement: JSON.stringify(requestBody.elementInfo),
      inputElements: JSON.stringify(requestBody.inputElements),
      windowHandle: requestBody.windowHandle,
      keywordTexts: JSON.stringify(requestBody.keywordTexts ?? []),
      screenElements: JSON.stringify(screenTagAndText),
      timestamp: requestBody.timestamp,
      testResult: savedTestResultEntity,
    });
    const screenshot = new ScreenshotEntity({
      fileUrl: await this.service.imageFileRepository.writeBase64ToFile(
        `${newTestStepEntity.id}.png`,
        requestBody.imageData
      ),
      testResult: savedTestResultEntity,
    });
    newTestStepEntity.screenshot = screenshot;
    const savedTestStepEntity = await getRepository(TestStepEntity).save(
      newTestStepEntity
    );

    // result operation.
    const operation = await this.getOperationFromTestStepEntity(
      savedTestStepEntity
    );

    // result coverage source.
    const savedCoverageSourceEntity =
      savedTestResultEntity.coverageSources?.find(
        ({ url, title }) =>
          url === requestBody.url && title === requestBody.title
      );
    const coverageSource = {
      title: savedCoverageSourceEntity?.title ?? "",
      url: savedCoverageSourceEntity?.url ?? "",
      screenElements: savedCoverageSourceEntity
        ? JSON.parse(savedCoverageSourceEntity.screenElements)
        : [],
    };

    return {
      id: newTestStepEntity.id,
      operation,
      coverageSource,
    };
  }

  public async attachNotesToTestStep(
    testStepId: string,
    noteIds: string[]
  ): Promise<PatchTestStepResponse> {
    const testStepEntity = await this.getTestStepEntity(testStepId);

    const noteEntities = (
      await Promise.all(
        noteIds.map(async (noteId) => {
          const noteEntity = await getRepository(NoteEntity).findOne(noteId);

          return noteEntity ? [noteEntity] : [];
        })
      )
    ).flat();

    testStepEntity.notes = [...noteEntities];

    const updatedTestStepEntity = await getRepository(TestStepEntity).save(
      testStepEntity
    );

    return this.convertTestStepEntityToTestStep(updatedTestStepEntity);
  }

  public async attachTestPurposeToTestStep(
    testStepId: string,
    testPurposeId: string | null
  ): Promise<PatchTestStepResponse> {
    const testStepEntity = await this.getTestStepEntity(testStepId);

    const noteEntity = testPurposeId
      ? (await getRepository(TestPurposeEntity).findOne(testPurposeId)) ?? null
      : null;

    testStepEntity.testPurpose = noteEntity;

    const updatedTestStepEntity = await getRepository(TestStepEntity).save(
      testStepEntity
    );

    return this.convertTestStepEntityToTestStep(updatedTestStepEntity);
  }

  public async getTestStepOperation(testStepId: string): Promise<{
    input: string;
    type: string;
    elementInfo: any;
    title: string;
    url: string;
    imageFileUrl: string;
    timestamp: string;
    inputElements: any;
    windowHandle: string;
    keywordTexts: any;
  }> {
    const testStepEntity = await getRepository(TestStepEntity).findOneOrFail(
      testStepId,
      {
        relations: ["screenshot"],
      }
    );

    return this.getOperationFromTestStepEntity(testStepEntity);
  }

  public async getTestStepOperationForDB(testStepId: string): Promise<{
    input: string;
    type: string;
    elementInfo: ElementInfo | null;
    title: string;
    url: string;
    imageFileUrl: string;
    timestamp: string;
    inputElements: ElementInfo[];
    windowHandle: string;
    keywordTexts: string[];
    screenElements: { tagname: string; ownedText?: string | null }[];
  }> {
    const testStepEntity = await getRepository(TestStepEntity).findOneOrFail(
      testStepId,
      {
        relations: ["screenshot"],
      }
    );

    return this.getOperationFromTestStepEntityForDB(testStepEntity);
  }

  public async getTestStepScreenshot(
    testStepId: string
  ): Promise<{ id: string; fileUrl: string }> {
    const testStepEntity = await getRepository(TestStepEntity).findOne(
      testStepId,
      {
        relations: ["screenshot"],
      }
    );

    return {
      id: testStepEntity?.screenshot?.id ?? "",
      fileUrl: testStepEntity?.screenshot?.fileUrl ?? "",
    };
  }

  public async compareTestSteps(
    testStepId1: string,
    testStepId2: string,
    option: Partial<{ excludeParamNames: string[] }> = {},
    excludeTagsNames: string[]
  ): Promise<{
    [key: string]: { a: string | undefined; b: string | undefined };
  }> {
    const testStep1 = await this.getTestStepForDiff(testStepId1).catch(
      (error) => {
        LoggingService.warn(error);
        return undefined;
      }
    );
    const testStep2 = await this.getTestStepForDiff(testStepId2).catch(
      (error) => {
        LoggingService.warn(error);
        return undefined;
      }
    );

    const paramNameToOptions: [
      paramName: keyof Operation,
      options: { name?: string; func?: DiffCheckFunction }
    ][] =
      option.excludeParamNames?.map((paramName) => {
        return [paramName as keyof Operation, { func: () => undefined }];
      }) ?? [];

    return new OperationDiffChecker(...paramNameToOptions).diff(
      testStep1?.operation,
      testStep2?.operation,
      excludeTagsNames
    );
  }

  private async getOperationFromTestStepEntity(testStepEntity: TestStepEntity) {
    return {
      input: testStepEntity.operationInput,
      type: testStepEntity.operationType,
      elementInfo: JSON.parse(testStepEntity.operationElement),
      title: testStepEntity.pageTitle,
      url: testStepEntity.pageUrl,
      imageFileUrl: testStepEntity.screenshot?.fileUrl ?? "",
      timestamp: testStepEntity.timestamp.toString(),
      inputElements: JSON.parse(testStepEntity.inputElements),
      windowHandle: testStepEntity.windowHandle,
      keywordTexts: JSON.parse(testStepEntity.keywordTexts),
    };
  }

  private async getOperationFromTestStepEntityForDB(
    testStepEntity: TestStepEntity
  ) {
    return {
      input: testStepEntity.operationInput,
      type: testStepEntity.operationType,
      elementInfo: JSON.parse(testStepEntity.operationElement),
      title: testStepEntity.pageTitle,
      url: testStepEntity.pageUrl,
      imageFileUrl: testStepEntity.screenshot?.fileUrl ?? "",
      timestamp: testStepEntity.timestamp.toString(),
      inputElements: JSON.parse(testStepEntity.inputElements),
      windowHandle: testStepEntity.windowHandle,
      keywordTexts: JSON.parse(testStepEntity.keywordTexts),
      screenElements: JSON.parse(testStepEntity.screenElements),
    };
  }

  private async convertTestStepEntityToTestStep(entity: TestStepEntity) {
    return {
      id: entity.id,
      operation: await this.getOperationFromTestStepEntity(entity),
      intention: entity.testPurpose ? entity.testPurpose.id : null,
      bugs: [],
      notices: entity.notes?.map((note) => note.id) ?? [],
    };
  }

  private async convertTestStepEntityToTestStepForDiff(entity: TestStepEntity) {
    return {
      id: entity.id,
      operation: await this.getOperationFromTestStepEntityForDB(entity),
      intention: entity.testPurpose ? entity.testPurpose.id : null,
      bugs: [],
      notices: entity.notes?.map((note) => note.id) ?? [],
    };
  }

  private async getTestStepEntity(testStepId: string) {
    return getRepository(TestStepEntity).findOneOrFail(testStepId, {
      relations: ["notes", "testPurpose", "screenshot"],
    });
  }

  private async removeIgnoreTagsFrom(screenElements: ElementInfo[]) {
    const ignoreTags = (await this.service.config.getConfig("")).captureSettings
      .ignoreTags;

    return screenElements.filter((elmInfo) => {
      return !(
        ignoreTags.includes(elmInfo.tagname.toUpperCase()) ||
        ignoreTags.includes(elmInfo.tagname.toLowerCase())
      );
    });
  }
}
