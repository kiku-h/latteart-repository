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

export type CreateTestStepDto = CapturedOperation;

export type GetTestStepResponse = {
  id: string;
  operation: Omit<Operation, "screenElements">;
  intention: string | null;
  bugs: string[];
  notices: string[];
};
export type CreateTestStepResponse = {
  id: string;
  operation: Operation;
  coverageSource: CoverageSource;
};
export type PatchTestStepResponse = GetTestStepResponse;

export interface CoverageSource {
  title: string;
  url: string;
  screenElements: ElementInfo[];
}

export interface ElementInfo {
  tagname: string;
  text?: string | null;
  xpath: string;
  value?: any;
  checked?: boolean;
  attributes: { [key: string]: any };
}

interface CapturedOperation {
  input: string;
  type: string;
  elementInfo: CapturedElementInfo | null;
  title: string;
  url: string;
  imageData: string;
  windowHandle: string;
  screenElements: CapturedElementInfo[];
  inputElements: CapturedElementInfo[];
  keywordTexts?: string[];
  timestamp: number;
  pageSource: string;
}

export type CapturedElementInfo = ElementInfo & { ownedText: string };

export interface Operation {
  input: string;
  type: string;
  elementInfo: ElementInfo | null;
  title: string;
  url: string;
  imageFileUrl: string;
  timestamp: string;
  inputElements: ElementInfo[];
  windowHandle: string;
  keywordTexts?: string[];
  screenElements?: { tagname: string; ownedText?: string | null }[];
}

export interface TestStep {
  id: string;
  operation: Operation;
  intention: string | null;
  bugs: string[];
  notices: string[];
}

export interface PatchTestStepDto {
  intention?: string | null;
  bugs?: string[];
  notices?: string[];
}
