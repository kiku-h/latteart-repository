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
  GetTestMatrixResponse,
  PatchTestMatrixResponse,
  PostTestMatrixResponse,
} from "../interfaces/TestMatrices";
import LoggingService from "@/logger/LoggingService";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { TestMatricesService } from "@/services/TestMatricesService";
import { Controller, Body, Patch, Route, Path, Get, Post, Delete } from "tsoa";
import { transactionRunner } from "..";

@Route("/test-matrices/")
export class TestMatricesController extends Controller {
  @Get("{testMatrixId}")
  public async get(
    @Path() testMatrixId: string
  ): Promise<GetTestMatrixResponse> {
    try {
      return await new TestMatricesService().get(testMatrixId);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Get testMatrix failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_TEST_MATRIX_FAILED,
        });
      }
      throw error;
    }
  }

  @Post()
  public async post(
    @Body() body: { projectId: string; name: string }
  ): Promise<PostTestMatrixResponse> {
    try {
      return await new TestMatricesService().post(body);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Post testMatrix failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_TEST_MATRIX_FAILED,
        });
      }
      throw error;
    }
  }

  @Patch("{testMatrixId}")
  public async patch(
    @Path() testMatrixId: string,
    @Body() body: { name: string }
  ): Promise<PatchTestMatrixResponse> {
    try {
      return await new TestMatricesService().patch(testMatrixId, body);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Patch testMatrix failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_TEST_MATRIX_FAILED,
        });
      }
      throw error;
    }
  }

  @Delete("{testMatrixId}")
  public async delete(@Path() testMatrixId: string): Promise<void> {
    try {
      return await new TestMatricesService().delete(
        testMatrixId,
        transactionRunner
      );
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Delete testMatrix failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.DELETE_TEST_MATRIX_FAILED,
        });
      }
      throw error;
    }
  }
}
