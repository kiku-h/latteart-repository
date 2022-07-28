import { TestResultEntity } from "@/entities/TestResultEntity";
import { TestStepEntity } from "@/entities/TestStepEntity";
import {
  TestStepService,
  TestStepServiceImpl,
} from "@/services/TestStepService";
import { ImageFileRepositoryService } from "@/services/ImageFileRepositoryService";
import { TimestampService } from "@/services/TimestampService";
import { ConfigsService } from "@/services/ConfigsService";
import { getRepository } from "typeorm";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";
import { CreateTestStepDto } from "@/interfaces/TestSteps";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("TestStepService", () => {
  describe("#createTestStep", () => {
    it("テストステップを1件新規追加する", async () => {
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
      const service = new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      });

      const testResultEntity = await getRepository(TestResultEntity).save(
        new TestResultEntity()
      );

      const requestBody: CreateTestStepDto = {
        input: "input",
        type: "type",
        elementInfo: null,
        title: "title",
        url: "url",
        imageData: "imageData",
        windowHandle: "windowHandle",
        screenElements: [],
        inputElements: [],
        keywordTexts: [],
        timestamp: 0,
        pageSource: "pageSource",
      };

      const operationData = {
        input: requestBody.input,
        type: requestBody.type,
        elementInfo: requestBody.elementInfo,
        title: requestBody.title,
        url: requestBody.url,
        imageFileUrl: "testStep.png",
        timestamp: `${requestBody.timestamp}`,
        inputElements: requestBody.inputElements,
        windowHandle: requestBody.windowHandle,
        keywordTexts: requestBody.keywordTexts,
      };

      const coverageSource = {
        title: requestBody.title,
        url: requestBody.url,
        screenElements: requestBody.screenElements,
      };

      const inputElementInfo = {
        title: requestBody.title,
        url: requestBody.url,
        inputElements: requestBody.inputElements,
      };

      const result = await service.createTestStep(
        testResultEntity.id,
        requestBody
      );

      expect(result).toEqual({
        id: expect.any(String),
        operation: operationData,
        coverageSource: coverageSource,
        inputElementInfo: inputElementInfo,
      });

      expect(imageFileRepositoryService.writeBase64ToFile).toBeCalledWith(
        expect.any(String),
        requestBody.imageData
      );
    });
  });

  describe("#getTestStep", () => {
    it("テストステップを1件取得する", async () => {
      const imageFileRepositoryService: ImageFileRepositoryService = {
        writeBufferToFile: jest.fn(),
        writeBase64ToFile: jest.fn(),
        removeFile: jest.fn(),
        getFilePath: jest.fn(),
        getFileUrl: jest.fn(),
      };

      const timestampService: TimestampService = {
        unix: jest.fn().mockReturnValue(0),
        format: jest.fn(),
        epochMilliseconds: jest.fn(),
      };
      const service = new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      });
      const testResultEntity = await getRepository(TestResultEntity).save(
        new TestResultEntity()
      );

      const testStepEntity = await getRepository(TestStepEntity).save(
        new TestStepEntity({ testResult: testResultEntity })
      );

      const operationData = {
        input: testStepEntity.operationInput,
        type: testStepEntity.operationType,
        elementInfo: JSON.parse(testStepEntity.operationElement),
        title: testStepEntity.pageTitle,
        url: testStepEntity.pageUrl,
        imageFileUrl: testStepEntity.screenshot?.fileUrl ?? "",
        timestamp: `${testStepEntity.timestamp}`,
        inputElements: JSON.parse(testStepEntity.inputElements),
        windowHandle: testStepEntity.windowHandle,
        keywordTexts: JSON.parse(testStepEntity.keywordTexts),
      };

      const result = await service.getTestStep(testStepEntity.id);

      expect(result).toEqual({
        id: testStepEntity.id,
        operation: operationData,
        intention: null,
        bugs: [],
        notices: [],
      });
    });
  });

  describe("#compareTestSteps", () => {
    let testStepService: TestStepService;

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
    });

    describe("2つのテストステップの差分を抽出する", () => {
      const baseRequestBody: CreateTestStepDto = {
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

      let testResultId: string;

      beforeEach(async () => {
        const testResultEntity = await getRepository(TestResultEntity).save(
          new TestResultEntity()
        );
        testResultId = testResultEntity.id;
      });

      it("テストステップ内の操作の各パラメータを比較する", async () => {
        const requestBody1: CreateTestStepDto = {
          ...baseRequestBody,
          keywordTexts: ["aaa", "bbb", "ccc"],
        };
        const requestBody2: CreateTestStepDto = {
          ...baseRequestBody,
          keywordTexts: ["aaa", "bbb", "ddd"],
        };

        const testStep1 = await testStepService.createTestStep(
          testResultId,
          requestBody1
        );
        const testStep2 = await testStepService.createTestStep(
          testResultId,
          requestBody2
        );

        expect(
          await testStepService.compareTestSteps(testStep1.id, testStep2.id)
        ).toEqual({
          keywordTexts: {
            a: '["aaa","bbb","ccc"]',
            b: '["aaa","bbb","ddd"]',
          },
        });

        expect(
          await testStepService.compareTestSteps(testStep1.id, testStep1.id)
        ).toEqual({});
      });

      it("指定のテストステップIDに対応するテストステップがない場合は操作の各パラメータをundefinedとみなして比較する", async () => {
        const testStep = await testStepService.createTestStep(
          testResultId,
          baseRequestBody
        );

        expect(
          await testStepService.compareTestSteps(testStep.id, "unknownId")
        ).toEqual({
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
        });

        expect(
          await testStepService.compareTestSteps("unknownId", "unknownId")
        ).toEqual({});
      });

      it("オプションで無視するパラメータ名が指定されていた場合は、そのパラメータを比較対象から除外する", async () => {
        const requestBody1: CreateTestStepDto = {
          ...baseRequestBody,
          keywordTexts: ["aaa", "bbb", "ccc"],
        };
        const requestBody2: CreateTestStepDto = {
          ...baseRequestBody,
          keywordTexts: ["aaa", "bbb", "ddd"],
        };

        const testStep1 = await testStepService.createTestStep(
          testResultId,
          requestBody1
        );
        const testStep2 = await testStepService.createTestStep(
          testResultId,
          requestBody2
        );

        const option = { excludeParamNames: ["keywordTexts"] };

        expect(
          await testStepService.compareTestSteps(
            testStep1.id,
            testStep2.id,
            option
          )
        ).toEqual({});
      });
    });
  });
});
