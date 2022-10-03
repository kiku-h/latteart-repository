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

import LoggingService from "@/logger/LoggingService";
import { ServerErrorCode, ServerError } from "@/ServerError";
import { ConfigsService } from "@/services/ConfigsService";
import { ImageFileRepositoryServiceImpl } from "@/services/ImageFileRepositoryService";
import { TestStepServiceImpl } from "@/services/TestStepService";
import { TimestampServiceImpl } from "@/services/TimestampService";
import { Controller, Get, Post, Patch, Route, Path, Body, Delete } from "tsoa";
import {
  screenshotDirectoryService,
  tempDirectoryService,
  transactionRunner,
} from "..";
import {
  ListTestResultResponse,
  CreateTestResultResponse,
  GetTestResultResponse,
  PatchTestResultResponse,
  CreateTestResultDto,
} from "../interfaces/TestResults";
import { TestResultServiceImpl } from "../services/TestResultService";

@Route("test-results")
export class TestResultsController extends Controller {
  @Get()
  public async list(): Promise<ListTestResultResponse[]> {
    console.log("TestResultsController - getTestResults");

    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });

    return new TestResultServiceImpl({
      staticDirectory: tempDirectoryService,
      timestamp: timestampService,
      testStep: new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      }),
    }).getTestResultIdentifiers();
  }

  @Get("{testResultId}")
  public async get(
    @Path() testResultId: string
  ): Promise<GetTestResultResponse> {
    console.log("TestResultsController - getTestResult");

    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });

    try {
      const testResult = await new TestResultServiceImpl({
        staticDirectory: tempDirectoryService,
        timestamp: timestampService,
        testStep: new TestStepServiceImpl({
          imageFileRepository: imageFileRepositoryService,
          timestamp: timestampService,
          config: new ConfigsService(),
        }),
      }).getTestResult(testResultId);

      if (testResult) {
        return testResult;
      }
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Get test result failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_TEST_RESULT_FAILED,
        });
      }
      throw error;
    }

    LoggingService.error(
      `Test result not found. testResultId: ${testResultId}`
    );

    throw new ServerError(404, {
      code: ServerErrorCode.GET_TEST_RESULT_FAILED,
    });
  }

  @Post()
  public async create(
    @Body() requestBody: CreateTestResultDto
  ): Promise<CreateTestResultResponse> {
    console.log("TestResultsController - create");

    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });

    try {
      const result = await new TestResultServiceImpl({
        staticDirectory: tempDirectoryService,
        timestamp: timestampService,
        testStep: new TestStepServiceImpl({
          imageFileRepository: imageFileRepositoryService,
          timestamp: timestampService,
          config: new ConfigsService(),
        }),
      }).createTestResult(requestBody, null);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Create test result failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.CREATE_TEST_RESULT_FAILED,
        });
      }
      throw error;
    }
  }

  @Patch("{testResultId}")
  public async patch(
    @Path() testResultId: string,
    @Body()
    requestBody: { name?: string; startTime?: number; initialUrl?: string }
  ): Promise<PatchTestResultResponse> {
    console.log("TestResultsController - patchTestResult");

    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });

    try {
      return await new TestResultServiceImpl({
        staticDirectory: tempDirectoryService,
        timestamp: timestampService,
        testStep: new TestStepServiceImpl({
          imageFileRepository: imageFileRepositoryService,
          timestamp: timestampService,
          config: new ConfigsService(),
        }),
      }).patchTestResult({
        id: testResultId,
        ...requestBody,
      });
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Update test result failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.UPDATE_TEST_RESULT_FAILED,
        });
      }
      throw error;
    }
  }
  @Delete("{testResultId}")
  public async delete(@Path() testResultId: string): Promise<void> {
    const timestampService = new TimestampServiceImpl();
    const imageFileRepositoryService = new ImageFileRepositoryServiceImpl({
      staticDirectory: screenshotDirectoryService,
    });
    const service = new TestResultServiceImpl({
      staticDirectory: tempDirectoryService,
      timestamp: timestampService,
      testStep: new TestStepServiceImpl({
        imageFileRepository: imageFileRepositoryService,
        timestamp: timestampService,
        config: new ConfigsService(),
      }),
    });

    try {
      return await service.deleteTestResult(
        testResultId,
        transactionRunner,
        screenshotDirectoryService
      );
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Delete test result failed.", error);
        throw new ServerError(500, {
          code: ServerErrorCode.DELETE_TEST_RESULT_FAILED,
        });
      }
      throw error;
    }
  }
}
