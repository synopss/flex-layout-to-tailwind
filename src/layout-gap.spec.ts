import { convertTag } from './functions';

describe('fxLayoutGap directive migration', () => {
  it('should convert fxLayoutGap default value', () => {
    expect(convertTag(`<div fxLayoutGap>`)).toEqual(`<div class="flex">`);
    expect(convertTag(`<div fxLayoutGap="">`)).toEqual(`<div class="flex">`);
  });

  it('should convert fxLayoutGap with tailwind px values', () => {
    expect(convertTag(`<div fxLayoutGap="0px">`)).toEqual(`<div class="flex gap-0">`);
    expect(convertTag(`<div fxLayoutGap="1px">`)).toEqual(`<div class="flex gap-px">`);
    expect(convertTag(`<div fxLayoutGap="20px">`)).toEqual(`<div class="flex gap-5">`);
  });

  it('should convert fxLayoutGap with non-tailwind px values', () => {
    expect(convertTag(`<div fxLayoutGap="18px">`)).toEqual(`<div class="flex gap-[18px]">`);
  });

  it('should convert fxLayoutGap with % values', () => {
    expect(convertTag(`<div fxLayout="row" fxLayoutGap="10%">`)).toEqual(`<div class="flex flex-row space-x-[10%]">`);
    expect(convertTag(`<div fxLayout="column" fxLayoutGap="10%">`)).toEqual(
      `<div class="flex flex-col space-y-[10%]">`,
    );
  });

  it('should convert fxLayoutGap with gap', () => {
    expect(convertTag(`<div fxLayoutGap="1px grid">`)).toEqual(`<div class="flex -mr-px -mb-px">`);
    expect(convertTag(`<div fxLayoutGap="18px grid">`)).toEqual(`<div class="flex -mr-[18px] -mb-[18px]">`);
    expect(convertTag(`<div fxLayoutGap="20px grid">`)).toEqual(`<div class="flex -mr-5 -mb-5">`);
    expect(convertTag(`<div fxLayoutGap="10% grid">`)).toEqual(`<div class="flex -mr-[10%] -mb-[10%]">`);

    // TODO: fix those tests, for some reason it handles weirdly ending tag -> </di>  instead of </div>
    // expect(convertTag(`<div fxLayoutGap="1px grid"><div>test</div></div>`)).toEqual(
    //   `<div class="flex -mr-px -mb-px"><div class="pr-px pb-px">test</div></div>`,
    // );
    // expect(convertTag(`<div fxLayoutGap="18px grid"><div>test</div></div>`)).toEqual(
    //   `<div class="flex -mr-[18px] -mb-[18px]"><div class="pr-[18px] pb-[18px]">test</div></div>`,
    // );
    // expect(convertTag(`<div fxLayoutGap="20px grid"><div>test</div></div>`)).toEqual(
    //   `<div class="flex -mr-5 -mb-5"><div class="pr-5 pb-5">test</div></div>`,
    // );
    // expect(convertTag(`<div fxLayoutGap="10% grid"><div>test</div></div>`)).toEqual(
    //   `<div class="flex -mr-[10%] -mb-[10%]"><div class="pr-[10%] pb-[10%]">test</div></div>`,
    // );
    // expect(convertTag(`<div fxLayoutGap="20px grid"><div>test</div><div>test</div></div>`)).toEqual(
    //   `<div class="flex -mr-5 -mb-5"><div class="pr-5 pb-5">test</div><div class="pr-5 pb-5">test</div></div>`,
    // );
  });
});
