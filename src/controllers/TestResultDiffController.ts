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
import { ServerError, ServerErrorCode } from "@/ServerError";
import { ConfigsService } from "@/services/ConfigsService";
import { ImageFileRepositoryServiceImpl } from "@/services/ImageFileRepositoryService";
import { TestResultServiceImpl } from "@/services/TestResultService";
import { TestStepServiceImpl } from "@/services/TestStepService";
import { TimestampServiceImpl } from "@/services/TimestampService";
import { Controller, Post, Route, Path, Body } from "tsoa";
import { screenshotDirectoryService, tempDirectoryService } from "..";

@Route("test-results/{testResultId}/diffs")
export class TestResultDiffController extends Controller {
  @Post()
  public async create(
    @Path() testResultId: string,
    @Body() requestBody: { targetTestResultId: string; excludeQuery?: string }
  ): Promise<{
    diffs: {
      [key: string]: {
        a: string | undefined;
        b: string | undefined;
      };
    }[];
    isSame: boolean;
    url: string;
  }> {
    const excludeParamNames = requestBody.excludeQuery?.split(",") ?? [];

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
      }).compareTestResults(testResultId, requestBody.targetTestResultId, {
        excludeParamNames,
      });

      return result;
    } catch (error) {
      if (error instanceof ServerError) {
        throw error;
      }

      if (error instanceof Error) {
        LoggingService.error("Compare test result failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.COMPARE_TEST_RESULT_FAILED,
        });
      }

      throw error;
    }
  }
}
