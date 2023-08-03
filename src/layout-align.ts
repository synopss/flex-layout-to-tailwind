import { TAILWIND_COLUMN_VALUES, TAILWIND_ROW_VALUES, TAILWIND_LAYOUT_VALUES, TAILWIND_FLEX_VALUES } from './tailwind';

export function convertFxLayoutAlignToTailwind($element: cheerio.Cheerio, value: string): void {
  const { mainAxis, crossAxis } = validateFxLayoutAlignValue(value);
  const [flex, direction, dimension] = validateParent($element);

  $element.addClass(`${flex} ${direction} ${mainAxis} ${crossAxis} ${dimension}`).removeAttr('fxLayoutAlign');
}

function validateFxLayoutAlignValue(value: string) {
  value = value?.toLowerCase() ?? '';
  const [mainAxis, crossAxis] = value.split(' ');
  return {
    mainAxis: validateMainAxis(mainAxis),
    crossAxis: validateCrossAxis(crossAxis),
  };
}

function validateMainAxis(value: string): string {
  switch (value) {
    case 'center':
      value = 'justify-center';
      break;
    case 'end':
    case 'flex-end':
      value = 'justify-end';
      break;
    case 'space-around':
      value = 'justify-around';
      break;
    case 'space-between':
      value = 'justify-between';
      break;
    case 'space-evenly':
      value = 'justify-evenly';
      break;
    case 'start':
    case 'flex-start':
    default:
      value = 'justify-start';
      break;
  }
  return value;
}

function validateCrossAxis(value: string): string {
  switch (value) {
    case 'start':
    case 'flex-start':
      value = 'content-start items-start';
      break;
    case 'center':
      value = 'content-center items-center';
      break;
    case 'end':
    case 'flex-end':
      value = 'content-end items-end';
      break;
    case 'space-around':
      value = 'content-around items-around';
      break;
    case 'space-between':
      value = 'content-between items-between';
      break;
    case 'baseline':
      value = 'content-baseline items-baseline';
      break;
    default:
      value = 'content-stretch items-stretch';
  }
  return value;
}

function validateParent($element: cheerio.Cheerio): [string, string, string] {
  const parent = $element.parent().attr('class')?.split(' ') ?? [];

  const flex = parent.find(x => TAILWIND_FLEX_VALUES.includes(x)) ?? 'flex';
  const direction = parent.find(x => TAILWIND_LAYOUT_VALUES.includes(x)) ?? '';
  let dimension = '';

  if (parent.find(x => TAILWIND_ROW_VALUES.includes(x))) {
    dimension = 'h-full';
  } else if (parent.find(x => TAILWIND_COLUMN_VALUES.includes(x))) {
    dimension = 'w-full';
  }

  return [flex, direction, dimension];
}
