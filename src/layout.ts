const LAYOUT_VALUES = ['row', 'column', 'row-reverse', 'column-reverse'];
export const INLINE = 'inline';

export function convertFxLayoutToTailwind($element: cheerio.Cheerio, value: string): void {
  let [direction, wrap, flex] = validateValue(value);

  $element
    .addClass(`${flex} ${direction} ${wrap}`)
    .removeAttr('fxLayout');
}

function validateValue(value: string): [string, string, string] {
  value = value?.toLowerCase() ?? '';
  let [direction, wrap, inline] = value.split(' ');
  
  if (!LAYOUT_VALUES.find(x => x === direction)) {
    direction = LAYOUT_VALUES[0];
  }
  
  if (wrap === INLINE) {
    wrap = (inline !== INLINE) ? inline : '';
    inline = INLINE;
  }
  
  return [validateDirection(direction), validateWrap(wrap), validateFlex(!!inline)];
}

function validateDirection(value: string): string {
  switch (value) {
    case 'row':
      value = 'flex-row';
      break;
    case 'column':
      value = 'flex-col';
      break;
    case 'row-reverse':
      value = 'flex-row-reverse';
      break;
    case 'column-reverse':
      value = 'flex-col-reverse';
      break;
    default:
      value = '';
      break;
  }
  return value;
}

function validateWrap(value: string): string {
  switch (value) {
    case 'wrap':
      value = 'flex-wrap';
      break;
    case 'wrap-reverse':
      value = 'flex-wrap-reverse';
      break;
    case 'nowrap':
      value = 'flex-nowrap';
      break;
    default:
      value = '';
      break;
  }
  return value;
}

function validateFlex(value: boolean): string {
  return value ? 'inline-flex' : 'flex';
}
