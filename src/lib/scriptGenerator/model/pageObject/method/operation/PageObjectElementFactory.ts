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

import { ElementType, PageObjectElement } from "./PageObjectOperation";
import { IdentifierUtil } from "../../../../IdentifierUtil";
import { TestScriptSourceElement } from "../../../../TestScriptSourceOperation";

export interface PageObjectElementFactory {
  createFrom(
    element: TestScriptSourceElement | null,
    imageUrl: string
  ): PageObjectElement;
}

export class PageObjectElementFactoryImpl implements PageObjectElementFactory {
  public createFrom(
    element: TestScriptSourceElement | null,
    imageUrl: string
  ): PageObjectElement {
    if (!element) {
      return {
        identifier: "",
        type: ElementType.Other,
        value: "",
        name: "",
        locator: "",
        imageUrl,
      };
    }

    const identifier = IdentifierUtil.generateIdentifierFromElement(element);

    return {
      identifier,
      type: this.createElementType(element.tagname, element.attributes.type),
      value: element.attributes.value ?? "",
      name: element.attributes.name ?? "",
      locator: element.locator,
      imageUrl,
    };
  }

  private createElementType(tagname: string, elementType = "") {
    if (tagname === "INPUT" && elementType === "radio") {
      return ElementType.RadioButton;
    }

    if (tagname === "INPUT" && elementType === "checkbox") {
      return ElementType.CheckBox;
    }

    if (tagname === "SELECT") {
      return ElementType.SelectBox;
    }

    if (
      (tagname === "INPUT" && elementType === "submit") ||
      (tagname === "INPUT" && elementType === "button") ||
      tagname === "A" ||
      tagname === "BUTTON" ||
      tagname === "SPAN" ||
      tagname === "IMG"
    ) {
      return ElementType.Link;
    }

    return ElementType.Other;
  }
}
