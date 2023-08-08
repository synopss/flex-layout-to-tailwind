import { Cheerio, Element } from 'cheerio';

export function convertFxFlexFillToTailwind($element: Cheerio<Element>): void {
  $element.addClass('h-full w-full min-h-full min-w-full').removeAttr('fxFlexFill').removeAttr('fxFill');
}
