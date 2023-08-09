import { Cheerio, Element } from 'cheerio';
import { toTailwindValue } from '../../../util/tailwind';

export function convertFxFlexToTailwind(
  $element: Cheerio<Element>,
  value: string,
  fxGrow: string,
  fxShrink: string,
): void {
  if (!value && !(fxGrow || fxShrink)) {
    updateElement($element, 'flex-1');
    return;
  }

  if (value === '1 1 0%') {
    updateElement($element, 'flex-1');
    return;
  }

  if (value === '1 1 auto' || (value === 'auto' && !(fxGrow || fxShrink))) {
    updateElement($element, 'flex-auto');
    return;
  }

  if (value === '0 1 auto' || value === 'initial' || value === 'nogrow') {
    updateElement($element, 'flex-initial');
    return;
  }

  if (value === '0 0 auto' || value === 'none') {
    updateElement($element, 'flex-none');
    return;
  }

  if (value === 'grow') {
    updateElement($element, 'basis-full');
    return;
  }

  if (value === 'noshrink') {
    updateElement($element, 'grow shrink-0 basis-auto');
    return;
  }

  const { grow, shrink, basis } = validateFxFlexValue(value, fxGrow, fxShrink);
  updateElement($element, `${grow} ${shrink} ${basis}`);
}

function updateElement($element: Cheerio<Element>, classes: string): void {
  $element.addClass(classes).removeAttr('fxFlex').removeAttr('fxGrow').removeAttr('fxShrink');
}

function validateFxFlexValue(value: string, fxGrow: string, fxShrink: string) {
  value = value?.toLowerCase() ?? '';
  const values = value.split(' ');
  const [grow, shrink, basis] = values;

  if (values.length <= 1) {
    return {
      grow: validateGrowValue(fxGrow),
      shrink: validateShrinkValue(fxShrink),
      basis: validateBasisValue(grow),
    };
  }

  return {
    grow: validateGrowValue(grow),
    shrink: validateShrinkValue(shrink),
    basis: validateBasisValue(basis),
  };
}

function validateGrowValue(value: string): string {
  if (!value) {
    return '';
  }
  const numberValue = parseInt(value);
  if (numberValue === 1) {
    return 'grow';
  }
  if (numberValue > 1) {
    return `grow-[${numberValue}]`;
  }
  return `grow-${numberValue}`;
}

function validateShrinkValue(value: string): string {
  if (/\d$/.test(value)) {
    value += '%';
  }
  if (!value) {
    return '';
  }
  const numberValue = parseInt(value);
  if (numberValue === 1) {
    return 'shrink';
  }
  if (numberValue > 1) {
    return `shrink-[${numberValue}]`;
  }
  return `shrink-${numberValue}`;
}

function validateBasisValue(value: string): string {
  if (/\d$/.test(value)) {
    value += '%';
  }
  if (!value) {
    return 'basis-0';
  }
  if (value === 'auto') {
    return 'basis-auto';
  }
  if (parseInt(value) === 100) {
    return 'basis-full';
  }
  return `basis-${toTailwindValue(value, true)}`;
}
