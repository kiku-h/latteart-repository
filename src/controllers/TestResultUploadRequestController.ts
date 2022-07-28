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

import { TestResultUploadRequestDto } from "../interfaces/TestResultUploadRequest";
import LoggingService from "@/logger/LoggingService";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { FileUploadRequestService } from "@/services/FileUploadRequestService";
import { Controller, Post, Route, Body } from "tsoa";
import { screenshotDirectoryService, tempDirectoryService } from "..";
import { TimestampServiceImpl } from "@/services/TimestampService";
import { ImageFileRepositoryServiceImpl } from "@/services/ImageFileRepositoryService";
import { TestResultServiceImpl } from "@/services/TestResultService";
import { TestStepServiceImpl } from "@/services/TestStepService";
import { ConfigsService } from "@/services/ConfigsService";
import { ExportFileRepositoryServiceImpl } from "@/services/ExportFileRepositoryService";
import { ExportServiceImpl } from "@/services/ExportService";
import { TempFileService } from "@/services/TempFileService";

@Route("upload-request/test-result")
export class TestResultUploadRequestController extends Controller {
  @Post()
  public async upload(
    @Body() requestBody: TestResultUploadRequestDto
  ): Promise<{ id: string }> {
    try {
      const service = new FileUploadRequestService(
        requestBody.dest.repositoryUrl
      );

      const exportFile = await this.createExportService().exportTestResult(
        requestBody.source.testResultId
      );

      const fileName = exportFile.url.split("/").pop() ?? "";
      const targetFile = {
        name: fileName,
        path: tempDirectoryService.getJoinedPath(fileName),
      };

      const fileUrls = await service.upload(targetFile);

      const result = await service.testResultImportRequest(
        { testResultFileUrl: fileUrls[0] },
        { testResultId: requestBody.dest.testResultId }
      );

      const newTestResultId = result.testResultId;

      await new TempFileService().deleteFile(fileName, tempDirectoryService);

      return { id: newTestResultId };
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("File upload request failed.", error);
        throw new ServerError(500, {
          code: ServerErrorCode.FILE_UPLOAD_REQUEST_FAILED,
        });
      }
      throw error;
    }
  }

  private createExportService() {
    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });
    const testResultService = new TestResultServiceImpl({
      staticDirectory: tempDirectoryService,
      timestamp: timestampService,
      testStep: new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      }),
    });
    const exportFileRepositoryService = new ExportFileRepositoryServiceImpl({
      staticDirectory: tempDirectoryService,
      imageFileRepository: imageFileRepositoryService,
      timestamp: timestampService,
    });

    return new ExportServiceImpl({
      testResult: testResultService,
      exportFileRepository: exportFileRepositoryService,
    });
  }
}
