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
import fs from "fs";
import { PNG } from "pngjs";
import Pixelmatch from "pixelmatch";
import LoggingService from "@/logger/LoggingService";

export default class PNGImageComparison {
  private base?: Buffer;
  private target?: Buffer;

  public async init(
    baseFilePath: string,
    targetFilePath: string
  ): Promise<PNGImageComparison> {
    return new Promise((resolve, reject) => {
      fs.readFile(baseFilePath, (err1, file1) => {
        if (err1) {
          LoggingService.error("invalid baseFilePath.", err1);
          return reject(err1);
        }
        this.base = file1;

        fs.readFile(targetFilePath, (err2, file2) => {
          if (err2) {
            LoggingService.error("invalid baseFilePath.", err2);
            return reject(err2);
          }
          this.target = file2;
          return resolve(this);
        });
      });
    });
  }

  public hasDifference(): boolean {
    if (!this.base || !this.target) {
      throw new Error("invalid file settings.");
    }
    return !this.base.equals(this.target);
  }

  public extractDifference(outputPath: string): Promise<void> {
    if (!this.base || !this.target) {
      throw new Error("invalid file settings.");
    }
    const base = PNG.sync.read(this.base);
    const target = PNG.sync.read(this.target);

    const { width, height } = base;
    const diff = new PNG({ width, height });
    try {
      Pixelmatch(base.data, target.data, diff.data, width, height, {
        threshold: 0,
      });
    } catch (error) {
      console.error(error);
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(outputPath, PNG.sync.write(diff), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
}
