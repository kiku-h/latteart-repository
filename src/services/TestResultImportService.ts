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

import { TestResultService } from "./TestResultService";
import path from "path";
import { TestStepService } from "./TestStepService";
import { NotesServiceImpl } from "./NotesService";
import { TestPurposeServiceImpl } from "./TestPurposeService";
import { ImportFileRepositoryService } from "./ImportFileRepositoryService";
import { deserializeTestResult } from "@/lib/deserializeTestResult";
import { getRepository } from "typeorm";
import { TestResultEntity } from "@/entities/TestResultEntity";

export class TestResultImportService {
  constructor(
    private service: {
      testResult: TestResultService;
      testStep: TestStepService;
      testPurpose: TestPurposeServiceImpl;
      note: NotesServiceImpl;
      importFileRepository: ImportFileRepositoryService;
    }
  ) {}

  public async importTestResult(
    importFile: { data: string; name: string },
    testResultId: string | null
  ): Promise<{ testResultId: string }> {
    console.log(importFile.name);

    const importedData = await this.service.importFileRepository.readImportFile(
      importFile.data
    );

    const testResult = deserializeTestResult(importedData.testResultFile.data);

    const newTestResult = await this.service.testResult.createTestResult(
      testResult,
      testResultId
    );

    await Promise.all(
      testResult.testSteps.map(async (testStep) => {
        const imageFileBaseName = path.basename(
          testStep.operation.imageFileUrl
        );
        const newTestStep = await this.service.testStep.createTestStep(
          newTestResult.id,
          {
            input: testStep.operation.input,
            type: testStep.operation.type,
            elementInfo: testStep.operation.elementInfo,
            title: testStep.operation.title,
            url: testStep.operation.url,
            imageData:
              importedData.screenshots.find(
                (screenshot) => screenshot.filePath === imageFileBaseName
              )?.data ?? "",
            windowHandle: testStep.operation.windowHandle,
            screenElements:
              testResult.coverageSources.find(
                (coverageSource) =>
                  coverageSource.title === testStep.operation.title &&
                  coverageSource.url === testStep.operation.url
              )?.screenElements ?? [],
            inputElements: testStep.operation.inputElements,
            keywordTexts: testStep.operation.keywordTexts,
            timestamp: parseInt(testStep.operation.timestamp, 10),
            pageSource: "",
          }
        );

        if (testStep.testPurpose) {
          const newTestPurpose =
            await this.service.testPurpose.createTestPurpose(
              newTestResult.id,
              testStep.testPurpose
            );

          await this.service.testStep.attachTestPurposeToTestStep(
            newTestStep.id,
            newTestPurpose.id
          );
        }

        const newNoteIds = await Promise.all(
          testStep.notes.map(async (note) => {
            const imageData =
              importedData.screenshots.find(
                (screenshot) => screenshot.filePath === note.imageFileUrl
              )?.data ?? "";

            return (
              await this.service.note.createNote(newTestResult.id, {
                ...note,
                imageData,
              })
            ).id;
          })
        );

        await this.service.testStep.attachNotesToTestStep(
          newTestStep.id,
          newNoteIds
        );
      })
    );

    if (testResultId) {
      getRepository(TestResultEntity);
    }

    return {
      testResultId: newTestResult.id,
    };
  }
}
