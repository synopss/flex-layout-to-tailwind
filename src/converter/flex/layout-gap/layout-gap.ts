import { Cheerio, Element } from 'cheerio';
import { Breakpoint, classesWithBreakpoint, flexLayoutAttribute } from '../../../util/breakpoint';
import { isArbitraryValue, TAILWIND_COLUMN_VALUES, TAILWIND_ROW_VALUES, toTailwindValue } from '../../../util/tailwind';
import { validateFxLayoutValue } from '../layout/layout';

export function convertFxLayoutGapToTailwind(
  $element: Cheerio<Element>,
  fxLayout: string,
  value: string,
  breakpoint: Breakpoint | undefined,
): void {
  const { direction, flex } = validateFxLayoutValue(fxLayout);
  const { gap, child } = validateFxLayoutGapValue(value, direction);

  $element
    .addClass(classesWithBreakpoint(`${flex} ${gap}`, breakpoint))
    .removeAttr(flexLayoutAttribute('fxLayoutGap', breakpoint))
    .children()
    .addClass(classesWithBreakpoint(child, breakpoint));
}

function validateFxLayoutGapValue(value: string, direction: string) {
  value = value?.toLowerCase() ?? '';
  const [gap, grid] = value.split(' ');

  return validateGap(gap, direction, grid);
}

function validateGap(value: string, direction: string, grid: string) {
  const tailwindValue = toTailwindValue(value);

  const isPercent = value.endsWith('%');
  let gap: string;

  if (grid) {
    gap = `-mr-${tailwindValue} -mb-${tailwindValue}`;
  } else if (isPercent) {
    gap = validatePercentGap(tailwindValue, direction);
  } else if (isArbitraryValue(value) || value.endsWith('px')) {
    gap = `gap-${tailwindValue}`;
  } else {
    gap = '';
  }

  return {
    gap,
    child: grid ? `pr-${tailwindValue} pb-${tailwindValue}` : '',
  };
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
  return `space-${axis}-${value}`;
}
