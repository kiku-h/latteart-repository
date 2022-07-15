import { ImageFileRepositoryService } from "@/services/ImageFileRepositoryService";
import { NotesService } from "@/services/NotesService";
import { ProjectImportService } from "@/services/ProjectImportService";
import { StaticDirectoryService } from "@/services/StaticDirectoryService";
import { TestPurposeService } from "@/services/TestPurposeService";
import { TestResultService } from "@/services/TestResultService";
import { TestStepService } from "@/services/TestStepService";
import { TimestampService } from "@/services/TimestampService";
import { TransactionRunner } from "@/TransactionRunner";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";

import {
  createTimestampServiceMock,
  createTestResultServiceMock,
  createTestStepServiceMock,
  createImageFileRepositoryServiceMock,
  createStaticDirectoryServiceMock,
  createNotesServiceMock,
  createTestPurposeServiceMock,
} from "../../helper/createServiceMock";
import { ProgressData, Project } from "@/interfaces/Projects";
import { getRepository } from "typeorm";
import { ProjectEntity } from "@/entities/ProjectEntity";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("ProjectImportService", () => {
  describe("#import", () => {
    let timestampService: TimestampService;
    let testResultService: TestResultService;
    let testStepService: TestStepService;
    let screenshotRepositoryService: ImageFileRepositoryService;
    let attachedFileRepositoryService: ImageFileRepositoryService;
    let importDirectoryRepositoryService: ImageFileRepositoryService;
    let importDirectoryService: StaticDirectoryService;
    let notesService: NotesService;
    let testPurposeService: TestPurposeService;

    beforeEach(() => {
      timestampService = createTimestampServiceMock();
      testResultService = createTestResultServiceMock();
      testStepService = createTestStepServiceMock();
      screenshotRepositoryService = createImageFileRepositoryServiceMock();
      attachedFileRepositoryService = createImageFileRepositoryServiceMock();
      importDirectoryRepositoryService = createImageFileRepositoryServiceMock();
      importDirectoryService = createStaticDirectoryServiceMock();
      notesService = createNotesServiceMock();
      testPurposeService = createTestPurposeServiceMock();
    });

    it("includeProject: true, includeTestResults: true", async () => {
      const service = new ProjectImportService();
      service["getFileData"] = jest.fn().mockResolvedValue([
        { filePath: "test-results/testResultId/log.json", data: "{}" },
        { filePath: "projects/projectId/project.json", data: "{}" },
      ]);
      service["extractTestResultsData"] = jest.fn().mockReturnValue([]);
      service["importTestResults"] = jest.fn().mockResolvedValue(new Map());
      service["extractProjectData"] = jest.fn().mockReturnValue({});
      service["importProject"] = jest.fn().mockResolvedValue("1");

      await service.import("importFileName", true, true, {
        timestampService,
        testResultService,
        testStepService,
        screenshotRepositoryService,
        attachedFileRepositoryService,
        importDirectoryRepositoryService,
        importDirectoryService,
        notesService,
        testPurposeService,
        transactionRunner: new TransactionRunner(),
      });

      expect(service["extractTestResultsData"]).toBeCalledTimes(1);
      expect(service["importTestResults"]).toBeCalledTimes(1);
      expect(service["extractProjectData"]).toBeCalledTimes(1);
      expect(service["importProject"]).toBeCalledTimes(1);
    });

    it("includeProject: false, includeTestResults: false", async () => {
      const service = new ProjectImportService();
      service["getFileData"] = jest.fn().mockResolvedValue([
        { filePath: "test-results/testResultId/log.json", data: "{}" },
        { filePath: "projects/projectId/project.json", data: "{}" },
      ]);
      service["extractTestResultsData"] = jest.fn().mockReturnValue([]);
      service["importTestResults"] = jest.fn().mockResolvedValue(new Map());
      service["extractProjectData"] = jest.fn().mockReturnValue({});
      service["importProject"] = jest.fn().mockResolvedValue("1");

      await service.import("importFileName", false, false, {
        timestampService,
        testResultService,
        testStepService,
        screenshotRepositoryService,
        attachedFileRepositoryService,
        importDirectoryRepositoryService,
        importDirectoryService,
        notesService,
        testPurposeService,
        transactionRunner: new TransactionRunner(),
      });

      expect(service["extractTestResultsData"]).toBeCalledTimes(0);
      expect(service["importTestResults"]).toBeCalledTimes(0);
      expect(service["extractProjectData"]).toBeCalledTimes(0);
      expect(service["importProject"]).toBeCalledTimes(0);
    });
  });

  describe("#extractTestResultsData", () => {
    it("テスト実行結果データの抽出", () => {
      const testResultFiles = [
        {
          filePath: "test-results/testResultId1/log.json",
          data: "{1}",
        },
        {
          filePath: "test-results/testResultId1/aaaa.webp",
          data: "aaa",
        },
        {
          filePath: "test-results/testResultId2/log.json",
          data: "{2}",
        },
        {
          filePath: "test-results/testResultId2/bbbb.webp",
          data: "bbb",
        },
      ];
      const result = new ProjectImportService()["extractTestResultsData"](
        testResultFiles
      );
      expect(result).toEqual([
        {
          screenshots: [
            { data: "", filePath: "test-results/testResultId1/aaaa.webp" },
          ],
          testResultFile: {
            data: "{1}",
            fileName: "test-results/testResultId1/log.json",
          },
          testResultId: "testResultId1",
        },
        {
          screenshots: [
            { data: "", filePath: "test-results/testResultId2/bbbb.webp" },
          ],
          testResultFile: {
            data: "{2}",
            fileName: "test-results/testResultId2/log.json",
          },
          testResultId: "testResultId2",
        },
      ]);
    });
  });

  describe("#importTestResults", () => {
    it("テスト結果の登録", async () => {
      const timestampService: TimestampService = createTimestampServiceMock();
      const testResultService: TestResultService =
        createTestResultServiceMock();
      testResultService.createTestResult = jest.fn().mockResolvedValue({
        id: "testResultId",
      });
      const testStepService: TestStepService = createTestStepServiceMock();
      testStepService.createTestStep = jest.fn().mockResolvedValue({
        id: "testStepId",
      });
      const notesService: NotesService = createNotesServiceMock();
      const testPurposeService: TestPurposeService =
        createTestPurposeServiceMock();
      testPurposeService.createTestPurpose = jest.fn().mockResolvedValue({
        id: "testPurposeId",
      });

      const testResult: any = {
        version: 0,
        name: "session_xxx",
        sessionId: "xxxx-xxxx-xxxx-xxxx",
        startTimestamp: 1641263325,
        endTimestamp: 1,
        initialUrl: "http:localhost:3000",
        history: {
          "1": {
            testStep: {
              timestamp: "1641263336921",
              imageFileUrl:
                "56e836bd-87a8-4834-8c13-529002b14b5b_compressed.webp",
              windowInfo: {
                windowHandle: "CDwindow-83BF9E3354052DD29237FE5377C948C2",
              },
              pageInfo: {
                title: "test",
                url: "http:localhost:3000",
                keywordTexts: ["test"],
              },
              operation: {
                input: "",
                type: "screen_transition",
                elementInfo: null,
              },
              inputElements: [],
            },
            intention: "1de00c52-fa30-42b8-b1bb-51642877db88",
            bugs: [],
            notices: [],
          },
        },
        notes: [
          {
            id: "1de00c52-fa30-42b8-b1bb-51642877db88",
            type: "intention",
            value: "最初のテスト目的",
            details: "",
            imageFileUrl: "",
            tags: [],
          },
        ],
        coverageSources: [
          {
            title: "test",
            url: "http://localhost:3000",
            screenElements: [],
          },
        ],
        inputElementInfos: [],
      };

      const testResultData = [
        {
          screenshots: [
            { data: "", filePath: "test-results/testResultId1/aaaa.webp" },
          ],
          testResultFile: {
            data: JSON.stringify(testResult),
            fileName: "test-results/testResultId1/log.json",
          },
          testResultId: "testResultId1",
        },
      ];

      const service = new ProjectImportService();
      await service["importTestResults"](testResultData, {
        timestampService,
        testResultService,
        testStepService,
        notesService,
        testPurposeService,
      });

      expect(testResultService.createTestResult).toHaveBeenCalledTimes(1);
      expect(testStepService.createTestStep).toHaveBeenCalledTimes(1);
      expect(testPurposeService.createTestPurpose).toHaveBeenCalledTimes(1);
    });
  });

  describe("#extractProjectData", () => {
    it("プロジェクトデータの抽出", () => {
      const files = [
        {
          filePath: "projects/projectId1/project.json",
          data: "{}",
        },
        {
          filePath: "projects/projectId1/storyId1/sessionId1/aaa.webp",
          data: "",
        },
        {
          filePath: "projects/projectId1/storyId1/sessionId2/bbb.webp",
          data: "",
        },
        {
          filePath: "projects/projectId1/storyId2/sessionId1/ccc.webp",
          data: "",
        },
      ];
      const service = new ProjectImportService();
      const result = service["extractProjectData"](files);

      const projectData = {
        projectId: "projectId1",
        projectFile: { fileName: "project.json", data: "{}" },
        stories: [
          {
            storyId: "storyId1",
            sessions: [
              {
                sessionId: "sessionId1",
                attachedFiles: [
                  {
                    filePath:
                      "projects/projectId1/storyId1/sessionId1/aaa.webp",
                    data: "",
                  },
                ],
              },
              {
                sessionId: "sessionId2",
                attachedFiles: [
                  {
                    filePath:
                      "projects/projectId1/storyId1/sessionId2/bbb.webp",
                    data: "",
                  },
                ],
              },
            ],
          },
          {
            storyId: "storyId2",
            sessions: [
              {
                sessionId: "sessionId1",
                attachedFiles: [
                  {
                    filePath:
                      "projects/projectId1/storyId2/sessionId1/ccc.webp",
                    data: "",
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(result).toEqual(projectData);
    });
  });

  describe("#importProject", () => {
    it("プロジェクトの登録", async () => {
      const timestampService = createTimestampServiceMock();
      const attachedFileRepositoryService =
        createImageFileRepositoryServiceMock();

      const projectJson: Project & {
        progressDatas: ProgressData[];
      } = {
        id: "projectId",
        name: "projectName",
        testMatrices: [
          {
            id: "testMatrixId",
            name: "testMatrixName",
            index: 0,
            groups: [
              {
                id: "groupId",
                name: "groupName",
                index: 0,
                testTargets: [
                  {
                    id: "testTargetId",
                    name: "testTargetName",
                    index: 0,
                    plans: [
                      {
                        viewPointId: "viewPointId",
                        value: 0,
                      },
                    ],
                  },
                ],
              },
            ],
            viewPoints: [
              {
                id: "viewPointId",
                name: "viewPointName",
                description: "viewPointDescription",
                index: 0,
              },
            ],
          },
        ],
        stories: [
          {
            id: "storyId",
            testMatrixId: "testMatrixId",
            testTargetId: "testTargetId",
            viewPointId: "viewPointId",
            status: "ok",
            sessions: [],
          },
        ],
        progressDatas: [
          {
            testMatrixId: "testMatrixId",
            testMatrixProgressDatas: [
              {
                date: "20200101",
                groups: [
                  {
                    id: "groupId",
                    name: "groupName",
                    testTargets: [
                      {
                        id: "testTargetId",
                        name: "testTargetName",
                        progress: {
                          completedNumber: 0,
                          incompletedNumber: 0,
                          planNumber: 0,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const projectData = {
        projectId: "projectId",
        projectFile: {
          fileName: "project.json",
          data: JSON.stringify(projectJson),
        },
        stories: [],
      };

      const service = new ProjectImportService();
      const projectId = await service["importProject"](projectData, new Map(), {
        timestampService,
        attachedFileRepositoryService,
        transactionRunner: new TransactionRunner(),
      });

      const project = await getRepository(ProjectEntity).findOne(projectId);

      expect(projectId).toEqual(project?.id);
    });
  });
});
