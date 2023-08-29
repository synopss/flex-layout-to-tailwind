import { expectValidConversion } from '../../util/test-util';

describe('fxFlex directive migration', () => {
  it('should convert fxShow with no value', () => {
    expectValidConversion(`<div fxShow></div>`, 'block');
  });

  it('should convert fxShow with empty value', () => {
    expectValidConversion(`<div fxShow=""></div>`, 'block');
  });

  it('should convert fxHide with no value', () => {
    expectValidConversion(`<div fxHide></div>`, 'hidden');
  });

  it('should convert fxHide with empty value', () => {
    expectValidConversion(`<div fxHide=""></div>`, 'hidden');
  });

  it('should convert fxShow="false"', () => {
    expectValidConversion(`<div fxShow="false"></div>`, 'hidden');
  });

  it('should convert fxHide="false"', () => {
    expectValidConversion(`<div fxHide="false"></div>`, 'block');
  });

  it('should convert fxShow with breakpoint', () => {
    expectValidConversion(`<div fxShow.xs></div>`, 'xs:block');
  });

  it('should convert fxHide with breakpoint', () => {
    expectValidConversion(`<div fxHide.xs></div>`, 'xs:hidden');
  });
});
