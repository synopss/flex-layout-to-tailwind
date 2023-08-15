import { Cheerio, Element } from 'cheerio';
import { Breakpoint, classWithBreakpoint, flexLayoutAttribute } from '../../../util/breakpoint';

export function convertFxFlexOrderToTailwind(
  $element: Cheerio<Element>,
  value: string,
  breakpoint: Breakpoint | undefined,
): void {
  const classValue = validateFxFlexOrderValue(value);

  $element
    .addClass(classWithBreakpoint(classValue, breakpoint))
    .removeAttr(flexLayoutAttribute('fxFlexOrder', breakpoint));
}

function validateFxFlexOrderValue(value: string): string {
  const numberValue = parseInt(value);

  if (!numberValue || numberValue === 0) {
    return 'order-none';
  }
  if (numberValue === 9999) {
    return 'order-last';
  }
  if (numberValue === -9999) {
    return 'order-first';
  }
  if (numberValue < 0 && numberValue >= -12) {
    return `-order-${Math.abs(numberValue)}`;
  }
  if (numberValue < -12) {
    return `-order-[${Math.abs(numberValue)}]`;
  }
  if (numberValue > 12) {
    return `order-[${numberValue}]`;
  }
  return `order-${numberValue}`;
}
