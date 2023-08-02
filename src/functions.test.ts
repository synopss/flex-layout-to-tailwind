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

describe('fxLayout', () => {
  it('should convert fxLayout default value', () => {
    expect(convertTag(`<div fxLayout>`)).toEqual(`<div class="flex flex-row">`);
    expect(convertTag(`<div fxLayout="">`)).toEqual(`<div class="flex flex-row">`);
  })

  it('should convert fxLayout="row"', () => {
    expect(convertTag(`<div fxLayout="row">`)).toEqual(`<div class="flex flex-row">`);
  })

  it('should convert fxLayout="row-reverse"', () => {
    expect(convertTag(`<div fxLayout="row-reverse">`)).toEqual(`<div class="flex flex-row-reverse">`);
  })

  it('should convert fxLayout="column"', () => {
    expect(convertTag(`<div fxLayout="column">`)).toEqual(`<div class="flex flex-col">`)
  })

  it('should convert fxLayout="column-reverse"', () => {
    expect(convertTag(`<div fxLayout="column-reverse">`)).toEqual(`<div class="flex flex-col-reverse">`)
  })
})
