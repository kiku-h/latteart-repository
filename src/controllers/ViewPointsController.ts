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
  GetViewPointResponse,
  PatchViewPointResponse,
  PostViewPointResponse,
} from "../interfaces/ViewPoints";
import LoggingService from "@/logger/LoggingService";
import { ServerError, ServerErrorCode } from "@/ServerError";
import { ViewPointsService } from "@/services/ViewPointsService";
import { Controller, Body, Patch, Route, Path, Get, Post, Delete } from "tsoa";
import { transactionRunner } from "..";

@Route("/view-points/")
export class ViewPointsController extends Controller {
  @Get("{viewPointId}")
  public async get(@Path() viewPointId: string): Promise<GetViewPointResponse> {
    try {
      return await new ViewPointsService().get(viewPointId);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Get viewPoint failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.GET_VIEW_POINT_FAILED,
        });
      }
      throw error;
    }
  }

  @Post()
  public async post(
    @Body()
    body: {
      testMatrixId: string;
      name: string;
      index: number;
      description: string;
    }
  ): Promise<PostViewPointResponse> {
    try {
      return await new ViewPointsService().post(body, transactionRunner);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Post viewPoint failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.POST_VIEW_POINT_FAILED,
        });
      }
      throw error;
    }
  }

  @Patch("{viewPointId}")
  public async patch(
    @Path() viewPointId: string,
    @Body()
    body: { name?: string; description?: string; index?: number }
  ): Promise<PatchViewPointResponse> {
    try {
      return await new ViewPointsService().patch(viewPointId, body);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Patch viewPoint failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.PATCH_VIEW_POINT_FAILED,
        });
      }
      throw error;
    }
  }

  @Delete("{viewPointId}")
  public async delete(@Path() viewPointId: string): Promise<void> {
    try {
      return await new ViewPointsService().delete(viewPointId);
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error("Delete viewPoint failed.", error);

        throw new ServerError(500, {
          code: ServerErrorCode.DELETE_VIEW_POINT_FAILED,
        });
      }
      throw error;
    }
  }
}
