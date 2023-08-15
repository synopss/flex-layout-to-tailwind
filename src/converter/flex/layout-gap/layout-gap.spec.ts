import { expectValidChildConversion, expectValidConversion } from '../../../util/test-util';

describe('fxLayoutGap directive migration', () => {
  it('should convert fxLayoutGap with no value', () => {
    expectValidConversion(`<div fxLayoutGap></div>`, 'flex');
  });

  it('should convert fxLayoutGap with empty value', () => {
    expectValidConversion(`<div fxLayoutGap=""></div>`, 'flex');
  });

  it('should convert fxLayoutGap="0"', () => {
    expectValidConversion(`<div fxLayoutGap="0px"></div>`, 'flex gap-0');
  });

  it('should convert fxLayoutGap="1px"', () => {
    expectValidConversion(`<div fxLayoutGap="1px"></div>`, 'flex gap-px');
  });

  it('should convert fxLayoutGap with valid tailwind px value', () => {
    expectValidConversion(`<div fxLayoutGap="20px"></div>`, 'flex gap-5');
  });

  it('should convert fxLayoutGap with non-valid tailwind px value', () => {
    expectValidConversion(`<div fxLayoutGap="18px"></div>`, 'flex gap-[18px]');
  });

  it('should convert fxLayoutGap with vh value', () => {
    expectValidConversion(`<div fxLayoutGap="10vh"></div>`, 'flex gap-[10vh]');
  });

  it('should convert fxLayoutGap with vw value', () => {
    expectValidConversion(`<div fxLayoutGap="10vw"></div>`, 'flex gap-[10vw]');
  });

  it('should convert fxLayoutGap with % value', () => {
    expectValidConversion(`<div fxLayoutGap="10%"></div>`, 'flex space-x-[10%]');
  });

  it('should convert fxLayoutGap with % value with fxLayout="column"', () => {
    expectValidConversion(`<div fxLayout="column" fxLayoutGap="10%"></div>`, 'flex flex-col space-y-[10%]');
  });

  it('should convert fxLayoutGap with grid and valid tailwind px value"', () => {
    expectValidConversion(`<div fxLayoutGap="20px grid"><div>child</div></div>`, 'flex -mr-5 -mb-5');
    expectValidChildConversion(`<div fxLayoutGap="20px grid"><div>child</div></div>`, 'pr-5 pb-5');
  });

  it('should convert fxLayoutGap with grid and non-valid tailwind px value"', () => {
    expectValidConversion(`<div fxLayoutGap="18px grid"><div>child</div></div>`, 'flex -mr-[18px] -mb-[18px]');
    expectValidChildConversion(`<div fxLayoutGap="18px grid"><div>child</div></div>`, 'pr-[18px] pb-[18px]');
  });

  it('should convert fxLayoutGap with grid and % value"', () => {
    expectValidConversion(`<div fxLayoutGap="10% grid"><div>child</div></div>`, 'flex -mr-[10%] -mb-[10%]');
    expectValidChildConversion(`<div fxLayoutGap="10% grid"><div>child</div></div>`, 'pr-[10%] pb-[10%]');
  });

  it('should convert fxLayoutGap with grid and vh value"', () => {
    expectValidConversion(`<div fxLayoutGap="10vh grid"><div>child</div></div>`, 'flex -mr-[10vh] -mb-[10vh]');
    expectValidChildConversion(`<div fxLayoutGap="10vh grid"><div>child</div></div>`, 'pr-[10vh] pb-[10vh]');
  });

  it('should convert fxLayoutGap with grid and vw value"', () => {
    expectValidConversion(`<div fxLayoutGap="10vw grid"><div>child</div></div>`, 'flex -mr-[10vw] -mb-[10vw]');
    expectValidChildConversion(`<div fxLayoutGap="10vw grid"><div>child</div></div>`, 'pr-[10vw] pb-[10vw]');
  });

  it('should convert fxLayoutGap with breakpoint', () => {
    expectValidConversion(`<div fxLayoutGap.xs></div>`, 'xs:flex');
  });

  it('should convert fxLayoutGap with grid and breakpoint"', () => {
    expectValidConversion(`<div fxLayoutGap.xs="20px grid"><div>child</div></div>`, 'xs:flex xs:-mr-5 xs:-mb-5');
    expectValidChildConversion(`<div fxLayoutGap.xs="20px grid"><div>child</div></div>`, 'xs:pr-5 xs:pb-5');
  });
});
