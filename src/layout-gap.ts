import { Cheerio, Element } from 'cheerio';
import { validateFxLayoutValue } from './layout';
import { TAILWIND_COLUMN_VALUES, TAILWIND_DEFAULT_SPACING_VALUES, TAILWIND_ROW_VALUES } from './tailwind';

//TODO: handle grid
export function convertFxLayoutGapToTailwind($element: Cheerio<Element>, fxLayout: string, value: string): void {
  const { direction, flex } = validateFxLayoutValue(fxLayout);
  const { gap, grid } = validateFxLayoutGapValue(value, direction);

  $element.addClass(`${flex} ${gap} ${grid}`).removeAttr('fxLayoutGap');
}

function validateFxLayoutGapValue(value: string, direction: string) {
  value = value?.toLowerCase() ?? '';
  const [gap, grid] = value.split(' ');
  return {
    gap: validateGap(gap, direction),
    grid: grid ?? '',
  };
}

function validateGap(value: string, direction: string): string {
  const isPx = value.endsWith('px');
  const isPercent = value.endsWith('%');

  if (isPx) {
    value = validatePxGap(value);
  } else if (isPercent) {
    value = validatePercentGap(value, direction);
  } else {
    return '';
  }

  return value;
}

function validatePxGap(value: string): string {
  const numberValue = +value.slice(0, -2);
  const possibleTailwindNumber = numberValue / 4;
  if (TAILWIND_DEFAULT_SPACING_VALUES.includes(possibleTailwindNumber)) {
    return `gap-${numberValue / 4}`;
  }
  if (numberValue === 1) {
    return `gap-px`;
  }
  return `gap-[${numberValue}px]`;
}

function validatePercentGap(value: string, direction: string): string {
  let axis: string;
  if (TAILWIND_COLUMN_VALUES.includes(direction)) {
    axis = 'y';
  } else if (TAILWIND_ROW_VALUES.includes(direction)) {
    axis = 'x';
  } else {
    return '';
  }
  return `space-${axis}-[${value}]`;
}
