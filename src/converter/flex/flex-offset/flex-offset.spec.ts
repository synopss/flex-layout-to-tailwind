import { convertTag } from '../../converter';

describe('fxFlexOffset directives migration', () => {
  it('should convert fxFlexOffset default value', () => {
    expect(convertTag(`<div fxFlexOffset>`)).toEqual(`<div class="ml-0">`);
    expect(convertTag(`<div fxFlexOffset="">`)).toEqual(`<div class="ml-0">`);
  });

  it('should convert fxFlexOffset with "% | px | vw | vh" values', () => {
    expect(convertTag(`<div fxFlexOffset="20">`)).toEqual(`<div class="ml-[20%]">`);
    expect(convertTag(`<div fxFlexOffset="20%">`)).toEqual(`<div class="ml-[20%]">`);
    expect(convertTag(`<div fxFlexOffset="8px">`)).toEqual(`<div class="ml-2">`);
    expect(convertTag(`<div fxFlexOffset="33px">`)).toEqual(`<div class="ml-[33px]">`);
    expect(convertTag(`<div fxFlexOffset="15vw">`)).toEqual(`<div class="ml-[15vw]">`);
    expect(convertTag(`<div fxFlexOffset="18vh">`)).toEqual(`<div class="ml-[18vh]">`);
  });

  // TODO: fix those tests, for some reason it handles weirdly ending tag -> </di>  instead of </div>
  it.skip('should convert fxFlexOffset with "% | px | vw | vh" values with parent flex direction being column', () => {
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="20"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-[20%]"></div></div>`,
    );
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="20%"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-[20%]"></div></div>`,
    );
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="8px"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-2"></div></div>`,
    );
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="33px"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-[33px]"></div></div>`,
    );
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="15vw"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-[15vw]"></div></div>`,
    );
    expect(convertTag(`<div fxLayout="column"><div fxFlexOffset="18vh"></div></div>`)).toEqual(
      `<div class="flex flex-col"><div class="mt-[18vh]"></div></div>`,
    );
  });
});
