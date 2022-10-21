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

import { CoverageSourceEntity } from "@/entities/CoverageSourceEntity";
import { NoteEntity } from "@/entities/NoteEntity";
import { ScreenshotEntity } from "@/entities/ScreenshotEntity";
import { SessionEntity } from "@/entities/SessionEntity";
import { TestPurposeEntity } from "@/entities/TestPurposeEntity";
import { TestResultEntity } from "@/entities/TestResultEntity";
import { TestStepEntity } from "@/entities/TestStepEntity";
import {
  CreateTestResultDto,
  ListTestResultResponse,
  CreateTestResultResponse,
  GetTestResultResponse,
  PatchTestResultResponse,
  GetTestResultForDB,
} from "@/interfaces/TestResults";
import { TransactionRunner } from "@/TransactionRunner";
import { getRepository } from "typeorm";
import {
  StaticDirectoryService,
  StaticDirectoryServiceImpl,
} from "./StaticDirectoryService";
import { TestStepService } from "./TestStepService";
import { TimestampService } from "./TimestampService";
import path from "path";
import fs from "fs-extra";
import os from "os";
import FileArchiver from "@/lib/FileArchiver";

export interface TestResultService {
  getTestResultIdentifiers(): Promise<ListTestResultResponse[]>;

  getTestResult(id: string): Promise<GetTestResultResponse | undefined>;

  getTestResultForDB(id: string): Promise<GetTestResultForDB | undefined>;

  createTestResult(
    body: CreateTestResultDto,
    testResultId: string | null
  ): Promise<CreateTestResultResponse>;

  patchTestResult(params: {
    id: string;
    name?: string;
    startTime?: number;
    initialUrl?: string;
  }): Promise<PatchTestResultResponse>;

  collectAllTestStepIds(testResultId: string): Promise<string[]>;

  collectAllTestPurposeIds(testResultId: string): Promise<string[]>;

  collectAllTestStepScreenshots(
    testResultId: string
  ): Promise<{ id: string; fileUrl: string }[]>;

  compareTestResults(
    testResultId1: string,
    testResultId2: string,
    option?: Partial<{
      excludeParamNames: string[];
      excludeTagsNames: string[];
    }>
  ): Promise<{
    diffs: {
      [key: string]: {
        a: string | undefined;
        b: string | undefined;
      };
    }[];
    isSame: boolean;
    url: string;
  }>;
}

export class TestResultServiceImpl implements TestResultService {
  constructor(
    private service: {
      staticDirectory: StaticDirectoryService;
      timestamp: TimestampService;
      testStep: TestStepService;
    }
  ) {}

  public async getTestResultIdentifiers(): Promise<ListTestResultResponse[]> {
    const testResultEntities = await getRepository(TestResultEntity).find();

    return testResultEntities.map((testResult) => {
      return {
        id: testResult.id,
        name: testResult.name,
        source: testResult.source,
      };
    });
  }

  public async getTestResult(
    id: string
  ): Promise<GetTestResultResponse | undefined> {
    try {
      const testResultEntity = await getRepository(
        TestResultEntity
      ).findOneOrFail(id, {
        relations: [
          "testSteps",
          "testSteps.screenshot",
          "testSteps.notes",
          "testSteps.notes.tags",
          "testSteps.notes.screenshot",
          "testSteps.testPurpose",
        ],
      });
      const { coverageSources } = await getRepository(
        TestResultEntity
      ).findOneOrFail(id, {
        relations: ["coverageSources"],
      });

      return await this.convertTestResultEntityToTestResult({
        coverageSources,
        ...testResultEntity,
      });
    } catch (error) {
      return undefined;
    }
  }

  public async getTestResultForDB(
    id: string
  ): Promise<GetTestResultForDB | undefined> {
    try {
      const isForDB = true;
      const testResultEntity = await getRepository(
        TestResultEntity
      ).findOneOrFail(id, {
        relations: [
          "testSteps",
          "testSteps.screenshot",
          "testSteps.notes",
          "testSteps.notes.tags",
          "testSteps.notes.screenshot",
          "testSteps.testPurpose",
        ],
      });
      const { coverageSources } = await getRepository(
        TestResultEntity
      ).findOneOrFail(id, {
        relations: ["coverageSources"],
      });

      return await this.convertTestResultEntityToTestResult(
        {
          coverageSources,
          ...testResultEntity,
        },
        isForDB
      );
    } catch (error) {
      return undefined;
    }
  }

