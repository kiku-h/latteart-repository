import {
  PageObjectOperationFactory,
  PageObjectOperationFactoryImpl,
} from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectOperationFactory";
import { ElementType } from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectOperation";
import { PageObjectElementFactory } from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectElementFactory";
import { TestScriptSourceOperation } from "@/lib/scriptGenerator/TestScriptSourceOperation";

const emptyOperation: TestScriptSourceOperation = {
  screenDef: "",
  type: "",
  elementInfo: null,
  url: "",
  input: "",
  imageFilePath: "",
};

describe("PageObjectOperationFactoryImpl", () => {
  describe("#createFrom", () => {
    let factory: PageObjectOperationFactory;
    let elementFactory: PageObjectElementFactory;

    const target = {
      identifier: "",
      type: ElementType.Other,
      locator: "",
    };

    beforeEach(() => {
      elementFactory = {
        createFrom: jest.fn().mockReturnValue(target),
      };

      factory = new PageObjectOperationFactoryImpl(elementFactory);
    });

    it("渡された情報を元にページオブジェクトで使用する操作を生成して返す", () => {
      expect(
        factory.createFrom(
          { ...emptyOperation, type: "click", input: "input" },
          ""
        )
      ).toEqual({
        target,
        type: "click",
        input: "input",
      });

      expect(
        factory.createFrom(
          { ...emptyOperation, type: "change", input: "input" },
          ""
        )
      ).toEqual({
        target,
        type: "change",
        input: "input",
      });

      expect(
        factory.createFrom(
          { ...emptyOperation, type: "switch_window", input: "input" },
          "destinationUrl"
        )
      ).toEqual({
        target,
        type: "switch_window",
        input: "destinationUrl",
      });

      expect(
        factory.createFrom(
          { ...emptyOperation, type: "hogehoge", input: "input" },
          ""
        )
      ).toEqual({
        target,
        type: "other",
        input: "input",
      });
    });
  });
});
