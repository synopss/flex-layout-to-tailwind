const mafft = require("./functions");

describe("MAFTT", () => {
  it("can convert fxFlex='50%'", () => {
    expect(mafft.convertTag("<div fxFlex=\"50%\">")).toEqual(
      "<div class=\"basis-1/2\">"
    );
  });

  it("can convert percentageToFraction with value 50", () => {
    expect(mafft.percentageToFraction("50%")).toEqual("1/2");
  });
});
