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

import { AttachedFileEntity } from "@/entities/AttachedFilesEntity";
import { SessionEntity } from "@/entities/SessionEntity";
import { StoryEntity } from "@/entities/StoryEntity";
import { TestResultEntity } from "@/entities/TestResultEntity";
import {
  PatchSessionDto,
  PatchSessionResponse,
  PostSessionResponse,
  Session,
} from "@/interfaces/Sessions";
import { sessionEntityToResponse } from "@/lib/entityToResponse";
import { getRepository } from "typeorm";
import { ImageFileRepositoryService } from "./ImageFileRepositoryService";
import { TimestampService } from "./TimestampService";

export class SessionsService {
  public async postSession(storyId: string): Promise<PostSessionResponse> {
    const storyRepository = getRepository(StoryEntity);
    const story = await storyRepository.findOne(storyId, {
      relations: ["sessions"],
    });
    if (!story) {
      throw new Error(`Story not found. ${storyId}`);
    }

    const session = await getRepository(SessionEntity).save(
      new SessionEntity({
        name: "",
        memo: "",
        index: story.sessions.length,
        testItem: "",
        testUser: "",
        testingTime: 0,
        doneDate: "",
        story,
      })
    );

    return await this.entityToResponse(session.id);
  }

  public async patchSession(
    projectId: string,
    sessionId: string,
    requestBody: PatchSessionDto,
    service: {
      timestampService: TimestampService;
      imageFileRepositoryService: ImageFileRepositoryService;
    }
  ): Promise<PatchSessionResponse> {
    const sessionRepository = getRepository(SessionEntity);
    const updateTargetSession = await sessionRepository.findOne(sessionId, {
      relations: ["testResult", "story", "attachedFiles"],
    });
    if (!updateTargetSession) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    if (requestBody.attachedFiles !== undefined) {
      updateTargetSession.attachedFiles = await this.updateAttachedFiles(
        updateTargetSession,
        requestBody.attachedFiles,
        service
      );
    }

    if (requestBody.isDone !== undefined) {
      updateTargetSession.doneDate = requestBody.isDone
        ? service.timestampService.format("YYYYMMDDHHmmss")
        : "";
    }
    if (requestBody.memo !== undefined) {
      updateTargetSession.memo = requestBody.memo;
    }
    if (requestBody.name !== undefined) {
      updateTargetSession.name = requestBody.name;
    }
    if (requestBody.testItem !== undefined) {
      updateTargetSession.testItem = requestBody.testItem;
    }
    if (requestBody.testerName !== undefined) {
      updateTargetSession.testUser = requestBody.testerName;
    }

    if (requestBody.testResultFiles) {
      if (requestBody.testResultFiles.length > 0) {
        const testResult = await getRepository(TestResultEntity).findOne(
          requestBody.testResultFiles[0].id
        );
        if (!testResult) {
          throw new Error("test result not found.");
        }
        updateTargetSession.testResult = testResult;
      } else {
        updateTargetSession.testResult = null;
      }
    }
    const result = await sessionRepository.save(updateTargetSession);

    return await this.entityToResponse(result.id);
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const sessionRepository = getRepository(SessionEntity);
    await sessionRepository.delete(sessionId);

    return;
  }

  private async updateAttachedFiles(
    existsSession: SessionEntity,
    requestAttachedFiles: PatchSessionDto["attachedFiles"],
    service: {
      timestampService: TimestampService;
      imageFileRepositoryService: ImageFileRepositoryService;
    }
  ): Promise<AttachedFileEntity[]> {
    if (!requestAttachedFiles) {
      return [];
    }

    const existsAttachedFiles = existsSession.attachedFiles ?? [];
    const result = [];

    for (const attachedFile of requestAttachedFiles) {
      if (attachedFile.fileUrl) {
        const existsAttachedFile = existsAttachedFiles.find(
          (existsAttachedFile) =>
            existsAttachedFile.fileUrl === attachedFile.fileUrl
        );
        if (!existsAttachedFile) {
          throw new Error(`AttachedFile not found: ${attachedFile.fileUrl}`);
        }
        result.push(existsAttachedFile);
      } else if (attachedFile.fileData) {
        const attachedFileImageUrl =
          await service.imageFileRepositoryService.writeBase64ToFile(
            `${service.timestampService.unix().toString()}_${
              attachedFile.name
            }`,
            attachedFile?.fileData as string
          );

        result.push(
          new AttachedFileEntity({
            session: existsSession,
            name: attachedFile.name,
            fileUrl: attachedFileImageUrl,
          })
        );
      }
    }
    return result;
  }

  private async entityToResponse(sessionId: string): Promise<Session> {
    const session = await getRepository(SessionEntity).findOne(sessionId, {
      relations: [
        "attachedFiles",
        "testResult",
        "testResult.notes",
        "testResult.notes.testSteps",
        "testResult.notes.testSteps.screenshot",
        "testResult.notes.tags",
      ],
    });
    if (!session) {
      throw new Error(`Session not found. ${sessionId}`);
    }
    return sessionEntityToResponse(session);
  }
}
