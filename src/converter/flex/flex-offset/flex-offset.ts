import { Cheerio, Element } from 'cheerio';
import { TAILWIND_COLUMN_VALUES, toTailwindValue } from '../../../util/tailwind';

export default function convertFxFlexOffsetToTailwind($element: Cheerio<Element>, value: string): void {
  const classValue = validateFxFlexOffsetValue(value);
  const marginPrefix = validateParent($element);

  $element.addClass(`${marginPrefix}-${classValue}`).removeAttr('fxFlexOffset');
}

function validateFxFlexOffsetValue(value: string): string {
  value = value?.toLowerCase() ?? '';
  if (!value) {
    return '0';
  }
  if (/\d$/.test(value)) {
    value += '%';
  }
  return toTailwindValue(value);
}

function validateParent($element: Cheerio<Element>): string {
  const parent = $element.parent().attr('class')?.split(' ') ?? [];
  if (parent.some(x => TAILWIND_COLUMN_VALUES.includes(x))) {
    return 'mt';
  }
  return 'ml';
}
