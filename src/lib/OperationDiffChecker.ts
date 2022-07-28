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

import { Operation } from "@/interfaces/TestSteps";

function diffCheckByText<T>(a: T, b: T) {
  const textA = typeof a === "string" ? a : JSON.stringify(a);
  const textB = typeof b === "string" ? b : JSON.stringify(b);

  return textA === textB ? undefined : { a: textA, b: textB };
}

export type DiffCheckFunction = <T>(
  a: T,
  b: T
) => { a: string; b: string } | undefined;

export class OperationDiffChecker {
  private paramNameToOptions: Map<
    keyof Operation,
    { name?: string; func?: DiffCheckFunction }
  >;

  constructor(
    ...paramNameToOptions: [
      paramName: keyof Operation,
      options: { name?: string; func?: DiffCheckFunction }
    ][]
  ) {
    this.paramNameToOptions = new Map([
      ["input", {}],
      ["type", {}],
      ["elementInfo", {}],
      ["title", {}],
      ["url", {}],
      ["windowHandle", {}],
      ["keywordTexts", {}],
      ...paramNameToOptions,
    ]);
  }

  public async diff(
    a: Operation | undefined,
    b: Operation | undefined
  ): Promise<{
    [key: string]: { a: string | undefined; b: string | undefined };
  }> {
    const result = Object.fromEntries(
      Array.from(this.paramNameToOptions.entries()).flatMap(
        ([paramName, option]) => {
          const valueA = a ? a[paramName] : undefined;
          const valueB = b ? b[paramName] : undefined;

          const diff = option.func
            ? option.func(valueA, valueB)
            : diffCheckByText(valueA, valueB);

          return diff ? [[option.name ?? paramName, diff]] : [];
        }
      )
    );

    return result;
  }
}
