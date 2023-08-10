import { expectValidConversion } from '../../../util/test-util';

describe('fxFlexOrder directive migration', () => {
  it('should convert fxFlexOrder with no value', () => {
    expectValidConversion(`<div fxFlexOrder></div>`, 'order-none');
  });

  it('should convert fxFlexOrder with empty value', () => {
    expectValidConversion(`<div fxFlexOrder=""></div>`, 'order-none');
  });

  it('should convert fxFlexOrder="0"', () => {
    expectValidConversion(`<div fxFlexOrder="0"></div>`, 'order-none');
  });

  it('should convert fxFlexOrder with a valid tailwind value (1 -> 12)', () => {
    expectValidConversion(`<div fxFlexOrder="12"></div>`, 'order-12');
  });

  it('should convert fxFlexOrder with a non-valid tailwind value (> 12)', () => {
    expectValidConversion(`<div fxFlexOrder="13"></div>`, 'order-[13]');
  });

  it('should convert fxFlexOrder with a negative valid tailwind value (-1 -> -12)', () => {
    expectValidConversion(`<div fxFlexOrder="-12"></div>`, '-order-12');
  });

  it('should convert fxFlexOrder with a negative non-valid tailwind value (< -12)', () => {
    expectValidConversion(`<div fxFlexOrder="-13"></div>`, '-order-[13]');
  });

  it('should convert fxFlexOrder="9999"', () => {
    expectValidConversion(`<div fxFlexOrder="9999"></div>`, 'order-last');
  });

  it('should convert fxFlexOrder="-9999"', () => {
    expectValidConversion(`<div fxFlexOrder="-9999"></div>`, 'order-first');
  });
});
