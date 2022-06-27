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

import { StoryEntity } from "@/entities/StoryEntity";
import { TestMatrixEntity } from "@/entities/TestMatrixEntity";
import { TestTargetEntity } from "@/entities/TestTargetEntity";
import { TestTargetGroupEntity } from "@/entities/TestTargetGroupEntity";
import { TestTargetGroup } from "@/interfaces/TestTargetGroups";
import { TestTarget } from "@/interfaces/TestTargets";
import { TransactionRunner } from "@/TransactionRunner";
import { getRepository } from "typeorm";

export class TestTargetService {
  public async get(testTargetId: string): Promise<TestTarget> {
    const testTarget = await getRepository(TestTargetEntity).findOne(
      testTargetId,
      { relations: ["testTargetGroup"] }
    );

    if (!testTarget) {
      throw new Error(`TestTarget not found. ${testTargetId}`);
    }

    return this.testTargetEntityToResponse(testTarget);
  }

  public async post(
    body: {
      testTargetGroupId: string;
      name: string;
    },
    transactionRunner: TransactionRunner
  ): Promise<TestTarget> {
    const testTargetGroup = await getRepository(TestTargetGroupEntity).findOne(
      body.testTargetGroupId,
      {
        relations: [
          "testTargets",
          "testTargets.testTargetGroup",
          "testTargets.testTargetGroup.testMatrix",
          "testTargets.testTargetGroup.testMatrix.viewPoints",
        ],
      }
    );
    if (!testTargetGroup) {
      throw new Error(`TestTargetGroup not found. ${body.testTargetGroupId}`);
    }

    let savedTestTarget: TestTargetEntity | null = null;
    await transactionRunner.waitAndRun(async (transactionalEntityManager) => {
      const testTarget = new TestTargetEntity();
      testTarget.name = body.name;
      testTarget.index = testTargetGroup.testTargets.length;
      testTarget.text = "[]";
      testTarget.testTargetGroup = testTargetGroup;

      savedTestTarget = await transactionalEntityManager.save(testTarget);

      if (!savedTestTarget) {
        throw new Error(`Save failed.`);
      }

      await Promise.all(
        testTargetGroup.testMatrix.viewPoints.map(async (viewPoint) => {
          const newStory = new StoryEntity();
          newStory.status = "out-of-scope";
          newStory.index = 0;
          newStory.planedSessionNumber = 0;
          newStory.testMatrix = testTargetGroup.testMatrix;
          newStory.viewPoint = viewPoint;
          newStory.testTarget = savedTestTarget as TestTargetEntity;
          await transactionalEntityManager.save(newStory);
        })
      );
    });
    return this.testTargetEntityToResponse(
      savedTestTarget as unknown as TestTargetEntity
    );
  }

  public async patch(
    testTargetId: string,
    body: { name: string; plans?: { viewPointId: string; value: number } }
  ): Promise<TestTarget> {
    const testTargetRepository = getRepository(TestTargetEntity);
    let testTarget = await testTargetRepository.findOne(testTargetId);
    if (!testTarget) {
      throw new Error(`TestTargetnot found. ${testTargetId}`);
    }
    const text = body.plans ? JSON.stringify(body.plans) : null;
    if (testTarget.name !== body.name || (text && text !== testTarget.text)) {
      testTarget.name = body.name;
      if (text) {
        testTarget.text = text;
      }
      testTarget = await testTargetRepository.save(testTarget);
    }
    return this.testTargetEntityToResponse(testTarget);
  }

  public async delete(testTargetId: string): Promise<void> {
    await getRepository(TestTargetEntity).delete(testTargetId);
    return;
  }

  private testTargetEntityToResponse(testTarget: TestTargetEntity): TestTarget {
    return {
      id: testTarget.id,
      name: testTarget.name,
      index: testTarget.index,
      plans: JSON.stringify(testTarget.text) as any,
    };
  }
}
