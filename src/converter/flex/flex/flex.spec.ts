import { convertTag } from '../../converter';

describe('fxFlex directive migration', () => {
  it('should convert fxFlex default value', () => {
    expect(convertTag(`<div fxFlex>`)).toEqual(`<div class="flex-1">`);
    expect(convertTag(`<div fxFlex="">`)).toEqual(`<div class="flex-1">`);
  });

  it('should convert fxFlex with only a basis value', () => {
    expect(convertTag(`<div fxFlex="50%">`)).toEqual(`<div class="basis-1/2">`);
    expect(convertTag(`<div fxFlex="33.3%">`)).toEqual(`<div class="basis-1/3">`);
    expect(convertTag(`<div fxFlex="33%">`)).toEqual(`<div class="basis-[33%]">`);
    expect(convertTag(`<div fxFlex="66.6%">`)).toEqual(`<div class="basis-2/3">`);
    expect(convertTag(`<div fxFlex="66%">`)).toEqual(`<div class="basis-[66%]">`);
    expect(convertTag(`<div fxFlex="52%">`)).toEqual(`<div class="basis-[52%]">`);
    expect(convertTag(`<div fxFlex="18px">`)).toEqual(`<div class="basis-[18px]">`);
    expect(convertTag(`<div fxFlex="20px">`)).toEqual(`<div class="basis-5">`);
  });

  it('should convert fxFlew="<grow> <shrink> <basis>"', () => {
    expect(convertTag(`<div fxFlex="1 1 50%">`)).toEqual(`<div class="grow shrink basis-1/2">`);
    expect(convertTag(`<div fxFlex="0 0 50%">`)).toEqual(`<div class="grow-0 shrink-0 basis-1/2">`);
    expect(convertTag(`<div fxFlex="2 2 50%">`)).toEqual(`<div class="grow-[2] shrink-[2] basis-1/2">`);
  });

  it('should convert fxFlew="<grow> <shrink> <basis>" special cases', () => {
    expect(convertTag(`<div fxFlex="1 1 0%">`)).toEqual(`<div class="flex-1">`);
    expect(convertTag(`<div fxFlex="1 1 auto">`)).toEqual(`<div class="flex-auto">`);
    expect(convertTag(`<div fxFlex="0 1 auto">`)).toEqual(`<div class="flex-initial">`);
    expect(convertTag(`<div fxFlex="0 0 auto">`)).toEqual(`<div class="flex-none">`);
    expect(convertTag(`<div fxFlex="grow">`)).toEqual(`<div class="basis-full">`);
    expect(convertTag(`<div fxFlex="initial">`)).toEqual(`<div class="flex-initial">`);
    expect(convertTag(`<div fxFlex="auto">`)).toEqual(`<div class="flex-auto">`);
    expect(convertTag(`<div fxFlex="none">`)).toEqual(`<div class="flex-none">`);
    expect(convertTag(`<div fxFlex="nogrow">`)).toEqual(`<div class="flex-initial">`);
    expect(convertTag(`<div fxFlex="noshrink">`)).toEqual(`<div class="grow shrink-0 basis-auto">`);
  });

  it('should convert fxFlex="<grow>" fxShrink="<shrink>" fxGrow="<basis>"', () => {
    expect(convertTag(`<div fxFlex fxShrink="0" fxGrow="2">`)).toEqual(`<div class="grow-[2] shrink-0 basis-0">`);
    expect(convertTag(`<div fxFlex fxShrink="2" fxGrow="1">`)).toEqual(`<div class="grow shrink-[2] basis-0">`);
    expect(convertTag(`<div fxFlex="1 1 0%" fxShrink="2" fxGrow="1">`)).toEqual(`<div class="flex-1">`);
    expect(convertTag(`<div fxFlex="2 2 50%" fxShrink="1" fxGrow="1">`)).toEqual(
      `<div class="grow-[2] shrink-[2] basis-1/2">`,
    );
  });
});
