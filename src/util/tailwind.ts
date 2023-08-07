export const TAILWIND_DEFAULT_SPACING_VALUES = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
  72, 80, 96,
];
export const TAILWIND_LAYOUT_VALUES = ['flex-row', 'flex-col', 'flex-row-reverse', 'flex-col-reverse'];
export const TAILWIND_ROW_VALUES = ['flex-row', 'flex-row-reverse'];
export const TAILWIND_COLUMN_VALUES = ['flex-col', 'flex-col-reverse'];
export const TAILWIND_FLEX_VALUES = ['flex', 'inline-flex'];

export function isArbitraryValue(value: string): boolean {
  return !!RegExp(/^\d+(\.\d+)?(px|em|rem|%|vw|vh|vmin|vmax)$/).exec(value);
}

export function toTailwindValue(value: string): string {
  if (value === '' || !isArbitraryValue(value) || value === undefined) {
    return '';
  }

  if (value.endsWith('px')) {
    const numberValue = parseInt(value);
    const possibleTailwindNumber = numberValue / 4;

    if (TAILWIND_DEFAULT_SPACING_VALUES.includes(possibleTailwindNumber)) {
      return `${numberValue / 4}`;
    }
    if (numberValue === 1) {
      return `px`;
    }
  }

  return `[${value}]`;
}
