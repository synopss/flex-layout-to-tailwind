import { Cheerio, Element } from 'cheerio';

const FLEX_ALIGN_VALUES = ['auto', 'start', 'end', 'center', 'stretch', 'baseline'];

export function convertFxFlexAlignToTailwind($element: Cheerio<Element>, value: string): void {
  const classValue = validateFxFlexAlignValue(value);

  $element.addClass(classValue).removeAttr('fxFlexAlign');
}

function validateFxFlexAlignValue(value: string): string {
  if (FLEX_ALIGN_VALUES.includes(value)) {
    return `self-${value}`;
  }

  return 'self-stretch';
}
