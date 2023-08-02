import { convertTag, percentageToFraction } from './functions'

describe("MAFTT", () => {
  it("can convert fxFlex='50%'", () => {
    expect(convertTag("<div fxFlex=\"50%\">")).toEqual(
      "<div class=\"basis-1/2\">"
    );
  });

  it("can convert percentageToFraction with value 50", () => {
    expect(percentageToFraction("50%")).toEqual("1/2");
  });
});
