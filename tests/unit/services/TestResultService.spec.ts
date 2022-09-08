import { TestResultEntity } from "@/entities/TestResultEntity";
import { TestStepEntity } from "@/entities/TestStepEntity";
import { CreateTestResultDto } from "@/interfaces/TestResults";
import { CreateTestStepDto } from "@/interfaces/TestSteps";
import { ConfigsService } from "@/services/ConfigsService";
import { ImageFileRepositoryService } from "@/services/ImageFileRepositoryService";
import {
  TestResultService,
  TestResultServiceImpl,
} from "@/services/TestResultService";
import {
  TestStepService,
  TestStepServiceImpl,
} from "@/services/TestStepService";
import { TimestampService } from "@/services/TimestampService";
import { getRepository } from "typeorm";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("TestResultService", () => {
  describe("#collectAllTestStepIds", () => {
    it("保有するすべてのテストステップIDを取得する", async () => {
      const testResultEntity = await getRepository(TestResultEntity).save(
        new TestResultEntity()
      );

      const testStepEntities = await getRepository(TestStepEntity).save([
        new TestStepEntity({ testResult: testResultEntity }),
        new TestStepEntity({ testResult: testResultEntity }),
      ]);

      const service = new TestResultServiceImpl({
        staticDirectory: {
          mkdir: jest.fn(),
          outputFile: jest.fn(),
          removeFile: jest.fn(),
          copyFile: jest.fn(),
          getFileUrl: jest.fn(),
          getJoinedPath: jest.fn(),
          moveFile: jest.fn(),
          collectFileNames: jest.fn(),
          collectFilePaths: jest.fn(),
        },
        timestamp: {
          unix: jest.fn(),
          format: jest.fn(),
          epochMilliseconds: jest.fn(),
        },
        testStep: {
          getTestStep: jest.fn(),
          createTestStep: jest.fn(),
          attachNotesToTestStep: jest.fn(),
          attachTestPurposeToTestStep: jest.fn(),
          getTestStepOperation: jest.fn(),
          getTestStepOperationForDB: jest.fn(),
          getTestStepScreenshot: jest.fn(),
          compareTestSteps: jest.fn(),
        },
      });

      const testStepIds = await service.collectAllTestStepIds(
        testResultEntity.id
      );

      expect(testStepIds).toEqual([
        testStepEntities[0].id,
        testStepEntities[1].id,
      ]);
    });
  });

  describe("#createTestResult", () => {
    it("テスト結果を1件新規追加する", async () => {
      const service = new TestResultServiceImpl({
        staticDirectory: {
          mkdir: jest.fn(),
          outputFile: jest.fn(),
          removeFile: jest.fn(),
          copyFile: jest.fn(),
          getFileUrl: jest.fn(),
          getJoinedPath: jest.fn(),
          moveFile: jest.fn(),
          collectFileNames: jest.fn(),
          collectFilePaths: jest.fn(),
        },
        timestamp: {
          unix: jest.fn().mockReturnValue(0),
          format: jest.fn(),
          epochMilliseconds: jest.fn().mockReturnValue(0),
        },
        testStep: {
          getTestStep: jest.fn(),
          createTestStep: jest.fn(),
          attachNotesToTestStep: jest.fn(),
          attachTestPurposeToTestStep: jest.fn(),
          getTestStepOperation: jest.fn(),
          getTestStepOperationForDB: jest.fn(),
          getTestStepScreenshot: jest.fn(),
          compareTestSteps: jest.fn(),
        },
      });

      const body: CreateTestResultDto = {
        initialUrl: "initialUrl",
        name: "session_name",
      };

      const result = await service.createTestResult(body, null);

      expect(result).toEqual({
        id: expect.any(String),
        name: body.name,
      });
    });
  });

  describe("#compareTestResults", () => {
    let testResultService: TestResultService;
    let testStepService: TestStepService;
    const expectedUrl = "expectedUrl";

    const baseCreateTestStepRequestBody: CreateTestStepDto = {
      input: "",
      type: "",
      elementInfo: null,
      title: "",
      url: "",
      imageData: "",
      windowHandle: "",
      screenElements: [],
      inputElements: [],
      keywordTexts: [],
      timestamp: 0,
      pageSource: "",
    };

    beforeEach(() => {
      const imageFileRepositoryService: ImageFileRepositoryService = {
        writeBufferToFile: jest.fn(),
        writeBase64ToFile: jest.fn().mockResolvedValue("testStep.png"),
        removeFile: jest.fn(),
        getFilePath: jest.fn(),
        getFileUrl: jest.fn(),
      };

      const timestampService: TimestampService = {
        unix: jest.fn().mockReturnValue(0),
        format: jest.fn(),
        epochMilliseconds: jest.fn(),
      };

      testStepService = new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      });

      testResultService = new TestResultServiceImpl({
        staticDirectory: {
          mkdir: jest.fn(),
          outputFile: jest.fn(),
          removeFile: jest.fn(),
          copyFile: jest.fn(),
          getFileUrl: jest.fn().mockReturnValue(expectedUrl),
          getJoinedPath: jest.fn(),
          moveFile: jest.fn(),
          collectFileNames: jest.fn(),
          collectFilePaths: jest.fn(),
        },
        timestamp: timestampService,
        testStep: testStepService,
      });
    });

    describe("2つのテスト結果の差分を抽出する", () => {
      let testResultId1: string;
      let testResultId2: string;

      beforeEach(async () => {
        const testResultEntity1 = await getRepository(TestResultEntity).save(
          new TestResultEntity()
        );
        testResultId1 = testResultEntity1.id;

        const testResultEntity2 = await getRepository(TestResultEntity).save(
          new TestResultEntity()
        );
        testResultId2 = testResultEntity2.id;
      });

      it("指定されたIDのテスト結果が2つともある場合は、各テスト結果内の全ての操作を順番に比較する", async () => {
        // テスト結果1
        await testStepService.createTestStep(
          testResultId1,
          baseCreateTestStepRequestBody
        );
        await testStepService.createTestStep(
          testResultId1,
          baseCreateTestStepRequestBody
        );

        // テスト結果2
        // テストステップ1(差分無し)
        await testStepService.createTestStep(
          testResultId2,
          baseCreateTestStepRequestBody
        );
        // テストステップ2(差分あり)
        await testStepService.createTestStep(testResultId2, {
          ...baseCreateTestStepRequestBody,
          input: "aaa",
          keywordTexts: ["aaa"],
        });
        // テストステップ3(テスト結果2側にだけ存在)
        await testStepService.createTestStep(
          testResultId2,
          baseCreateTestStepRequestBody
        );

        const result = await testResultService.compareTestResults(
          testResultId1,
          testResultId2
        );

        expect(result).toEqual({
          diffs: [
            {},
            {
              input: {
                a: "",
                b: "aaa",
              },
              keywordTexts: {
                a: "[]",
                b: '["aaa"]',
              },
            },
            {
              input: {
                a: undefined,
                b: "",
              },
              type: {
                a: undefined,
                b: "",
              },
              elementInfo: {
                a: undefined,
                b: "null",
              },
              title: {
                a: undefined,
                b: "",
              },
              url: {
                a: undefined,
                b: "",
              },
              windowHandle: {
                a: undefined,
                b: "",
              },
              keywordTexts: {
                a: undefined,
                b: "[]",
              },
            },
          ],
          isSame: false,
          url: expectedUrl,
        });
      }, 10000);

      describe("指定されたIDのテスト結果が見つからない場合は、見つからないテスト結果を空として比較する", () => {
        it("1つ目のテスト結果が見つからない場合", async () => {
          await testStepService.createTestStep(
            testResultId1,
            baseCreateTestStepRequestBody
          );

          const result = await testResultService.compareTestResults(
            "unknownId",
            testResultId1
          );

          expect(result).toEqual({
            diffs: [
              {
                input: {
                  a: undefined,
                  b: "",
                },
                type: {
                  a: undefined,
                  b: "",
                },
                elementInfo: {
                  a: undefined,
                  b: "null",
                },
                title: {
                  a: undefined,
                  b: "",
                },
                url: {
                  a: undefined,
                  b: "",
                },
                windowHandle: {
                  a: undefined,
                  b: "",
                },
                keywordTexts: {
                  a: undefined,
                  b: "[]",
                },
              },
            ],
            isSame: false,
            url: expectedUrl,
          });
        });

        it("2つ目のテスト結果が見つからない場合", async () => {
          await testStepService.createTestStep(
            testResultId1,
            baseCreateTestStepRequestBody
          );

          const result = await testResultService.compareTestResults(
            testResultId1,
            "unknownId"
          );

          expect(result).toEqual({
            diffs: [
              {
                input: {
                  a: "",
                  b: undefined,
                },
                type: {
                  a: "",
                  b: undefined,
                },
                elementInfo: {
                  a: "null",
                  b: undefined,
                },
                title: {
                  a: "",
                  b: undefined,
                },
                url: {
                  a: "",
                  b: undefined,
                },
                windowHandle: {
                  a: "",
                  b: undefined,
                },
                keywordTexts: {
                  a: "[]",
                  b: undefined,
                },
              },
            ],
            isSame: false,
            url: expectedUrl,
          });
        });

        it("両方のテスト結果が見つからない場合は空配列を返す", async () => {
          const result = await testResultService.compareTestResults(
            "unknownId",
            "unknownId"
          );

          expect(result).toEqual({ diffs: [], isSame: true, url: expectedUrl });
        });

        it("オプションで無視するパラメータ名が指定されていた場合は、全ての操作でそのパラメータを比較対象から除外する", async () => {
          // テスト結果1
          await testStepService.createTestStep(
            testResultId1,
            baseCreateTestStepRequestBody
          );
          await testStepService.createTestStep(
            testResultId1,
            baseCreateTestStepRequestBody
          );

          // テスト結果2
          // テストステップ1(差分無し)
          await testStepService.createTestStep(
            testResultId2,
            baseCreateTestStepRequestBody
          );
          // テストステップ2(差分あり)
          await testStepService.createTestStep(testResultId2, {
            ...baseCreateTestStepRequestBody,
            input: "aaa",
            keywordTexts: ["aaa"],
          });
          // テストステップ3(テスト結果2側にだけ存在)
          await testStepService.createTestStep(
            testResultId2,
            baseCreateTestStepRequestBody
          );

          const option = { excludeParamNames: ["input", "keywordTexts"] };

          const result = await testResultService.compareTestResults(
            testResultId1,
            testResultId2,
            option
          );

          expect(result).toEqual({
            diffs: [
              {},
              {},
              {
                type: {
                  a: undefined,
                  b: "",
                },
                elementInfo: {
                  a: undefined,
                  b: "null",
                },
                title: {
                  a: undefined,
                  b: "",
                },
                url: {
                  a: undefined,
                  b: "",
                },
                windowHandle: {
                  a: undefined,
                  b: "",
                },
              },
            ],
            isSame: false,
            url: expectedUrl,
          });
        }, 10000);
      });
    });
  });
});
