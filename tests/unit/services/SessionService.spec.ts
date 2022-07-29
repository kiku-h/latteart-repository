import { getRepository } from "typeorm";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";
import { SessionEntity } from "@/entities/SessionEntity";
import { SessionsService } from "@/services/SessionsService";
import { StoryEntity } from "@/entities/StoryEntity";
import { TimestampService } from "@/services/TimestampService";
import { ImageFileRepositoryService } from "@/services/ImageFileRepositoryService";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("SessionService", () => {
  describe("#post", () => {
    it("正常系", async () => {
      const story = new StoryEntity();
      story.index = 0;
      story.status = "ok";
      story.planedSessionNumber = 0;
      const savedStory = await getRepository(StoryEntity).save(story);

      const result = await new SessionsService().postSession(savedStory.id);

      expect(result).toEqual({
        index: 0,
        id: expect.any(String),
        attachedFiles: [],
        doneDate: "",
        isDone: false,
        issues: [],
        memo: "",
        name: "",
        testItem: "",
        testResultFiles: [],
        testerName: "",
        testingTime: 0,
      });
    });

    it("異常系", async () => {
      try {
        await new SessionsService().postSession("AAA");
      } catch (error) {
        expect((error as Error).message).toEqual(`Story not found. AAA`);
      }
    });
  });

  describe("#patch", () => {
    it("正常系", async () => {
      const story = new StoryEntity();
      story.index = 0;
      story.status = "ok";
      story.planedSessionNumber = 0;
      const savedStory = await getRepository(StoryEntity).save(story);

      const savedSession = await new SessionsService().postSession(
        savedStory.id
      );

      const timestampService: TimestampService = {
        unix: jest.fn(),
        format: jest.fn().mockReturnValue("YYYYMMDDHHmmss"),
        epochMilliseconds: jest.fn(),
      };
      const imageFileRepositoryService: ImageFileRepositoryService = {
        writeBufferToFile: jest.fn(),
        writeBase64ToFile: jest.fn().mockResolvedValue("testStep.png"),
        removeFile: jest.fn(),
        getFilePath: jest.fn(),
        getFileUrl: jest.fn(),
      };

      const result = await new SessionsService().patchSession(
        "projectId",
        savedSession.id,
        {
          isDone: true,
          memo: "memo",
          name: "name",
          testerName: "testerName",
          testingTime: 0,
        },
        {
          timestampService,
          imageFileRepositoryService,
        }
      );

      expect(result).toEqual({
        index: 0,
        id: expect.any(String),
        attachedFiles: [],
        doneDate: "YYYYMMDDHHmmss",
        isDone: true,
        issues: [],
        memo: "memo",
        name: "name",
        testItem: "",
        testResultFiles: [],
        testerName: "testerName",
        testingTime: 0,
      });
    });

    it("異常系", async () => {
      const timestampService: TimestampService = {
        unix: jest.fn(),
        format: jest.fn().mockReturnValue("YYYYMMDDHHmmss"),
        epochMilliseconds: jest.fn(),
      };
      const imageFileRepositoryService: ImageFileRepositoryService = {
        writeBufferToFile: jest.fn(),
        writeBase64ToFile: jest.fn().mockResolvedValue("testStep.png"),
        removeFile: jest.fn(),
        getFilePath: jest.fn(),
        getFileUrl: jest.fn(),
      };

      try {
        await new SessionsService().patchSession(
          "projectId",
          "AAA",
          {
            isDone: true,
            memo: "memo",
            name: "name",
            testerName: "testerName",
            testingTime: 0,
          },
          {
            timestampService,
            imageFileRepositoryService,
          }
        );
      } catch (error) {
        expect((error as Error).message).toEqual(`Session not found: AAA`);
      }
    });
  });

  describe("#delete", () => {
    it("正常系", async () => {
      const story = new StoryEntity();
      story.index = 0;
      story.status = "ok";
      story.planedSessionNumber = 0;
      const savedStory = await getRepository(StoryEntity).save(story);
      const savedSession = await new SessionsService().postSession(
        savedStory.id
      );

      const sessionRepository = getRepository(SessionEntity);
      const session1 = await sessionRepository.findOne(savedSession.id);
      if (!session1) {
        throw new Error("no session");
      }

      await new SessionsService().deleteSession(session1.id);

      const session2 = await sessionRepository.findOne(savedSession.id);

      if (session2) {
        throw new Error("delete failed");
      }
    });
  });
});
