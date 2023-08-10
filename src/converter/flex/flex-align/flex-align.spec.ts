import { expectValidConversion } from '../../../util/test-util';

describe('fxFlexAlign directive migration', () => {
  it('should convert fxFlexAlign with no value', () => {
    expectValidConversion(`<div fxFlexAlign></div>`, 'self-stretch');
  });

  it('should convert fxFlexAlign with empty value', () => {
    expectValidConversion(`<div fxFlexAlign></div>`, 'self-stretch');
  });

  it('should convert fxFlexAlign="start"', () => {
    expectValidConversion(`<div fxFlexAlign="start"></div>`, 'self-start');
  });

  it('should convert fxFlexAlign="center"', () => {
    expectValidConversion(`<div fxFlexAlign="center"></div>`, 'self-center');
  });

  it('should convert fxFlexAlign="end"', () => {
    expectValidConversion(`<div fxFlexAlign="end"></div>`, 'self-end');
  });

  it('should convert fxFlexAlign="baseline"', () => {
    expectValidConversion(`<div fxFlexAlign="baseline"></div>`, 'self-baseline');
  });

  it('should convert fxFlexAlign="stretch"', () => {
    expectValidConversion(`<div fxFlexAlign="stretch"></div>`, 'self-stretch');
  });

  it('should convert fxFlexAlign="auto"', () => {
    expectValidConversion(`<div fxFlexAlign="auto"></div>`, 'self-auto');
  });
});
