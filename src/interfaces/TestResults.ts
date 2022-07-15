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

export interface CreateTestResultDto {
  initialUrl?: string;
  name?: string;
  startTimeStamp?: number;
}

export interface ListTestResultResponse {
  id: string;
  name: string;
}

export interface CreateTestResultResponse {
  id: string;
  name: string;
}

export type GetTestResultResponse = TestResult;
export type PatchTestResultResponse = TestResult;

interface TestResult {
  id: string;
  name: string;
  startTimeStamp: number;
  endTimeStamp: number;
  initialUrl: string;
  testSteps: {
    id: string;
    operation: {
      input: string;
      type: string;
      elementInfo: {
        tagname: string;
        text: string;
        xpath: string;
        value: string;
        checked: boolean;
        attributes: {
          [key: string]: string;
        };
      } | null;
      title: string;
      url: string;
      imageFileUrl: string;
      timestamp: string;
      windowHandle: string;
      inputElements: {
        tagname: string;
        text: string;
        xpath: string;
        value: string;
        checked: boolean;
        attributes: {
          [key: string]: string;
        };
      }[];
      keywordTexts?: string[];
    };
    intention: {
      id: string;
      type: string;
      value: string;
      details: string;
      imageFileUrl: string;
      tags: string[];
    } | null;
    bugs: {
      id: string;
      type: string;
      value: string;
      details: string;
      imageFileUrl: string;
      tags: string[];
    }[];
    notices: {
      id: string;
      type: string;
      value: string;
      details: string;
      imageFileUrl: string;
      tags: string[];
    }[];
  }[];
  coverageSources: {
    title: string;
    url: string;
    screenElements: {
      tagname: string;
      text: string;
      xpath: string;
      value: string;
      checked: boolean;
      attributes: {
        [key: string]: string;
      };
    }[];
  }[];
  inputElementInfos: {
    title: string;
    url: string;
    inputElements: {
      tagname: string;
      text: string;
      xpath: string;
      value: string;
      checked: boolean;
      attributes: {
        [key: string]: string;
      };
    };
  }[];
}
