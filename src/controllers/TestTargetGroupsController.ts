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

import {
  GetTestTargetGroupResponse,
  PatchTestTargetGroupResponse,
  PostTestTargetGroupResponse,
} from "../interfaces/TestTargetGroups";
import LoggingService from "@/logger/LoggingService";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { TestTargetGroupsService } from "@/services/TestTargetGroupsService";
import { Controller, Body, Patch, Route, Path, Get, Post, Delete } from "tsoa";
import { transactionRunner } from "..";

@Route("/test-target-groups/")
export class TestTargetGroupsController extends Controller {
  @Get("{testTargetGroupId}")
  public async get(
    @Path() testTargetGroupId: string
  ): Promise<GetTestTargetGroupResponse> {
    try {
      return await new TestTargetGroupsService().get(testTargetGroupId);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Get testTargetGroup failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_TEST_TARGET_GROUP_FAILED,
        });
      }
      throw error;
    }
  }

  @Post()
  public async post(
    @Body() body: { testMatrixId: string; name: string }
  ): Promise<PostTestTargetGroupResponse> {
    try {
      return await new TestTargetGroupsService().post(body);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Post testTargetGroup failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.POST_TEST_TARGET_GROUP_FAILED,
        });
      }
      throw error;
    }
  }

  @Patch("{testTargetGroupId}")
  public async patch(
    @Path() testTargetGroupId: string,
    @Body() body: { name: string }
  ): Promise<PatchTestTargetGroupResponse> {
    try {
      return await new TestTargetGroupsService().patch(testTargetGroupId, body);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Patch targetGroup failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.PATCH_TEST_TARGET_GROUP_FAILED,
        });
      }
      throw error;
    }
  }

  @Delete("{testTargetGroupId}")
  public async delete(@Path() testTargetGroupId: string): Promise<void> {
    try {
      return await new TestTargetGroupsService().delete(
        testTargetGroupId,
        transactionRunner
      );
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Delete testTargetGroup failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.DELETE_TEST_TARGET_GROUP_FAILED,
        });
      }
      throw error;
    }
  }
}
