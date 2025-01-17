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

import { TestProgressEntity } from "@/entities/TestProgressEntity";
import {
  Between,
  getRepository,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import { StoryEntity } from "@/entities/StoryEntity";
import {
  dateToFormattedString,
  unixtimeToFormattedString,
} from "@/lib/timeUtil";
import { TestTargetEntity } from "@/entities/TestTargetEntity";

export type DailyTestProgress = {
  date: string;
  storyProgresses: {
    storyId: string;
    testMatrixId: string;
    testTargetGroupId: string;
    testTargetId: string;
    viewPointId: string;
    plannedSessionNumber: number;
    completedSessionNumber: number;
    incompletedSessionNumber: number;
  }[];
};

export interface TestProgressService {
  registerTestProgresses(...storyIds: string[]): Promise<void>;

  collectDailyTestProgresses(
    storyIds: string[],
    filter?: { since?: number; until?: number }
  ): Promise<DailyTestProgress[]>;
}

export class TestProgressServiceImpl implements TestProgressService {
  public async registerTestProgresses(...storyIds: string[]): Promise<void> {
    const stories = await Promise.all(
      storyIds.map(async (storyId) => {
        const storyRepository = getRepository(StoryEntity);
        const story = await storyRepository.findOneOrFail(storyId, {
          relations: ["sessions"],
        });

        const testTargetRepository = getRepository(TestTargetEntity);
        const testTarget = await testTargetRepository.findOneOrFail(
          story.testTargetId
        );
        const plans: { viewPointId: string; value: number }[] = JSON.parse(
          testTarget.text
        );

        return {
          plannedSessionNumber:
            plans.find((plan) => plan.viewPointId === story.viewPointId)
              ?.value ?? 0,
          completedSessionNumber: story.sessions.filter(
            (session) => session.doneDate
          ).length,
          incompletedSessionNumber: story.sessions.filter(
            (session) => !session.doneDate
          ).length,
          story,
          date: new Date(),
        };
      })
    );

    const testProgressRepository = getRepository(TestProgressEntity);

    await testProgressRepository.save(stories);
  }

  public async collectDailyTestProgresses(
    storyIds: string[],
    filter: { since?: number; until?: number } = {}
  ): Promise<DailyTestProgress[]> {
    const testProgressRepository = getRepository(TestProgressEntity);

    const since =
      filter.since !== undefined
        ? unixtimeToFormattedString(filter.since, "YYYY-MM-DD HH:mm:ss")
        : undefined;
    const until =
      filter.until !== undefined
        ? unixtimeToFormattedString(filter.until, "YYYY-MM-DD HH:mm:ss")
        : undefined;

    const periodCondition =
      since && until
        ? { date: Between(since, until) }
        : since
        ? { date: MoreThanOrEqual(since) }
        : until
        ? { date: LessThanOrEqual(until) }
        : {};

    const entities = await testProgressRepository.find({
      where: {
        story: In(storyIds),
        ...periodCondition,
      },
      order: { date: "ASC" },
      relations: [
        "story",
        "story.testTarget",
        "story.testTarget.testTargetGroup",
      ],
    });

    return Array.from(
      entities.reduce((acc, entity) => {
        const date = dateToFormattedString(entity.date, "YYYY-MM-DD");

        if (!acc.has(date)) {
          acc.set(date, new Map());
        }

        acc.get(date)?.set(entity.story.id, entity);

        return acc;
      }, new Map<string, Map<string, TestProgressEntity>>())
    ).map(([date, storyIdToEntity]) => {
      return {
        date,
        storyProgresses: Array.from(storyIdToEntity.values()).map((entity) => {
          return {
            storyId: entity.story.id,
            testMatrixId: entity.story.testMatrixId,
            testTargetGroupId: entity.story.testTarget.testTargetGroup.id,
            testTargetId: entity.story.testTargetId,
            viewPointId: entity.story.viewPointId,
            plannedSessionNumber: entity.plannedSessionNumber,
            completedSessionNumber: entity.completedSessionNumber,
            incompletedSessionNumber: entity.incompletedSessionNumber,
          };
        }),
      };
    });
  }
}
