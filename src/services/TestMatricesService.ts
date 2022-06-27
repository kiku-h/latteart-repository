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
import { TestMatrixEntity } from "@/entities/TestMatrixEntity";
import { TestMatrix } from "@/interfaces/TestMatrices";
import { getRepository } from "typeorm";

export class TestMatricesService {
  public async get(testMatrixId: string): Promise<TestMatrix> {
    const testMatrix = await getRepository(TestMatrixEntity).findOne(
      testMatrixId,
      { relations: ["testTargetGroups", "viewPoints"] }
    );

    if (!testMatrix) {
      throw new Error(`TestMatrix not found. ${testMatrix}`);
    }

    return this.testMatrixEntityToResponse(testMatrix);
  }

  public async post(body: {
    projectId: string;
    name: string;
  }): Promise<TestMatrix> {
    const projectEntity = await getRepository(ProjectEntity).findOne(
      body.projectId,
      {
        relations: ["testMatrices"],
      }
    );
    if (!projectEntity) {
      throw new Error(`Project not found. ${body.projectId}`);
    }
    const nextIndex = projectEntity.testMatrices.length;
    const testMatrix = await getRepository(TestMatrixEntity).save(
      new TestMatrixEntity(body.name, nextIndex, projectEntity)
    );
    return this.testMatrixEntityToResponse(testMatrix);
  }

  public async patch(
    testMatrixId: string,
    body: { name: string }
  ): Promise<TestMatrix> {
    const testMatrixRepository = getRepository(TestMatrixEntity);
    let testMatrix = await testMatrixRepository.findOne(testMatrixId);
    if (!testMatrix) {
      throw new Error(`TestMatrix not found. ${testMatrixId}`);
    }
    if (testMatrix.name !== body.name) {
      testMatrix.name = body.name;
      testMatrix = await testMatrixRepository.save(testMatrix);
    }
    return this.testMatrixEntityToResponse(testMatrix);
  }

  public async delete(testMatrixId: string): Promise<void> {
    await getRepository(TestMatrixEntity).delete(testMatrixId);
    return;
  }

  private testMatrixEntityToResponse(testMatrix: TestMatrixEntity): TestMatrix {
    return {
      id: testMatrix.id,
      name: testMatrix.name,
      index: testMatrix.index,
      groupIds: (testMatrix.testTargetGroups ?? [])
        .sort((t1, t2) => {
          return t1.index - t2.index;
        })
        .map((t) => t.id),
      viewPointIds: (testMatrix.viewPoints ?? []).map((v) => v.id),
    };
  }
}
