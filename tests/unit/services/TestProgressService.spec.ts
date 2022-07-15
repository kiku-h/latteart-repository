import { StoryEntity } from "@/entities/StoryEntity";
import { TestProgressEntity } from "@/entities/TestProgressEntity";
import { TestTargetEntity } from "@/entities/TestTargetEntity";
import { TestTargetGroupEntity } from "@/entities/TestTargetGroupEntity";
import { TestProgressServiceImpl } from "@/services/TestProgressService";
import { getRepository } from "typeorm";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("TestProgressService", () => {
  describe("#registerTestProgress", () => {
    it("テスト進捗を登録する", async () => {
      const storyEntity = await getRepository(StoryEntity).save(
        (() => {
          const story = new StoryEntity();
          story.status = "";
          story.index = 0;
          story.planedSessionNumber = 0;
          return story;
        })()
      );

      const storyId = storyEntity.id;
      const progress = {
        plannedSessionNumber: 1,
        completedSessionNumber: 2,
        incompletedSessionNumber: 3,
      };

      await new TestProgressServiceImpl().registerTestProgress(storyId, {
        ...progress,
      });

      const progressEntities = await getRepository(TestProgressEntity).find({
        relations: ["story"],
      });

      expect(progressEntities[0].story.id).toEqual(storyId);
      expect(progressEntities[0].plannedSessionNumber).toEqual(
        progress.plannedSessionNumber
      );
      expect(progressEntities[0].completedSessionNumber).toEqual(
        progress.completedSessionNumber
      );
      expect(progressEntities[0].incompletedSessionNumber).toEqual(
        progress.incompletedSessionNumber
      );
    });
  });

  describe("#collectDailyTestProgresses", () => {
    it("日ごとのテスト進捗を取得する", async () => {
      const testTargetGroupEntity = await getRepository(
        TestTargetGroupEntity
      ).save(
        (() => {
          const group = new TestTargetGroupEntity();
          group.name = "";
          group.index = 0;
          return group;
        })()
      );
      const testTargetEntity = await getRepository(TestTargetEntity).save(
        (() => {
          const testTarget = new TestTargetEntity();
          testTarget.name = "";
          testTarget.index = 0;
          testTarget.text = "";
          testTarget.testTargetGroup = testTargetGroupEntity;
          return testTarget;
        })()
      );
      const storyEntity = await getRepository(StoryEntity).save(
        (() => {
          const story = new StoryEntity();
          story.status = "";
          story.index = 0;
          story.planedSessionNumber = 0;
          story.testTarget = testTargetEntity;
          return story;
        })()
      );

      const storyId = storyEntity.id;
      const progress = {
        plannedSessionNumber: 1,
        completedSessionNumber: 2,
        incompletedSessionNumber: 3,
      };

      const service = new TestProgressServiceImpl();
      await service.registerTestProgress(storyId, {
        ...progress,
      });

      const result = await service.collectDailyTestProgresses([storyId]);

      expect(result[0].storyProgresses).toEqual([
        {
          storyId,
          plannedSessionNumber: progress.plannedSessionNumber,
          completedSessionNumber: progress.completedSessionNumber,
          incompletedSessionNumber: progress.incompletedSessionNumber,
          testMatrixId: null,
          testTargetGroupId: testTargetGroupEntity.id,
          testTargetId: testTargetEntity.id,
          viewPointId: null,
        },
      ]);
      expect(result[0].date).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    });
  });
});
