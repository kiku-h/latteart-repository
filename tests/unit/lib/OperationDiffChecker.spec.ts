import { Operation } from "@/interfaces/TestSteps";
import {
  DiffCheckFunction,
  OperationDiffChecker,
} from "@/lib/OperationDiffChecker";

describe("OperationDiffChecker", () => {
  describe("#diff", () => {
    const baseOperation: Operation = {
      input: "",
      type: "",
      elementInfo: null,
      title: "",
      url: "",
      imageFileUrl: "",
      timestamp: "",
      inputElements: [],
      windowHandle: "",
      keywordTexts: [],
    };

    const excludeTagsNames: string[] = [];

    describe("2つの操作の差分を抽出する", () => {
      it("差分なしの場合は空オブジェクトを返す", async () => {
        expect(
          await new OperationDiffChecker().diff(
            baseOperation,
            baseOperation,
            excludeTagsNames
          )
        ).toEqual({});
      });

      it("値がテキストのフィールドはそのまま比較した差分を返す", async () => {
        const operation: Operation = {
          ...baseOperation,
          input: "aaa",
          type: "aaa",
          title: "aaa",
          url: "aaa",
          windowHandle: "aaa",
        };

        expect(
          await new OperationDiffChecker().diff(
            baseOperation,
            operation,
            excludeTagsNames
          )
        ).toEqual({
          input: {
            a: "",
            b: "aaa",
          },
          type: {
            a: "",
            b: "aaa",
          },
          title: {
            a: "",
            b: "aaa",
          },
          url: {
            a: "",
            b: "aaa",
          },
          windowHandle: {
            a: "",
            b: "aaa",
          },
        });
      });

      it("値が配列もしくはオブジェクトのフィールドはJSON化して比較した差分を返す", async () => {
        const elementInfo = {
          tagname: "tagname",
          text: "text",
          xpath: "xpath",
          value: "value",
          checked: true,
          attributes: { attributeKey: "attributeValue" },
        };
        const keywordTexts = ["aaa", "bbb", "ddd"];
        const operation: Operation = {
          ...baseOperation,
          elementInfo,
          keywordTexts,
        };

        expect(
          await new OperationDiffChecker().diff(
            baseOperation,
            operation,
            excludeTagsNames
          )
        ).toEqual({
          elementInfo: {
            a: "null",
            b: JSON.stringify(elementInfo),
          },
          keywordTexts: {
            a: "[]",
            b: JSON.stringify(keywordTexts),
          },
        });
      });

      it("差分比較関数が無いフィールドについては、差分があっても無視する", async () => {
        const operation: Operation = {
          ...baseOperation,
          imageFileUrl: "imageFileUrl",
          timestamp: "timestamp",
          inputElements: [
            {
              tagname: "tagname",
              text: "text",
              xpath: "xpath",
              value: "value",
              checked: true,
              attributes: { attributeKey: "attributeValue" },
            },
          ],
        };

        expect(
          await new OperationDiffChecker().diff(
            baseOperation,
            operation,
            excludeTagsNames
          )
        ).toEqual({});
      });

      it("コンストラクタでフィールド毎に名前と差分比較関数を差し替えることができる", async () => {
        const operation: Operation = {
          ...baseOperation,
          imageFileUrl: "imageFileUrl",
          timestamp: "timestamp",
          inputElements: [
            {
              tagname: "tagname",
              text: "text",
              xpath: "xpath",
              value: "value",
              checked: true,
              attributes: { attributeKey: "attributeValue" },
            },
          ],
        };

        const expectedDiff = { a: "hoge", b: "huga" };

        const paramNameToDiffCheckFunction: [
          paramName: keyof Operation,
          diffCheckOptions: { name?: string; func: DiffCheckFunction }
        ] = ["imageFileUrl", { name: "image", func: () => expectedDiff }];

        expect(
          await new OperationDiffChecker(paramNameToDiffCheckFunction).diff(
            baseOperation,
            operation,
            excludeTagsNames
          )
        ).toEqual({ image: expectedDiff });
      });
    });

    it("渡された操作自体がundefinedの場合は、全項目がundefinedであるものとして比較する", async () => {
      expect(
        await new OperationDiffChecker().diff(
          baseOperation,
          undefined,
          excludeTagsNames
        )
      ).toEqual({
        input: {
          a: "",
          b: undefined,
        },
        type: {
          a: "",
          b: undefined,
        },
        elementInfo: {
          a: "null",
          b: undefined,
        },
        title: {
          a: "",
          b: undefined,
        },
        url: {
          a: "",
          b: undefined,
        },
        windowHandle: {
          a: "",
          b: undefined,
        },
        keywordTexts: {
          a: "[]",
          b: undefined,
        },
      });

      expect(
        await new OperationDiffChecker().diff(
          undefined,
          undefined,
          excludeTagsNames
        )
      ).toEqual({});
    });

    it("無視するタグを指定している場合は、差分があっても無視する", async () => {
      const excludeTags: string[] = ["button", "textarea"];
      const elementInfoA = {
        tagname: "textarea",
        text: "text",
        xpath: "xpath",
        value: "value",
        checked: true,
        attributes: { attributeKey: "attributeValue" },
      };
      const elementInfoB = {
        tagname: "textarea",
        text: "textA",
        xpath: "xpath",
        value: "value",
        checked: true,
        attributes: { attributeKey: "attributeValue" },
      };
      const keywordTexts = ["aaa", "bbb", "ddd"];
      const screenElements = [
        { tagname: "BUTTON", ownedText: "ボタン" },
        { tagname: "INPUT", ownedText: "aaaa" },
      ];
      const operationA: Operation = {
        ...baseOperation,
        elementInfo: elementInfoA,
        keywordTexts,
        screenElements,
      };
      const operationB: Operation = {
        ...baseOperation,
        elementInfo: elementInfoB,
        keywordTexts,
        screenElements,
      };

      expect(
        await new OperationDiffChecker().diff(
          operationA,
          operationB,
          excludeTags
        )
      ).toEqual({});
    });
  });
});
