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

import { createHash } from "crypto";
import { TestScriptSourceElement } from "./TestScriptSourceOperation";

export class IdentifierUtil {
  public static maxIdentifierLength = 100;

  /**
   * Generate identifier string from element information.
   * @param elem element information
   * @param isUpper whether to capitalize the first letter
   * @return identifier string
   */
  public static generateIdentifierFromElement(
    elem: TestScriptSourceElement,
    isUpper = false
  ): string {
    const attr = elem.attributes;

    let identifier = "";

    if (attr.type && attr.type === "radio") {
      // radio buttons are distinguished by name if they have different id
      // because arguments determine the operation target.
      identifier = attr.name;
    } else if (attr.id) {
      identifier = attr.id;
    } else if (attr.type === "submit" && attr.value) {
      identifier = attr.value;
    } else if (attr.name) {
      if (attr.value) {
        identifier = attr.name + attr.value;
      } else {
        identifier = attr.name;
      }
    } else if (elem.text) {
      identifier = elem.text;
    } else if (attr.value) {
      identifier = attr.value;
    } else if (attr.href) {
      identifier = attr.href;
    } else if (attr.alt) {
      identifier = attr.alt;
    } else if (attr.src) {
      identifier = attr.src;
    } else {
      identifier =
        "noName" + createHash("md5").update(elem.xpath).digest("hex");
    }

    identifier = IdentifierUtil.normalizeAndToCamelCase(identifier, isUpper);

    if (identifier.match(/^[0-9]/)) {
      return "_" + identifier;
    } else {
      return identifier;
    }
  }

  /**
   * Normalize identifier and make it CamelCase.
   * @param identifier identifier string
   * @param isUpper whether to capitalize the first letter
   * @returns identifier string
   */
  public static normalizeAndToCamelCase(
    identifier: string,
    isUpper = false
  ): string {
    const normalized = IdentifierUtil.normalizeIdentifier(identifier);
    const splitStr = normalized.split("$");
    const camelCase = splitStr
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");

    if (camelCase === "") {
      return "_";
    }

    if (isUpper) {
      return camelCase;
    } else {
      return camelCase.charAt(0).toLowerCase() + camelCase.slice(1);
    }
  }

  private static normalizeIdentifier(identifier: string) {
    // Turn white space and single-byte symbols that is likely to
    // be used in title or URL into temporally delimiter '$'.
    // Double-byte symbols that is likely to be used in title or URL
    return identifier
      .trim()
      .replace(/[^0-9A-Za-zぁ-んーァ-ンヴーｦ-ﾟ一-龠\s-_/?|？・〜＿｜→]/g, "")
      .replace(/[\s-_/?|]+/g, "$")
      .replace(/[？・〜＿｜→]+/g, "_")
      .slice(0, this.maxIdentifierLength);
  }
}
