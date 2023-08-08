import { convertTag } from './functions';

describe('fxFlexOrder directive migration', () => {
  it('should convert fxFlexOrder', () => {
    expect(convertTag(`<div fxFlexOrder>`)).toEqual(`<div class="order-none">`);
    expect(convertTag(`<div fxFlexOrder="">`)).toEqual(`<div class="order-none">`);
    expect(convertTag(`<div fxFlexOrder="0">`)).toEqual(`<div class="order-none">`);
    expect(convertTag(`<div fxFlexOrder="1">`)).toEqual(`<div class="order-1">`);
    expect(convertTag(`<div fxFlexOrder="12">`)).toEqual(`<div class="order-12">`);
    expect(convertTag(`<div fxFlexOrder="13">`)).toEqual(`<div class="order-[13]">`);
    expect(convertTag(`<div fxFlexOrder="-9999">`)).toEqual(`<div class="order-first">`);
    expect(convertTag(`<div fxFlexOrder="9999">`)).toEqual(`<div class="order-last">`);
    expect(convertTag(`<div fxFlexOrder="-12">`)).toEqual(`<div class="-order-12">`);
    expect(convertTag(`<div fxFlexOrder="-13">`)).toEqual(`<div class="-order-[13]">`);
  });
});
