import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { convertFxFlexAlignToTailwind } from './flex/flex-align/flex-align';
import { convertFxFlexFillToTailwind } from './flex/flex-fill/flex-fill';
import { convertFxFlexOffsetToTailwind } from './flex/flex-offset/flex-offset';
import { convertFxFlexOrderToTailwind } from './flex/flex-order/flex-order';
import { convertFxFlexToTailwind } from './flex/flex/flex';
import { convertFxLayoutAlignToTailwind } from './flex/layout-align/layout-align';
import { convertFxLayoutGapToTailwind } from './flex/layout-gap/layout-gap';
import { convertFxLayoutToTailwind } from './flex/layout/layout';

export function convertFile($: CheerioAPI): void {
  $('[fxLayout], [fxLayoutGap], [fxLayoutAlign]').each((_, element) => {
    const $element: Cheerio<Element> = $(element);

    const fxLayout = $element.attr('fxLayout');
    const fxLayoutGap = $element.attr('fxLayoutGap');
    const fxLayoutAlign = $element.attr('fxLayoutAlign');

    if (fxLayoutAlign !== undefined) {
      convertFxLayoutAlignToTailwind($element, fxLayoutAlign);
    }

    if (fxLayout !== undefined) {
      convertFxLayoutToTailwind($element, fxLayout);
    }

    if (fxLayoutGap !== undefined) {
      convertFxLayoutGapToTailwind($element, fxLayout ?? '', fxLayoutGap);
    }
  });

  $('[fxFlex], [fxGrow], [fxShrink]').each((_, element) => {
    const $element: Cheerio<Element> = $(element);
    const fxFlex = $element.attr('fxFlex');
    const fxGrow = $element.attr('fxGrow');
    const fxShrink = $element.attr('fxShrink');

    if (fxFlex !== undefined) {
      convertFxFlexToTailwind($element, fxFlex, fxGrow ?? '', fxShrink ?? '');
    }
  });

  $('[fxFill], [fxFlexFill]').each((_, element) => {
    const $element: Cheerio<Element> = $(element);
    convertFxFlexFillToTailwind($element);
  });

  $('[fxFlexOrder]').each((_n, element) => {
    const $element: Cheerio<Element> = $(element);
    const fxFlexOrder = $element.attr('fxFlexOrder');

    convertFxFlexOrderToTailwind($element, fxFlexOrder ?? '');
  });

  $('[fxFlexAlign]').each((_n, element) => {
    const $element: Cheerio<Element> = $(element);
    const fxFlexAlign = $element.attr('fxFlexAlign');

    convertFxFlexAlignToTailwind($element, fxFlexAlign ?? '');
  });

  $('[fxFlexOffset]').each((_n, element) => {
    const $element: Cheerio<Element> = $(element);
    const fxFlexOffset = $element.attr('fxFlexOffset');

    convertFxFlexOffsetToTailwind($element, fxFlexOffset ?? '');
  });
}
