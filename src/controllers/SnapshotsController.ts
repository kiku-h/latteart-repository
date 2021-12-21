/**
 * Copyright 2021 NTT Corporation.
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

import LoggingService from "@/logger/LoggingService";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { ConfigsService } from "@/services/ConfigsService";
import { ImageFileRepositoryServiceImpl } from "@/services/ImageFileRepositoryService";
import { IssueReportOutputServiceImpl } from "@/services/IssueReportOutputService";
import { IssueReportServiceImpl } from "@/services/IssueReportService";
import { NotesService } from "@/services/NotesService";
import { ProjectsService } from "@/services/ProjectsService";
import { SnapshotFileRepositoryServiceImpl } from "@/services/SnapshotFileRepositoryService";
import { TestPurposeService } from "@/services/TestPurposeService";
import { TestResultServiceImpl } from "@/services/TestResultService";
import { TestStepServiceImpl } from "@/services/TestStepService";
import { TimestampServiceImpl } from "@/services/TimestampService";
import { Controller, Get, Post, Route, Path } from "tsoa";
import {
  attachedFileDirectoryService,
  screenshotDirectoryService,
  snapshotDirectoryService,
  transactionRunner,
} from "..";
import { CreateResponse } from "../interfaces/Snapshots";
import { SnapshotsService } from "../services/SnapshotsService";

@Route("projects/{projectId}/snapshots")
export class SnapshotsController extends Controller {
  @Get()
  public async get(@Path() projectId: string): Promise<string[]> {
    return this.createSnapshotsService().getSnapshotUrl(projectId);
  }

  @Post()
  public async create(@Path() projectId: string): Promise<CreateResponse> {
    try {
      return await this.createSnapshotsService().createSnapshot(projectId);
    } catch (error) {
      LoggingService.error("Save snapshot failed.", error);

      throw new ServerError(500, {
        code: ServerErrorCode.SAVE_SNAPSHOT_FAILED,
      });
    }
  }

  private createSnapshotsService() {
    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });

    const testStepService = new TestStepServiceImpl({
      imageFileRepository: imageFileRepositoryService,
      timestamp: timestampService,
      config: new ConfigsService(),
    });

    const testResultService = new TestResultServiceImpl({
      timestamp: timestampService,
      testStep: testStepService,
    });

    const noteService = new NotesService({
      imageFileRepository: imageFileRepositoryService,
      timestamp: timestampService,
    });

    const testPurposeService = new TestPurposeService();

    const issueReportService = new IssueReportServiceImpl({
      issueReportOutput: new IssueReportOutputServiceImpl(),
      testResult: testResultService,
      testStep: testStepService,
      testPurpose: testPurposeService,
      note: noteService,
    });

    const snapshotFileRepositoryService = new SnapshotFileRepositoryServiceImpl(
      {
        staticDirectory: snapshotDirectoryService,
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        testResult: testResultService,
        testStep: testStepService,
        note: noteService,
        testPurpose: testPurposeService,
        config: new ConfigsService(),
        issueReport: issueReportService,
        attachedFileRepository: attachedFileDirectoryService,
      }
    );

    return new SnapshotsService({
      snapshotFileRepository: snapshotFileRepositoryService,
      project: new ProjectsService(
        {
          timestamp: new TimestampServiceImpl(),
        },
        transactionRunner
      ),
    });
  }
}
