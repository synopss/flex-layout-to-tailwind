const TAILWIND_DEFAULT_SPACING_VALUES = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64,
  72, 80, 96,
];
const TAILWIND_DEFAULT_DENOMINATOR = [2, 3, 4, 5, 6, 12];
export const TAILWIND_LAYOUT_VALUES = ['flex-row', 'flex-col', 'flex-row-reverse', 'flex-col-reverse'];
export const TAILWIND_ROW_VALUES = ['flex-row', 'flex-row-reverse'];
export const TAILWIND_COLUMN_VALUES = ['flex-col', 'flex-col-reverse'];
export const TAILWIND_FLEX_VALUES = ['flex', 'inline-flex'];

export function isArbitraryValue(value: string): boolean {
  return !!RegExp(/^\d+(\.\d+)?(px|em|rem|%|vw|vh|vmin|vmax)$/).exec(value);
}

export function toTailwindValue(value: string, percentToFraction: boolean = false): string {
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

  if (value.endsWith('%') && percentToFraction) {
    return percentageToFraction(value);
  }

  return `[${value}]`;
}

// Looks ugly, might find a nicer way to do that in the futur
function percentageToFraction(percentage: string): string {
  if (percentage.startsWith('33.3')) {
    return '1/3';
  }

  if (percentage.startsWith('66.6')) {
    return '2/3';
  }

  const denominator = 100;
  const numerator = parseInt(percentage);
  const gcdValue = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / gcdValue;
  const simplifiedDenominator = denominator / gcdValue;

  return TAILWIND_DEFAULT_DENOMINATOR.includes(simplifiedDenominator)
    ? `${simplifiedNumerator}/${simplifiedDenominator}`
    : `[${percentage}]`;
}

function gcd(a: number, b: number): number {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}
