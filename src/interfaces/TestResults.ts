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
  source?: string;
}

export type ListTestResultResponse = Pick<TestResult, "id" | "name" | "source">;

export type CreateTestResultResponse = Pick<
  TestResult,
  "id" | "name" | "source"
>;

export type GetTestResultResponse = TestResult;
export type PatchTestResultResponse = TestResult;

export type TestResultWithoutTestSteps = Omit<TestResult, "testSteps">;

export type GetTestResultForDB = Omit<TestResult, "testSteps"> & {
  testSteps: {
    id: string;
    operation: {
      input: string;
      type: string;
      elementInfo: TestResultElementInfo | null;
      title: string;
      url: string;
      imageFileUrl: string;
      timestamp: string;
      windowHandle: string;
      inputElements: TestResultElementInfo[];
      keywordTexts?: string[];
      screenElements?: { tagname: string; ownedText?: string | null }[];
    };
    intention: Note | null;
    bugs: Note[];
    notices: Note[];
  }[];
};

export interface Note {
  id: string;
  type: string;
  value: string;
  details: string;
  imageFileUrl: string;
  tags: string[];
}

export interface TestResultElementInfo {
  tagname: string;
  text: string;
  xpath: string;
  value: string;
  checked: boolean;
  attributes: {
    [key: string]: string;
  };
}

interface TestResult {
  id: string;
  name: string;
  startTimeStamp: number;
  endTimeStamp: number;
  initialUrl: string;
  source?: string;
  testSteps: {
    id: string;
    operation: {
      input: string;
      type: string;
      elementInfo: TestResultElementInfo | null;
      title: string;
      url: string;
      imageFileUrl: string;
      timestamp: string;
      windowHandle: string;
      inputElements: TestResultElementInfo[];
      keywordTexts?: string[];
    };
    intention: Note | null;
    bugs: Note[];
    notices: Note[];
  }[];
  coverageSources: {
    title: string;
    url: string;
    screenElements: TestResultElementInfo[];
  }[];
}
