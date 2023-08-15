import { expectValidConversion } from '../../../util/test-util';

describe('fxLayout directive migration', () => {
  it('should convert fxLayout with no value', () => {
    expectValidConversion(`<div fxLayout></div>`, 'flex flex-row');
  });

  it('should convert fxLayout with empty value', () => {
    expectValidConversion(`<div fxLayout=""></div>`, 'flex flex-row');
  });

  it('should convert fxLayout="row"', () => {
    expectValidConversion(`<div fxLayout="row"></div>`, 'flex flex-row');
  });

  it('should convert fxLayout="row inline"', () => {
    expectValidConversion(`<div fxLayout="row inline"></div>`, 'inline-flex flex-row');
  });

  it('should convert fxLayout="row wrap inline"', () => {
    expectValidConversion(`<div fxLayout="row wrap inline"></div>`, 'inline-flex flex-row flex-wrap');
  });

  it('should convert fxLayout="row wrap-reverse inline"', () => {
    expectValidConversion(`<div fxLayout="row wrap-reverse inline"></div>`, 'inline-flex flex-row flex-wrap-reverse');
  });

  it('should convert fxLayout="row nowrap inline"', () => {
    expectValidConversion(`<div fxLayout="row nowrap inline"></div>`, 'inline-flex flex-row flex-nowrap');
  });

  it('should convert fxLayout="row-reverse"', () => {
    expectValidConversion(`<div fxLayout="row-reverse"></div>`, 'flex flex-row-reverse');
  });

  it('should convert fxLayout="row-reverse inline"', () => {
    expectValidConversion(`<div fxLayout="row-reverse inline"></div>`, 'inline-flex flex-row-reverse');
  });

  it('should convert fxLayout="row-reverse wrap inline"', () => {
    expectValidConversion(`<div fxLayout="row-reverse wrap inline"></div>`, 'inline-flex flex-row-reverse flex-wrap');
  });

  it('should convert fxLayout="row-reverse wrap-reverse inline"', () => {
    expectValidConversion(
      `<div fxLayout="row-reverse wrap-reverse inline"></div>`,
      'inline-flex flex-row-reverse flex-wrap-reverse',
    );
  });

  it('should convert fxLayout="row-reverse nowrap inline"', () => {
    expectValidConversion(
      `<div fxLayout="row-reverse nowrap inline"></div>`,
      'inline-flex flex-row-reverse flex-nowrap',
    );
  });

  it('should convert fxLayout="column"', () => {
    expectValidConversion(`<div fxLayout="column"></div>`, 'flex flex-col');
  });

  it('should convert fxLayout="column inline"', () => {
    expectValidConversion(`<div fxLayout="column inline"></div>`, 'inline-flex flex-col');
  });

  it('should convert fxLayout="column wrap inline"', () => {
    expectValidConversion(`<div fxLayout="column wrap inline"></div>`, 'inline-flex flex-col flex-wrap');
  });

  it('should convert fxLayout="column wrap-reverse inline"', () => {
    expectValidConversion(
      `<div fxLayout="column wrap-reverse inline"></div>`,
      'inline-flex flex-col flex-wrap-reverse',
    );
  });

  it('should convert fxLayout="column nowrap inline"', () => {
    expectValidConversion(`<div fxLayout="column nowrap inline"></div>`, 'inline-flex flex-col flex-nowrap');
  });

  it('should convert fxLayout="column-reverse"', () => {
    expectValidConversion(`<div fxLayout="column-reverse"></div>`, 'flex flex-col-reverse');
  });

  it('should convert fxLayout="column-reverse inline"', () => {
    expectValidConversion(`<div fxLayout="column-reverse inline"></div>`, 'inline-flex flex-col-reverse');
  });

  it('should convert fxLayout="column-reverse wrap inline"', () => {
    expectValidConversion(
      `<div fxLayout="column-reverse wrap inline"></div>`,
      'inline-flex flex-col-reverse flex-wrap',
    );
  });

  it('should convert fxLayout="column-reverse wrap-reverse inline"', () => {
    expectValidConversion(
      `<div fxLayout="column-reverse wrap-reverse inline"></div>`,
      'inline-flex flex-col-reverse flex-wrap-reverse',
    );
  });

  it('should convert fxLayout="column-reverse nowrap inline"', () => {
    expectValidConversion(
      `<div fxLayout="column-reverse nowrap inline"></div>`,
      'inline-flex flex-col-reverse flex-nowrap',
    );
  });

  it('should convert fxLayout with breakpoint', () => {
    expectValidConversion(`<div fxLayout.xs></div>`, 'xs:flex xs:flex-row');
  });
});
