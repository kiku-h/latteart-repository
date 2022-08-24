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

import { ScreenDefType, RunningMode, Locale } from "./SettingsEnum";

/**
 * Class that holds the setting value.
 */
export default class Settings {
  public locale: Locale;
  public mode: RunningMode;
  public debug: {
    outputs: {
      dom: boolean;
    };
    saveItems: {
      keywordSet: boolean;
    };
    configureCaptureSettings: boolean;
  };
  public viewPointsPreset: Array<{
    name: string;
    viewPoints: Array<{ name: string }>;
  }>;
  public defaultTagList: string[];
  public config: {
    screenDefinition: ScreenDefinition;
    coverage: Coverage;
    imageCompression: ImageCompression;
    compare: CompareInfo;
  };
  public captureSettings: {
    ignoreTags: string[];
  };

  /**
   * constructor
   */
  constructor() {
    this.locale = Locale.Ja;
    this.mode = RunningMode.Debug;
    this.debug = {
      outputs: {
        dom: false,
      },
      saveItems: {
        keywordSet: false,
      },
      configureCaptureSettings: true,
    };
    this.viewPointsPreset = [];
    this.defaultTagList = [];
    this.config = {
      screenDefinition: {
        screenDefType: ScreenDefType.Title,
        conditionGroups: [],
      },
      coverage: {
        include: {
          tags: [],
        },
      },
      imageCompression: {
        isEnabled: true,
        isDeleteSrcImage: true,
        command: "cwebp {filePath} -o {dirPath}/{baseName}.webp",
      },
      compare: {
        exclude: {
          isEnabled: false,
          tags: "",
        },
      },
    };
    this.captureSettings = {
      ignoreTags: [],
    };
  }
}

export interface ScreenDefinition {
  screenDefType: ScreenDefType;
  conditionGroups: ScreenDefinitionConditionGroup[];
}

export interface Coverage {
  include: {
    tags: string[];
  };
}

export interface ImageCompression {
  isEnabled: boolean;
  isDeleteSrcImage: boolean;
  command: string;
}

export interface CompareInfo {
  exclude: {
    isEnabled: boolean;
    tags: string;
  };
}

export interface ScreenDefinitionConditionGroup {
  isEnabled: boolean;
  screenName: string;
  conditions: Array<{
    isEnabled: boolean;
    definitionType: "url" | "title" | "keyword";
    word: string;
  }>;
}
