import { convertTag } from '../../converter';

describe('fxLayout directive migration', () => {
  it('should convert fxLayout default value', () => {
    expect(convertTag(`<div fxLayout>`)).toEqual(`<div class="flex flex-row">`);
    expect(convertTag(`<div fxLayout="">`)).toEqual(`<div class="flex flex-row">`);
  });

  it('should convert fxLayout="row"', () => {
    expect(convertTag(`<div fxLayout="row">`)).toEqual(`<div class="flex flex-row">`);
    expect(convertTag(`<div fxLayout="row inline">`)).toEqual(`<div class="inline-flex flex-row">`);
    expect(convertTag(`<div fxLayout="row wrap inline">`)).toEqual(`<div class="inline-flex flex-row flex-wrap">`);
    expect(convertTag(`<div fxLayout="row wrap-reverse inline">`)).toEqual(
      `<div class="inline-flex flex-row flex-wrap-reverse">`,
    );
    expect(convertTag(`<div fxLayout="row nowrap inline">`)).toEqual(`<div class="inline-flex flex-row flex-nowrap">`);
  });

  it('should convert fxLayout="row-reverse"', () => {
    expect(convertTag(`<div fxLayout="row-reverse">`)).toEqual(`<div class="flex flex-row-reverse">`);
    expect(convertTag(`<div fxLayout="row-reverse inline">`)).toEqual(`<div class="inline-flex flex-row-reverse">`);
    expect(convertTag(`<div fxLayout="row-reverse wrap inline">`)).toEqual(
      `<div class="inline-flex flex-row-reverse flex-wrap">`,
    );
    expect(convertTag(`<div fxLayout="row-reverse wrap-reverse inline">`)).toEqual(
      `<div class="inline-flex flex-row-reverse flex-wrap-reverse">`,
    );
    expect(convertTag(`<div fxLayout="row-reverse nowrap inline">`)).toEqual(
      `<div class="inline-flex flex-row-reverse flex-nowrap">`,
    );
  });

  it('should convert fxLayout="column"', () => {
    expect(convertTag(`<div fxLayout="column">`)).toEqual(`<div class="flex flex-col">`);
    expect(convertTag(`<div fxLayout="column inline">`)).toEqual(`<div class="inline-flex flex-col">`);
    expect(convertTag(`<div fxLayout="column wrap inline">`)).toEqual(`<div class="inline-flex flex-col flex-wrap">`);
    expect(convertTag(`<div fxLayout="column wrap-reverse inline">`)).toEqual(
      `<div class="inline-flex flex-col flex-wrap-reverse">`,
    );
    expect(convertTag(`<div fxLayout="column nowrap inline">`)).toEqual(
      `<div class="inline-flex flex-col flex-nowrap">`,
    );
  });

  it('should convert fxLayout="column-reverse"', () => {
    expect(convertTag(`<div fxLayout="column-reverse">`)).toEqual(`<div class="flex flex-col-reverse">`);
    expect(convertTag(`<div fxLayout="column-reverse inline">`)).toEqual(`<div class="inline-flex flex-col-reverse">`);
    expect(convertTag(`<div fxLayout="column-reverse wrap inline">`)).toEqual(
      `<div class="inline-flex flex-col-reverse flex-wrap">`,
    );
    expect(convertTag(`<div fxLayout="column-reverse wrap-reverse inline">`)).toEqual(
      `<div class="inline-flex flex-col-reverse flex-wrap-reverse">`,
    );
    expect(convertTag(`<div fxLayout="column-reverse nowrap inline">`)).toEqual(
      `<div class="inline-flex flex-col-reverse flex-nowrap">`,
    );
  });
});
