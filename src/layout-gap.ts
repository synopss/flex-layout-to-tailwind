import { validateFxLayoutValue } from './layout'
import { TAILWIND_COLUMN_VALUES, TAILWIND_DEFAULT_SPACING_VALUES, TAILWIND_ROW_VALUES } from './tailwind'

//TODO: handle grid
export function convertFxLayoutGapToTailwind($element: cheerio.Cheerio, fxLayout: string, value: string): void {
  const { direction, flex } = validateFxLayoutValue(fxLayout);
  const { gap, grid } = validateFxLayoutGapValue(value, direction);

  $element.addClass(`${flex} ${gap} ${grid}`);

  // let [layout] = (fxLayout || "column").split(" ");
  //
  // let spacing = 0;
  // spacing = Math.ceil(parseFloat(value) / 4); // convert from px
  //
  // if (layout === "row") {
  //   $element.addClass(`space-x-${spacing}`);
  // } else {
  //   $element.addClass(`space-y-${spacing}`);
  // }

  $element.removeAttr("fxLayoutGap");
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
  const numberValue = +(value.slice(0, -2))
  const possibleTailwindNumber = numberValue / 4
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
  }
  return `space-${axis}-[${value}]`;
}
