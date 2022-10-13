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

export async function compareImage(
  path1: string,
  path2: string,
  outputPath: string
): Promise<void> {
  const image1 = PNG.sync.read(fs.readFileSync(path1));
  const image2 = PNG.sync.read(fs.readFileSync(path2));
  const { width, height } = image1;
  const diff = new PNG({ width, height });
  Pixelmatch(image1.data, image2.data, diff.data, width, height, {
    threshold: 0,
  });
  fs.writeFileSync(outputPath, PNG.sync.write(diff));
}
