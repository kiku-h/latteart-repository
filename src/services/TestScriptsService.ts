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

import { ProjectEntity } from "@/entities/ProjectEntity";
import { TestScriptOption } from "@/interfaces/TestScripts";
import {
  createWDIOLocatorFormatter,
  ElementLocatorGeneratorImpl,
} from "@/lib/elementLocator";
import ScreenDefFactory, {
  ScreenDefinitionConfig,
} from "@/lib/ScreenDefFactory";
import { invalidOperationTypeExists } from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectOperation";
import { TestScript } from "@/lib/scriptGenerator/TestScript";
import { TestScriptGeneratorImpl } from "@/lib/scriptGenerator/TestScriptGenerator";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { getRepository } from "typeorm";
import { TestResultService } from "./TestResultService";
import { TestScriptFileRepositoryService } from "./TestScriptFileRepositoryService";

export class TestScriptsService {
  constructor(
    private service: {
      testResult: TestResultService;
      testScriptFileRepository: TestScriptFileRepositoryService;
    }
  ) {}

  public async createTestScriptByProject(
    projectId: string,
    option: TestScriptOption
  ): Promise<{ url: string; invalidOperationTypeExists: boolean }> {
    const testResultIds = (
      await getRepository(ProjectEntity).findOneOrFail(projectId, {
        relations: [
          "testMatrices",
          "testMatrices.stories",
          "testMatrices.stories.sessions",
          "testMatrices.stories.sessions.testResult",
        ],
      })
    ).testMatrices.flatMap((testMatrix) => {
      return testMatrix.stories.flatMap((story) => {
        return story.sessions.flatMap((session) => {
          return session.testResult ? [session.testResult.id] : [];
        });
      });
    });

    const { testScript, invalidOperationTypeExists } =
      await this.generateTestScript({ testResultIds, option });

    if (!testScript.testSuite) {
      throw new ServerError(500, {
        code: ServerErrorCode.NO_TEST_CASES_GENERATED,
      });
    }

    const screenshots: { id: string; fileUrl: string }[] = (
      await Promise.all(
        testResultIds.map((testResultId) => {
          return this.service.testResult.collectAllTestStepScreenshots(
            testResultId
          );
        })
      )
    ).flat();

    const url = await this.service.testScriptFileRepository.write(
      {
        ...testScript,
        testSuite: testScript.testSuite,
      },
      screenshots
    );

    return { url, invalidOperationTypeExists };
  }

  public async createTestScriptByTestResult(
    testResultId: string,
    option: TestScriptOption
  ): Promise<{ url: string; invalidOperationTypeExists: boolean }> {
    const { testScript, invalidOperationTypeExists } =
      await this.generateTestScript({ testResultIds: [testResultId], option });

    if (!testScript.testSuite) {
      throw new ServerError(500, {
        code: ServerErrorCode.NO_TEST_CASES_GENERATED,
      });
    }

    const screenshots =
      await this.service.testResult.collectAllTestStepScreenshots(testResultId);

    const url = await this.service.testScriptFileRepository.write(
      {
        ...testScript,
        testSuite: testScript.testSuite,
      },
      screenshots
    );

    return { url, invalidOperationTypeExists };
  }

  private async generateTestScript(params: {
    testResultIds: string[];
    option: TestScriptOption;
  }): Promise<{
    testScript: TestScript;
    invalidOperationTypeExists: boolean;
  }> {
    const testResults = (
      await Promise.all(
        params.testResultIds.map(async (testResultId) => {
          const testResult = await this.service.testResult.getTestResult(
            testResultId
          );
          return testResult ? [testResult] : [];
        })
      )
    ).flat();

    const screenDefinitionConfig: ScreenDefinitionConfig = {
      screenDefType: params.option.view.node.unit,
      conditionGroups: params.option.view.node.definitions.map((definition) => {
        return {
          isEnabled: true,
          screenName: definition.name,
          conditions: definition.conditions.map((condition) => {
            return {
              isEnabled: true,
              definitionType: condition.target,
              matchType: condition.method,
              word: condition.value,
            };
          }),
        };
      }),
    };

    const locatorGenerator = new ElementLocatorGeneratorImpl(
      createWDIOLocatorFormatter()
    );

    const sources = testResults.map(({ initialUrl, testSteps }) => {
      return {
        initialUrl,
        history: testSteps.map(({ operation }) => {
          const url = operation.url;
          const title = operation.title;
          const keywordTexts: string[] = operation.keywordTexts ?? [];
          const screenDef = new ScreenDefFactory(screenDefinitionConfig).create(
            {
              url,
              title,
              keywordSet: new Set(keywordTexts),
            }
          );
          const elementInfo = operation.elementInfo
            ? {
                ...operation.elementInfo,
                locator: locatorGenerator.generateFrom(operation.elementInfo),
              }
            : null;

          return {
            input: operation.input,
            type: operation.type,
            elementInfo,
            url,
            screenDef,
            imageFilePath: operation.imageFileUrl,
          };
        }),
      };
    });

    const testScriptGenerationOption = {
      optimized: params.option.optimized,
      testData: {
        useDataDriven: params.option.testData.useDataDriven,
        maxGeneration: params.option.testData.maxGeneration,
      },
    };
    const testScriptGenerator = new TestScriptGeneratorImpl(
      testScriptGenerationOption
    );

    const testScript = testScriptGenerator.generate(sources);

    const invalidTypeExists = sources.some((source) => {
      return source.history.some((operation) => {
        return invalidOperationTypeExists(operation.type);
      });
    });

    return {
      testScript,
      invalidOperationTypeExists: invalidTypeExists,
    };
  }
}
