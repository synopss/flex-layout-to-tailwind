import { Cheerio, Element } from 'cheerio';
import { Breakpoint, classesWithBreakpoint } from '../../util/breakpoint';

export function convertFxHideToTailwind(
  $element: Cheerio<Element>,
  value: string,
  breakpoint: Breakpoint | undefined,
): void {
  console.log($element.attr());
  if (value === 'true' || value === '') {
    $element.addClass(classesWithBreakpoint('hidden', breakpoint)).removeAttr('fxHide');
  } else if (value === 'false') {
    $element.addClass(classesWithBreakpoint('block', breakpoint)).removeAttr('fxHide');
  }
}

export function convertFxShowToTailwind(
  $element: Cheerio<Element>,
  value: string,
  breakpoint: Breakpoint | undefined,
): void {
  if (value === 'true' || value === '') {
    $element.addClass(classesWithBreakpoint('block', breakpoint)).removeAttr('fxShow');
  } else if (value === 'false') {
    $element.addClass(classesWithBreakpoint('hidden', breakpoint)).removeAttr('fxShow');
  }
}
