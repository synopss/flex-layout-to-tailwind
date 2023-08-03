import { convertTag } from './functions'

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
    expect(convertTag(`<div fxLayout="column" fxLayoutGap="10%">`)).toEqual(`<div class="flex flex-col space-y-[10%]">`);
  });
});