  public async createTestResult(
    body: CreateTestResultDto,
    testResultId: string | null
  ): Promise<CreateTestResultResponse> {
    const createTimestamp = body.initialUrl
      ? this.service.timestamp.epochMilliseconds()
      : 0;
    const startTimestamp = body.startTimeStamp ?? createTimestamp;

    const endTimestamp = -1;

    const repository = getRepository(TestResultEntity);

    const newTestResult = await repository.save({
      name:
        body.name ??
        `session_${this.service.timestamp.format("YYYYMMDD_HHmmss")}`,
      startTimestamp,
      endTimestamp,
      initialUrl: body.initialUrl ?? "",
      source: body.source ?? "",
      testSteps: [],
      coverageSources: [],
      testPurposes: [],
      notes: [],
      screenshots: [],
    });

    if (testResultId) {
      const oldTestResult = await repository.findOne(testResultId);
      const sessionRepository = getRepository(SessionEntity);
      sessionRepository.update(
        { testResult: oldTestResult },
        { testResult: newTestResult }
      );
    }

    return {
      id: newTestResult.id,
      name: newTestResult.name,
      source: newTestResult.source,
    };
  }

  public async deleteTestResult(
    testResultId: string,
    transactionRunner: TransactionRunner,
    screenshotDirectoryService: StaticDirectoryServiceImpl
  ): Promise<void> {
    const sessions = await getRepository(SessionEntity).find({
      testResult: { id: testResultId },
    });
    if (sessions.length > 1) {
      throw new Error(
        "Linked to Session: sessionId:" + sessions.map((session) => session.id)
      );
    }

    await transactionRunner.waitAndRun(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(NoteEntity, {
        testResult: { id: testResultId },
      });

      await transactionalEntityManager.delete(TestStepEntity, {
        testResult: { id: testResultId },
      });
      await transactionalEntityManager.delete(CoverageSourceEntity, {
        testResult: { id: testResultId },
      });
      await transactionalEntityManager.delete(TestPurposeEntity, {
        testResult: { id: testResultId },
      });

      const fileUrls = (
        await transactionalEntityManager.find(ScreenshotEntity, {
          testResult: { id: testResultId },
        })
      ).map((screenshot) => screenshot.fileUrl);

      await transactionalEntityManager.delete(ScreenshotEntity, {
        testResult: { id: testResultId },
      });
      await transactionalEntityManager.delete(TestResultEntity, testResultId);

      fileUrls.forEach((fileUrl) => {
        screenshotDirectoryService.removeFile(path.basename(fileUrl));
      });
    });
    return;
  }

  public async patchTestResult(params: {
    id: string;
    name?: string;
    startTime?: number;
    initialUrl?: string;
  }): Promise<PatchTestResultResponse> {
    const id = params.id;
    const testResultEntity = await getRepository(
      TestResultEntity
    ).findOneOrFail(id, {
      relations: [
        "testSteps",
        "testSteps.screenshot",
        "testSteps.notes",
        "testSteps.notes.tags",
        "testSteps.notes.screenshot",
        "testSteps.testPurpose",
      ],
    });

    const { coverageSources } = await getRepository(
      TestResultEntity
    ).findOneOrFail(id, {
      relations: ["coverageSources"],
    });

    if (params.initialUrl) {
      testResultEntity.initialUrl = params.initialUrl;
    }

    if (params.name) {
      testResultEntity.name = params.name;
    }

    if (params.startTime) {
      testResultEntity.startTimestamp = params.startTime;
    }

    const updatedTestResultEntity = await getRepository(TestResultEntity).save(
      testResultEntity
    );

    return this.convertTestResultEntityToTestResult({
      coverageSources,
      ...updatedTestResultEntity,
    });
  }

  public async collectAllTestStepIds(testResultId: string): Promise<string[]> {
    const testResultEntity = await getRepository(TestResultEntity).findOne(
      testResultId,
      {
        relations: ["testSteps"],
      }
    );

    return (
      testResultEntity?.testSteps
        ?.slice()
        .sort(
          (testStepA, testStepB) => testStepA.timestamp - testStepB.timestamp
        )
        .map((testStep) => testStep.id) ?? []
    );
  }

  public async collectAllTestPurposeIds(
    testResultId: string
  ): Promise<string[]> {
    const testResultEntity = await getRepository(TestResultEntity).findOne(
      testResultId
    );

    return testResultEntity?.testPurposeIds ?? [];
  }

  public async collectAllTestStepScreenshots(
    testResultId: string
  ): Promise<{ id: string; fileUrl: string }[]> {
    const testResultEntity = await getRepository(TestResultEntity).findOne(
      testResultId,
      {
        relations: ["testSteps", "testSteps.screenshot"],
      }
    );

    const screenshots =
      testResultEntity?.testSteps?.flatMap(({ screenshot }) => {
        if (!screenshot) {
          return [];
        }

        return [{ id: screenshot.id, fileUrl: screenshot.fileUrl }];
      }) ?? [];

    return screenshots;
  }

  public async compareTestResults(
    testResultId1: string,
    testResultId2: string,
    option: Partial<{
      excludeParamNames: string[];
      excludeTagsNames: string[];
    }> = {}
  ): Promise<{
    diffs: {
      [key: string]: {
        a: string | undefined;
        b: string | undefined;
      };
    }[];
    isSame: boolean;
    hasInvalidScreenshots: boolean;
    url: string;
  }> {
    const timestamp = this.service.timestamp.format("YYYYMMDD_HHmmss");

    const tmpDirPath = await fs.mkdtemp(path.join(os.tmpdir(), "latteart-"));

    const outputDirectoryPath = path.join(tmpDirPath, `compare_${timestamp}`);
    const outputImageDiffPath = path.join(outputDirectoryPath, "screenshots");

    await fs.mkdirp(outputImageDiffPath);

    const testStepIds1 = await this.collectAllTestStepIds(testResultId1);
    const testStepIds2 = await this.collectAllTestStepIds(testResultId2);

    const length =
      testStepIds1.length > testStepIds2.length
        ? testStepIds1.length
        : testStepIds2.length;

    const diffs = await Promise.all(
      Array(length)
        .fill("")
        .map(async (_, index) => {
          const testStepId1 = testStepIds1[index] ?? "";
          const testStepId2 = testStepIds2[index] ?? "";

          return this.service.testStep.compareTestSteps(
            testStepId1,
            testStepId2,
            outputImageDiffPath,
            option
          );
        })
    );

    const isDifferent = diffs.some((diff) => {
      return Object.entries(diff).some(([key, value]) => {
        return key !== "screenshot" ? true : value.a === "skip" ? false : true;
      });
    });
    const hasInvalidScreenshots = diffs.some((diff) => {
      return diff["screenshot"]
        ? diff["screenshot"].a === "skip" && diff["screenshot"].b === "skip"
        : false;
    });

    const outputPath = path.join(outputDirectoryPath, `diffs.json`);
    await fs.outputFile(outputPath, JSON.stringify(diffs));

    const zipFilePath = await new FileArchiver(outputDirectoryPath, {
      deleteSource: true,
    }).zip();

    const zipFileName = path.basename(zipFilePath);

    await this.service.staticDirectory.moveFile(zipFilePath, zipFileName);

    const data = {
      diffs,
      hasInvalidScreenshots,
      isSame: !isDifferent,
      url: this.service.staticDirectory.getFileUrl(zipFileName),
    };

    return data;
  }

  private async convertTestResultEntityToTestResult(
    testResultEntity: TestResultEntity,
    isForDB?: boolean
  ) {
    const testSteps = await Promise.all(
      testResultEntity.testSteps
        ?.sort(function (first, second) {
          return first.timestamp - second.timestamp;
        })
        .map(async (testStep) => {
          const operation = isForDB
            ? await this.service.testStep.getTestStepOperationForDB(testStep.id)
            : await this.service.testStep.getTestStepOperation(testStep.id);
          const notes =
            testStep.notes?.map((note) => {
              return {
                id: note.id,
                type: "notice",
                value: note.value,
                details: note.details,
                tags: note.tags?.map((tag) => tag.name) ?? [],
                imageFileUrl: note.screenshot?.fileUrl ?? "",
                timestamp: note.timestamp,
              };
            }) ?? [];

          const testPurpose = testStep.testPurpose
            ? {
                id: testStep.testPurpose.id,
                type: "intention",
                value: testStep.testPurpose.title,
                details: testStep.testPurpose.details,
                tags: [],
                imageFileUrl: "",
                timestamp: 0,
              }
            : null;

          return {
            id: testStep.id,
            operation,
            intention: testPurpose,
            notices: notes,
            bugs: [],
          };
        }) ?? []
    );

    const coverageSources =
      testResultEntity.coverageSources?.map((coverageSource) => {
        return {
          title: coverageSource.title,
          url: coverageSource.url,
          screenElements: JSON.parse(coverageSource.screenElements),
        };
      }) ?? [];

    return {
      id: testResultEntity.id,
      name: testResultEntity.name,
      source: testResultEntity.source,
      startTimeStamp: testResultEntity.startTimestamp,
      endTimeStamp: testResultEntity.endTimestamp,
      initialUrl: testResultEntity.initialUrl,
      testSteps,
      coverageSources,
    };
  }
}
