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

import { ScreenDefinitionConfig } from "../lib/ScreenDefFactory";
import {
  AutofillSetting,
  AutoOperationSetting,
  CompareInfo,
  Coverage,
} from "../lib/settings/Settings";

export type PutConfigDto = GetConfigResponse;

export type PutConfigResponse = GetConfigResponse;

export interface GetConfigResponse {
  locale: string;
  mode: string;
  debug: {
    outputs: {
      dom: boolean;
    };
    saveItems: {
      keywordSet: boolean;
    };
    configureCaptureSettings: boolean;
  };
  viewPointsPreset: Array<{
    id: string;
    name: string;
    viewPoints: Array<{ name: string; description: string }>;
  }>;
  defaultTagList: string[];
  config: {
    autofillSetting: AutofillSetting;
    autoOperationSetting: AutoOperationSetting;
    screenDefinition: ScreenDefinitionConfig;
    coverage: Coverage;
    imageCompression: {
      isEnabled: boolean;
      isDeleteSrcImage: boolean;
    };
    compare: CompareInfo;
  };
  captureSettings: {
    ignoreTags: string[];
  };
}
