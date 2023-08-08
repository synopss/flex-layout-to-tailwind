import { convertTag } from './functions';

describe('fxFlexAlign directive migration', () => {
  it('should convert fxFlexAlign default values', () => {
    expect(convertTag(`<div fxFlexAlign>`)).toEqual(`<div class="self-stretch">`);
    expect(convertTag(`<div fxFlexAlign="">`)).toEqual(`<div class="self-stretch">`);
  });

  it('should convert fxFlexAlign all values', () => {
    expect(convertTag(`<div fxFlexAlign="start">`)).toEqual(`<div class="self-start">`);
    expect(convertTag(`<div fxFlexAlign="center">`)).toEqual(`<div class="self-center">`);
    expect(convertTag(`<div fxFlexAlign="end">`)).toEqual(`<div class="self-end">`);
    expect(convertTag(`<div fxFlexAlign="baseline">`)).toEqual(`<div class="self-baseline">`);
    expect(convertTag(`<div fxFlexAlign="stretch">`)).toEqual(`<div class="self-stretch">`);
    expect(convertTag(`<div fxFlexAlign="auto">`)).toEqual(`<div class="self-auto">`);
  });
});
