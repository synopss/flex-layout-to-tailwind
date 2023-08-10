import { expectValidConversion } from '../../../util/test-util';

describe('fxFlexOffset directives migration', () => {
  it('should convert fxFlexOffset with no value', () => {
    expectValidConversion(`<div fxFlexOffset></div>`, 'ml-0');
  });

  it('should convert fxLayout with empty value', () => {
    expectValidConversion(`<div fxFlexOffset=""></div>`, 'ml-0');
  });

  it('should convert fxFlexOffset with value with no unit', () => {
    expectValidConversion(`<div fxFlexOffset="20"></div>`, 'ml-[20%]');
  });

  it('should convert fxFlexOffset with % value', () => {
    expectValidConversion(`<div fxFlexOffset="20%"></div>`, 'ml-[20%]');
  });

  it('should convert fxFlexOffset with valid tailwind px value', () => {
    expectValidConversion(`<div fxFlexOffset="8px"></div>`, 'ml-2');
  });

  it('should convert fxFlexOffset with non-valid tailwind px value', () => {
    expectValidConversion(`<div fxFlexOffset="33px"></div>`, 'ml-[33px]');
  });

  it('should convert fxFlexOffset with vh value', () => {
    expectValidConversion(`<div fxFlexOffset="18vh"></div>`, 'ml-[18vh]');
  });

  it('should convert fxFlexOffset with vw value', () => {
    expectValidConversion(`<div fxFlexOffset="15vw"></div>`, 'ml-[15vw]');
  });

  it('should convert fxFlexOffset with no value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset></div></div>`, 'mt-0');
  });

  it('should convert fxLayout with empty value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset=""></div></div>`, 'mt-0');
  });

  it('should convert fxFlexOffset with value with no unit  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="20"></div></div>`, 'mt-[20%]');
  });

  it('should convert fxFlexOffset with % value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="20%"></div></div>`, 'mt-[20%]');
  });

  it('should convert fxFlexOffset with valid tailwind px value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="8px"></div></div>`, 'mt-2');
  });

  it('should convert fxFlexOffset with non-valid tailwind px value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="33px"></div></div>`, 'mt-[33px]');
  });

  it('should convert fxFlexOffset with vh value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="18vh"></div></div>`, 'mt-[18vh]');
  });

  it('should convert fxFlexOffset with vw value  with parent flex direction being column', () => {
    expectValidConversion(`<div class="flex flex-col"><div fxFlexOffset="15vw"></div></div>`, 'mt-[15vw]');
  });
});
