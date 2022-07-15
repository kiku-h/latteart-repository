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
  HistoryItemExportDataV1,
  TestResultExportDataV1,
} from "@/services/ExportService";
interface ElementInfo {
  tagname: string;
  text: string;
  xpath: string;
  value: string;
  checked: boolean;
  attributes: {
    [key: string]: string;
  };
}

interface InputElementInfo {
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
}

interface CoverageSource {
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
}

interface TestStep {
  id: string;
  operation: {
    input: string;
    type: string;
    elementInfo: ElementInfo | null;
    title: string;
    url: string;
    imageFileUrl: string;
    timestamp: string;
    windowHandle: string;
    inputElements: ElementInfo[];
    keywordTexts: string[];
  };
  testPurpose: {
    id: string;
    type: string;
    value: string;
    details: string;
    imageFileUrl: string;
    tags: string[];
  } | null;
  notes: {
    id: string;
    type: string;
    value: string;
    details: string;
    imageFileUrl: string;
    tags: string[];
  }[];
}

interface TestResult {
  id: string;
  name: string;
  startTimeStamp: number;
  endTimeStamp: number;
  initialUrl: string;
  testSteps: TestStep[];
  coverageSources: CoverageSource[];
  inputElementInfos: InputElementInfo[];
}

export type TestResultImportDataV1 = TestResultExportDataV1;
export type HistoryItemImportDataV1 = HistoryItemExportDataV1;

type HistoryItemImportDataV0 = Pick<HistoryItemExportDataV1, "testStep"> & {
  intention: string | null;
  bugs: string[];
  notices: string[];
};

export type TestResultImportDataV0 = Omit<
  TestResultImportDataV1,
  "version" | "history"
> & {
  history: {
    [k: string]: HistoryItemImportDataV0;
  };
};

export const deserializeTestResult = (testResultData: string): TestResult => {
  const testResultImportData = JSON.parse(testResultData);

  const version: number = testResultImportData.version ?? 0;

  if (version === 1) {
    const v1FormatData = validateV1Format(testResultImportData);
    return deserializeTestResultV1(v1FormatData);
  }

  return deserializeTestResultV0(testResultImportData);
};

const validateV1Format = (
  testResultImportData: any
): TestResultImportDataV1 => {
  if (
    Object.values(testResultImportData.history).every((historyItem: any) => {
      return historyItem.testPurpose !== undefined && historyItem.notes;
    })
  ) {
    return testResultImportData;
  }

  throw new Error("ImportData is invalid format.");
};

const deserializeTestResultV1 = (
  testResultImportData: TestResultImportDataV1
) => {
  const entries: [string, HistoryItemImportDataV1][] = Object.entries(
    testResultImportData.history
  );
  const testSteps = entries.map(([_, item]) => {
    const testPurpose = (() => {
      const testPurpose = testResultImportData.notes.find(
        (note) => note.id === item.testPurpose
      );

      return testPurpose ? testPurpose : null;
    })();

    const notes = item.notes.flatMap((noteId) => {
      const note = testResultImportData.notes.find(
        (note) => note.id === noteId
      );

      return note ? [note] : [];
    });

    return {
      id: "",
      operation: {
        input: item.testStep.operation.input,
        type: item.testStep.operation.type,
        elementInfo: item.testStep.operation.elementInfo,
        title: item.testStep.pageInfo.title,
        url: item.testStep.pageInfo.url,
        imageFileUrl: item.testStep.imageFileUrl,
        timestamp: item.testStep.timestamp,
        windowHandle: item.testStep.windowInfo.windowHandle,
        inputElements: item.testStep.inputElements,
        keywordTexts: item.testStep.pageInfo.keywordTexts,
      },
      testPurpose,
      notes,
    };
  });

  const testResult = {
    id: testResultImportData.sessionId,
    name: testResultImportData.name,
    startTimeStamp: testResultImportData.startTimeStamp,
    endTimeStamp: testResultImportData.endTimeStamp,
    initialUrl: testResultImportData.initialUrl,
    testSteps,
    coverageSources: testResultImportData.coverageSources,
    inputElementInfos: testResultImportData.inputElementInfos,
  };
  return testResult;
};

const deserializeTestResultV0 = (
  testResultImportData: TestResultImportDataV0
) => {
  const entries: [string, HistoryItemImportDataV0][] = Object.entries(
    testResultImportData.history
  );

  let lastTimestamp: string;
  const testSteps = entries.map(([_, item]) => {
    const testPurpose = (() => {
      const intention = testResultImportData.notes.find(
        (note) => note.id === item.intention
      );

      return intention ? intention : null;
    })();

    const notes = [...item.notices, ...item.bugs].flatMap((noteId) => {
      const note = testResultImportData.notes.find(
        (note) => note.id === noteId
      );

      return note ? [note] : [];
    });

    let epochMilliseconds = Number(item.testStep.timestamp) * 1000;

    if (lastTimestamp === item.testStep.timestamp) {
      epochMilliseconds = epochMilliseconds + 1;
    } else {
      lastTimestamp = item.testStep.timestamp;
    }

    return {
      id: "",
      operation: {
        input: item.testStep.operation.input,
        type: item.testStep.operation.type,
        elementInfo: item.testStep.operation.elementInfo,
        title: item.testStep.pageInfo.title,
        url: item.testStep.pageInfo.url,
        imageFileUrl: item.testStep.imageFileUrl,
        timestamp: epochMilliseconds.toString(),
        windowHandle: item.testStep.windowInfo.windowHandle,
        inputElements: item.testStep.inputElements,
        keywordTexts: item.testStep.pageInfo.keywordTexts,
      },
      testPurpose,
      notes,
    };
  });

  const testResult = {
    id: testResultImportData.sessionId,
    name: testResultImportData.name,
    startTimeStamp: testResultImportData.startTimeStamp,
    endTimeStamp: testResultImportData.endTimeStamp,
    initialUrl: testResultImportData.initialUrl,
    testSteps,
    coverageSources: testResultImportData.coverageSources,
    inputElementInfos: testResultImportData.inputElementInfos,
  };
  return testResult;
};
