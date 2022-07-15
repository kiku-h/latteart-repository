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

export type ElementLocatorFormatter = {
  formatIdLocator: (id: string) => string;
  formatNameAndValueLocator: (name: string, value: string) => string;
  formatNameLocator: (name: string) => string;
  formatTextAndTagnameLocator: (text: string, tagname?: string) => string;
  formatXPathLocator: (xpath: string) => string;
};

export function createWDIOLocatorFormatter(): ElementLocatorFormatter {
  return {
    formatIdLocator: (id: string) => {
      return `#${id}`;
    },
    formatNameAndValueLocator: (name: string, value: string) => {
      return `//*[@name="${name}" and @value="${value}"]`;
    },
    formatNameLocator: (name: string) => {
      return `[name="${name}"]`;
    },
    formatTextAndTagnameLocator: (text: string, tagname = "") => {
      return `${tagname}*=${text}`;
    },
    formatXPathLocator: (xpath: string) => {
      return xpath;
    },
  };
}

export type ElementLocatorSource = {
  tagname: string;
  text?: string;
  xpath: string;
  attributes: { id?: string; name?: string; value?: string };
};

export interface ElementLocatorGenerator {
  generateFrom(source: ElementLocatorSource): string;
}

export class ElementLocatorGeneratorImpl implements ElementLocatorGenerator {
  private _usedLocator: Set<string> = new Set<string>();

  constructor(
    private formatter: ElementLocatorFormatter,
    private maxTextLength = 100
  ) {}

  public generateFrom(source: ElementLocatorSource): string {
    const locator = this.generateLocator(source);

    if (locator && !this._usedLocator.has(locator)) {
      this._usedLocator.add(locator);
      return locator;
    }

    return this.formatter.formatXPathLocator(source.xpath);
  }

  private generateLocator(source: ElementLocatorSource) {
    const { id, name, value } = source.attributes;

    if (id) {
      return this.formatter.formatIdLocator(id);
    }

    if (name) {
      return value
        ? this.formatter.formatNameAndValueLocator(name, value)
        : this.formatter.formatNameLocator(name);
    }

    if (source.tagname === "DIV" || !source.text) {
      return "";
    }

    const partialText = source.text.slice(0, this.maxTextLength).trim();

    if (partialText.match(/\s/g)) {
      return "";
    }

    return source.tagname === "A"
      ? this.formatter.formatTextAndTagnameLocator(partialText)
      : this.formatter.formatTextAndTagnameLocator(
          partialText,
          source.tagname.toLowerCase()
        );
  }
}
