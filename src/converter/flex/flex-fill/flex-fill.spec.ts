import { expectValidConversion } from '../../../util/test-util';

describe('fxFlexFill & fxFill directives migration', () => {
  it('should convert fxFlexFill', () => {
    expectValidConversion(`<div fxFlexFill></div>`, 'h-full w-full min-h-full min-w-full');
  });

  it('should convert fxFill', () => {
    expectValidConversion(`<div fxFlexFill=""></div>`, 'h-full w-full min-h-full min-w-full');
  });
});
