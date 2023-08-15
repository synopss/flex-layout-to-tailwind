import { Cheerio, Element } from 'cheerio';
import { Breakpoint, classWithBreakpoint, flexLayoutAttribute } from '../../../util/breakpoint';

const FLEX_ALIGN_VALUES = ['auto', 'start', 'end', 'center', 'stretch', 'baseline'];

export function convertFxFlexAlignToTailwind(
  $element: Cheerio<Element>,
  value: string,
  breakpoint: Breakpoint | undefined,
): void {
  const classValue = validateFxFlexAlignValue(value);

  $element
    .addClass(classWithBreakpoint(classValue, breakpoint))
    .removeAttr(flexLayoutAttribute('fxFlexAlign', breakpoint));
}

function validateFxFlexAlignValue(value: string): string {
  if (FLEX_ALIGN_VALUES.includes(value)) {
    return `self-${value}`;
  }

  return 'self-stretch';
}
