import { ElementType } from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectOperation";
import { PageObjectElementFactoryImpl } from "@/lib/scriptGenerator/model/pageObject/method/operation/PageObjectElementFactory";

describe("PageObjectElementFactoryImpl", () => {
  describe("#createFrom", () => {
    let factory: PageObjectElementFactoryImpl;

    beforeEach(() => {
      factory = new PageObjectElementFactoryImpl();
    });

    describe("ElementInfoとimageUrlから操作対象画面要素を生成する", () => {
      const imageUrl = "imageUrl";

      it("ラジオボタン", () => {
        const targetElement = {
          tagname: "INPUT",
          xpath: "",
          attributes: { value: "", name: "", type: "radio" },
          locator: "locator",
        };

        expect(factory.createFrom(targetElement, imageUrl)).toEqual({
          identifier: expect.any(String),
          type: ElementType.RadioButton,
          locator: "locator",
          value: targetElement.attributes.value,
          name: targetElement.attributes.name,
          imageUrl,
        });
      });

      it("チェックボックス", () => {
        const targetElement = {
          tagname: "INPUT",
          xpath: "",
          attributes: { value: "", name: "", type: "checkbox" },
          locator: "locator",
        };

        expect(factory.createFrom(targetElement, imageUrl)).toEqual({
          identifier: expect.any(String),
          type: ElementType.CheckBox,
          locator: "locator",
          value: targetElement.attributes.value,
          name: targetElement.attributes.name,
          imageUrl,
        });
      });

      it("セレクトボックス", () => {
        const targetElement = {
          tagname: "SELECT",
          xpath: "",
          attributes: { value: "", name: "", type: "" },
          locator: "locator",
        };

        expect(factory.createFrom(targetElement, imageUrl)).toEqual({
          identifier: expect.any(String),
          type: ElementType.SelectBox,
          locator: "locator",
          value: targetElement.attributes.value,
          name: targetElement.attributes.name,
          imageUrl,
        });
      });

      it("リンク", () => {
        const targetElement = {
          tagname: "A",
          xpath: "",
          attributes: { value: "", name: "", type: "" },
          locator: "locator",
        };

        expect(factory.createFrom(targetElement, imageUrl)).toEqual({
          identifier: expect.any(String),
          type: ElementType.Link,
          locator: "locator",
          value: targetElement.attributes.value,
          name: targetElement.attributes.name,
          imageUrl,
        });
      });

      it("その他", () => {
        const targetElement = {
          tagname: "hogehoge",
          xpath: "",
          attributes: { value: "", name: "", type: "" },
          locator: "locator",
        };

        expect(factory.createFrom(targetElement, imageUrl)).toEqual({
          identifier: expect.any(String),
          type: ElementType.Other,
          locator: "locator",
          value: targetElement.attributes.value,
          name: targetElement.attributes.name,
          imageUrl,
        });
      });
    });
  });
});
