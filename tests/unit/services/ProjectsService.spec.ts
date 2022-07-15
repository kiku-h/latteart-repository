import { ProgressDataEntity } from "@/entities/ProgressDataEntity";
import { ProjectEntity } from "@/entities/ProjectEntity";
import { Project, UpdateProjectDto } from "@/interfaces/Projects";
import { ProjectsServiceImpl } from "@/services/ProjectsService";
import { TimestampService } from "@/services/TimestampService";
import { TransactionRunner } from "@/TransactionRunner";
import { getRepository } from "typeorm";
import { SqliteTestConnectionHelper } from "../../helper/TestConnectionHelper";

const testConnectionHelper = new SqliteTestConnectionHelper();

beforeEach(async () => {
  await testConnectionHelper.createTestConnection({ logging: false });
});

afterEach(async () => {
  await testConnectionHelper.closeTestConnection();
});

describe("ProjectsService", () => {
  describe("#updateProject", () => {
    describe("プロジェクトの進捗状況を更新する", () => {
      let timestampService: TimestampService;
      let service: ProjectsServiceImpl;

      const firstDate = "0";
      const projectName = "projectName1";

      const requestBodyForRegister: UpdateProjectDto = {
        testMatrices: [
          {
            id: "",
            name: "testMatrixName1",
            index: 0,
            groups: [
              {
                id: "",
                name: "groupName1",
                index: 0,
                testTargets: [
                  {
                    id: "",
                    name: "testTargetName1",
                    index: 0,
                    plans: [],
                  },
                ],
              },
            ],
          },
        ],
        stories: [],
        progressDatas: [
          {
            testMatrixId: "",
            testMatrixProgressDatas: [
              {
                date: firstDate,
                groups: [
                  {
                    id: "",
                    name: "groupName1",
                    testTargets: [
                      {
                        id: "",
                        name: "testTargetName1",
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

      beforeEach(async () => {
        timestampService = {
          unix: jest.fn(),
          format: jest.fn(),
          epochMilliseconds: jest.fn(),
        };

        service = new ProjectsServiceImpl(
          { timestamp: timestampService },
          new TransactionRunner()
        );

        await getRepository(ProjectEntity).save(new ProjectEntity(projectName));
      });

      it("テストマトリクス、テスト対象グループ、テスト対象の初回登録時", async () => {
        const existsProject = (await getRepository(ProjectEntity).find())[0];
        const registeredProject = await service.updateProject(
          existsProject.id,
          requestBodyForRegister
        );

        const progressDataEntities = await getRepository(
          ProgressDataEntity
        ).find({
          relations: ["testMatrix"],
        });

        expect(progressDataEntities.length).toEqual(1);

        const progressDataEntity = progressDataEntities[0];

        expect(progressDataEntity.date).toEqual(firstDate);
        expect(progressDataEntity.testMatrix.id).toEqual(
          registeredProject.testMatrices[0].id
        );

        const group = registeredProject.testMatrices[0].groups[0];
        const testTarget = group.testTargets[0];
        const progress =
          requestBodyForRegister.progressDatas[0].testMatrixProgressDatas[0]
            .groups[0].testTargets[0].progress;
        expect(progressDataEntity.text).toEqual(
          `[{"id":"${group.id}","name":"${group.name}","testTargets":[{"id":"${
            testTarget.id
          }","name":"${testTarget.name}","progress":${JSON.stringify(
            progress
          )}}]}]`
        );
      });

      describe("テストマトリクス、テスト対象グループ、テスト対象の更新時", () => {
        function createRequestBodyForUpdate(
          registeredProject: Project,
          date: string
        ) {
          const registeredTestMatrix = registeredProject.testMatrices[0];
          const registeredgroup = registeredTestMatrix.groups[0];
          const registeredTestTarget = registeredgroup.testTargets[0];

          return {
            ...requestBodyForRegister,
            testMatrices: [
              {
                id: registeredTestMatrix.id,
                name: "testMatrixName2",
                index: 0,
                groups: [
                  {
                    ...requestBodyForRegister.testMatrices[0].groups[0],
                    id: registeredgroup.id,
                    name: "groupName2",
                    index: 0,
                    testTargets: [
                      {
                        ...requestBodyForRegister.testMatrices[0].groups[0]
                          .testTargets[0],
                        id: registeredTestTarget.id,
                        name: "testTarget2",
                        index: 0,
                      },
                    ],
                  },
                ],
              },
            ],
            progressDatas: [
              {
                testMatrixId: registeredTestMatrix.id,
                testMatrixProgressDatas: [
                  {
                    ...requestBodyForRegister.progressDatas[0]
                      .testMatrixProgressDatas[0],
                    date,
                    groups: [
                      {
                        ...requestBodyForRegister.progressDatas[0]
                          .testMatrixProgressDatas[0].groups[0],
                        id: registeredgroup.id,
                        name: "groupName2",
                        testTargets: [
                          {
                            ...requestBodyForRegister.progressDatas[0]
                              .testMatrixProgressDatas[0].groups[0]
                              .testTargets[0],
                            id: registeredTestTarget.id,
                            name: "testTarget2",
                            progress: {
                              completedNumber: 1,
                              incompletedNumber: 1,
                              planNumber: 1,
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
        }

        it("同日の更新", async () => {
          // 登録
          const existsProject = (await getRepository(ProjectEntity).find())[0];
          const registeredProject = await service.updateProject(
            existsProject.id,
            requestBodyForRegister
          );

          const requestBodyForUpdate = createRequestBodyForUpdate(
            registeredProject,
            firstDate
          );

          // 更新
          const updatedProject = await service.updateProject(
            existsProject.id,
            requestBodyForUpdate
          );

          const progressDataEntities = await getRepository(
            ProgressDataEntity
          ).find({
            relations: ["testMatrix"],
          });

          expect(progressDataEntities.length).toEqual(1);

          // 更新後の進捗の確認
          const progressDataEntity = progressDataEntities[0];

          expect(progressDataEntity.date).toEqual(firstDate);
          expect(progressDataEntity.testMatrix.id).toEqual(
            updatedProject.testMatrices[0].id
          );

          const group = updatedProject.testMatrices[0].groups[0];
          const testTarget = group.testTargets[0];
          const progress =
            requestBodyForUpdate.progressDatas[0].testMatrixProgressDatas[0]
              .groups[0].testTargets[0].progress;
          expect(progressDataEntity.text).toEqual(
            `[{"id":"${group.id}","name":"${
              group.name
            }","testTargets":[{"id":"${testTarget.id}","name":"${
              testTarget.name
            }","progress":${JSON.stringify(progress)}}]}]`
          );
        });

        it("別日の更新", async () => {
          const existsProject = (await getRepository(ProjectEntity).find())[0];

          // 登録
          const registeredProject = await service.updateProject(
            existsProject.id,
            requestBodyForRegister
          );

          const secondDate = "1";

          const requestBodyForUpdate = createRequestBodyForUpdate(
            registeredProject,
            secondDate
          );

          // 更新
          const updatedProject = await service.updateProject(
            existsProject.id,
            requestBodyForUpdate
          );

          const progressDataEntities = await getRepository(
            ProgressDataEntity
          ).find({
            relations: ["testMatrix"],
          });

          expect(progressDataEntities.length).toEqual(2);

          // 1日目の進捗の確認
          const progressDataEntity1 = progressDataEntities[0];

          expect(progressDataEntity1.date).toEqual(firstDate);
          expect(progressDataEntity1.testMatrix.id).toEqual(
            updatedProject.testMatrices[0].id
          );

          const group1 = registeredProject.testMatrices[0].groups[0];
          const testTarget1 = group1.testTargets[0];
          const progress1 =
            requestBodyForRegister.progressDatas[0].testMatrixProgressDatas[0]
              .groups[0].testTargets[0].progress;
          expect(progressDataEntity1.text).toEqual(
            `[{"id":"${group1.id}","name":"${
              group1.name
            }","testTargets":[{"id":"${testTarget1.id}","name":"${
              testTarget1.name
            }","progress":${JSON.stringify(progress1)}}]}]`
          );

          // 2日目の進捗の確認
          const progressDataEntity2 = progressDataEntities[1];

          expect(progressDataEntity2.date).toEqual(secondDate);
          expect(progressDataEntity2.testMatrix.id).toEqual(
            updatedProject.testMatrices[0].id
          );

          const group2 = updatedProject.testMatrices[0].groups[0];
          const testTarget2 = group2.testTargets[0];
          const progress2 =
            requestBodyForUpdate.progressDatas[0].testMatrixProgressDatas[0]
              .groups[0].testTargets[0].progress;
          expect(progressDataEntity2.text).toEqual(
            `[{"id":"${group2.id}","name":"${
              group2.name
            }","testTargets":[{"id":"${testTarget2.id}","name":"${
              testTarget2.name
            }","progress":${JSON.stringify(progress2)}}]}]`
          );
        });
      });
    });
  });
});
