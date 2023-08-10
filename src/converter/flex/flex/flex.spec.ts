import { expectValidConversion } from '../../../util/test-util';

describe('fxFlex directive migration', () => {
  it('should convert fxFlex with no value', () => {
    expectValidConversion(`<div fxFlex></div>`, 'flex-1');
  });

  it('should convert fxFlex with empty value', () => {
    expectValidConversion(`<div fxFlex=""></div>`, 'flex-1');
  });

  it('should convert fxFlex with value with no unit', () => {
    expectValidConversion(`<div fxFlex="50"></div>`, 'basis-1/2');
  });

  it('should convert fxFlex with valid % tailwind value', () => {
    expectValidConversion(`<div fxFlex="50%"></div>`, 'basis-1/2');
  });

  it('should convert fxFlex with non-valid % tailwind value', () => {
    expectValidConversion(`<div fxFlex="52"></div>`, 'basis-[52%]');
  });

  it('should convert fxFlex="33.3%"', () => {
    expectValidConversion(`<div fxFlex="33.3"></div>`, 'basis-1/3');
  });

  it('should convert fxFlex="66.6%"', () => {
    expectValidConversion(`<div fxFlex="66.6"></div>`, 'basis-2/3');
  });

  it('should convert fxFlex with valid px tailwind value', () => {
    expectValidConversion(`<div fxFlex="20px"></div>`, 'basis-5');
  });

  it('should convert fxFlex with non-valid px tailwind value', () => {
    expectValidConversion(`<div fxFlex="18px"></div>`, 'basis-[18px]');
  });

  it('should convert fxFlex with valid tailwind grow, shrink and basis values', () => {
    expectValidConversion(`<div fxFlex="1 1 50%"></div>`, 'grow shrink basis-1/2');
  });

  it('should convert fxFlex with non-valid tailwind grow, shrink and basis values', () => {
    expectValidConversion(`<div fxFlex="2 2 50%"></div>`, 'grow-[2] shrink-[2] basis-1/2');
  });

  it('should convert fxFlex="1 1 0%"', () => {
    expectValidConversion(`<div fxFlex="1 1 0%"></div>`, 'flex-1');
  });

  it('should convert fxFlex="1 1 auto"', () => {
    expectValidConversion(`<div fxFlex="1 1 auto"></div>`, 'flex-auto');
  });

  it('should convert fxFlex="0 1 auto"', () => {
    expectValidConversion(`<div fxFlex="0 1 auto"></div>`, 'flex-initial');
  });

  it('should convert fxFlex="0 0 auto"', () => {
    expectValidConversion(`<div fxFlex="0 0 auto"></div>`, 'flex-none');
  });

  it('should convert fxFlex="grow"', () => {
    expectValidConversion(`<div fxFlex="grow"></div>`, 'basis-full');
  });

  it('should convert fxFlex="initial"', () => {
    expectValidConversion(`<div fxFlex="initial"></div>`, 'flex-initial');
  });

  it('should convert fxFlex="auto"', () => {
    expectValidConversion(`<div fxFlex="auto"></div>`, 'flex-auto');
  });

  it('should convert fxFlex="none"', () => {
    expectValidConversion(`<div fxFlex="none"></div>`, 'flex-none');
  });

  it('should convert fxFlex="nogrow"', () => {
    expectValidConversion(`<div fxFlex="nogrow"></div>`, 'flex-initial');
  });

  it('should convert fxFlex="noshrink"', () => {
    expectValidConversion(`<div fxFlex="noshrink"></div>`, 'grow shrink-0 basis-auto');
  });

  it('should convert fxFlex, fxShrink and fxGrow with valid tailwind values', () => {
    expectValidConversion(`<div fxFlex fxShrink="1" fxGrow="1"></div>`, 'grow shrink basis-0');
  });

  it('should convert fxFlex, fxShrink and fxGrow with non-valid tailwind values', () => {
    expectValidConversion(`<div fxFlex fxShrink="2" fxGrow="2"></div>`, 'grow-[2] shrink-[2] basis-0');
  });

  it('should convert fxFlex with a value while overriding fxGrow and fxShrink', () => {
    expectValidConversion(`<div fxFlex="1 1 0%" fxShrink="2" fxGrow="1"></div>`, 'flex-1');
  });
});
