import { convertTag } from '../../converter';

describe('fxFlexFill & fxFill directives migration', () => {
  it('should convert fxFlexFill & fxFill', () => {
    expect(convertTag(`<div fxFlexFill>`)).toEqual(`<div class="h-full w-full min-h-full min-w-full">`);
    expect(convertTag(`<div fxFill>`)).toEqual(`<div class="h-full w-full min-h-full min-w-full">`);
  });
});
