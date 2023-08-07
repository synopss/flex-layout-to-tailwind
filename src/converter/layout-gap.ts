import { Cheerio, Element } from 'cheerio';
import { TAILWIND_COLUMN_VALUES, TAILWIND_ROW_VALUES, toTailwindValue } from '../util/tailwind';
import { validateFxLayoutValue } from './layout';

export function convertFxLayoutGapToTailwind($element: Cheerio<Element>, fxLayout: string, value: string): void {
  const { direction, flex } = validateFxLayoutValue(fxLayout);
  const { gap, child } = validateFxLayoutGapValue(value, direction);

  $element.addClass(`${flex} ${gap}`).removeAttr('fxLayoutGap').children().addClass(child);
}

function validateFxLayoutGapValue(value: string, direction: string) {
  value = value?.toLowerCase() ?? '';
  const [gap, grid] = value.split(' ');

  return validateGap(gap, direction, grid);
}

function validateGap(value: string, direction: string, grid: string) {
  const isPx = value.endsWith('px');
  const isPercent = value.endsWith('%');
  let gap: string;

  if (grid) {
    gap = validateGridGap(value);
  } else if (isPx) {
    gap = validatePxGap(value);
  } else if (isPercent) {
    gap = validatePercentGap(value, direction);
  } else {
    gap = '';
  }

  return {
    gap,
    child: grid ? validateGridChild(value) : '',
  };
}

function validateGridGap(value: string): string {
  const tailwindValue = toTailwindValue(value);
  return `-mr-${tailwindValue} -mb-${tailwindValue}`;
}

function validatePxGap(value: string): string {
  return `gap-${toTailwindValue(value)}`;
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

function validateGridChild(value: string): string {
  const tailwindValue = toTailwindValue(value);

  return `pr-${tailwindValue} pb-${tailwindValue}`;
}
