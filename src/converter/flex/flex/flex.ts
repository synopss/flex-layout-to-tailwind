import { Cheerio, Element } from 'cheerio';
import { Breakpoint, classesWithBreakpoint, flexLayoutAttribute } from '../../../util/breakpoint';
import { toTailwindValue } from '../../../util/tailwind';

export function convertFxFlexToTailwind(
  $element: Cheerio<Element>,
  value: string,
  fxGrow: string,
  fxShrink: string,
  breakpoint: Breakpoint | undefined,
): void {
  if (!value && !(fxGrow || fxShrink)) {
    updateElement($element, 'flex-1', breakpoint);
    return;
  }

  if (value === '1 1 0%') {
    updateElement($element, 'flex-1', breakpoint);
    return;
  }

  if (value === '1 1 auto' || (value === 'auto' && !(fxGrow || fxShrink))) {
    updateElement($element, 'flex-auto', breakpoint);
    return;
  }

  if (value === '0 1 auto' || value === 'initial' || value === 'nogrow') {
    updateElement($element, 'flex-initial', breakpoint);
    return;
  }

  if (value === '0 0 auto' || value === 'none') {
    updateElement($element, 'flex-none', breakpoint);
    return;
  }

  if (value === 'grow') {
    updateElement($element, 'basis-full', breakpoint);
    return;
  }

  if (value === 'noshrink') {
    updateElement($element, 'grow shrink-0 basis-auto', breakpoint);
    return;
  }

  const { grow, shrink, basis } = validateFxFlexValue(value, fxGrow, fxShrink);
  updateElement($element, `${grow} ${shrink} ${basis}`, breakpoint);
}

function updateElement($element: Cheerio<Element>, classes: string, breakpoint: Breakpoint | undefined): void {
  $element
    .addClass(classesWithBreakpoint(classes, breakpoint))
    .removeAttr(flexLayoutAttribute('fxFlex', breakpoint))
    .removeAttr(flexLayoutAttribute('fxGrow', breakpoint))
    .removeAttr(flexLayoutAttribute('fxShrink', breakpoint));
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
