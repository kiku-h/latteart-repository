import {
  createWDIOLocatorFormatter,
  ElementLocatorGeneratorImpl,
  ElementLocatorSource,
} from "@/lib/elementLocator";

describe("LocatorGeneratorImpl", () => {
  describe("#generateFrom", () => {
    describe("要素の情報からロケータを生成できる", () => {
      const generator = new ElementLocatorGeneratorImpl(
        createWDIOLocatorFormatter()
      );

      it("idが最も優先的に用いられる", () => {
        const element: ElementLocatorSource = {
          tagname: "input",
          text: "text1",
          xpath: "xpath1",
          attributes: { name: "name1", id: "id1", value: "value1" },
        };
        const locator = generator.generateFrom(element);
        expect(locator).toBe("#id1");
      });

      it("2番目にnameが優先的に用いられる", () => {
        const element: ElementLocatorSource = {
          tagname: "input",
          text: "text1",
          xpath: "xpath1",
          attributes: { name: "name1", value: "" },
        };
        const locator = generator.generateFrom(element);
        expect(locator).toBe('[name="name1"]');
      });
      describe("3番目にtextが優先的に用いられる", () => {
        it("Aタグなら partial link text を使う", () => {
          const element: ElementLocatorSource = {
            tagname: "A",
            text: "text1",
            xpath: "xpath1",
            attributes: { value: "value1" },
          };
          const locator = generator.generateFrom(element);
          expect(locator).toBe("*=text1");
        });
        it("Aタグ以外ならタグ名を頭につける", () => {
          const element: ElementLocatorSource = {
            tagname: "h1",
            text: "text1",
            xpath: "xpath1",
            attributes: { value: "value1" },
          };
          const locator = generator.generateFrom(element);
          expect(locator).toBe("h1*=text1");
        });
      });
      it("4番目にxpathが優先的に用いられる", () => {
        const element: ElementLocatorSource = {
          tagname: "input",
          text: "",
          xpath: "xpath1",
          attributes: { value: "value1" },
        };
        const locator = generator.generateFrom(element);
        expect(locator).toBe("xpath1");
      });
    });
  });
});
