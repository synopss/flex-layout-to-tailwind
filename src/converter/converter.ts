import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { attributeWithBreakpoints, Breakpoint } from '../util/breakpoint';
import { FlexLayoutAttribute } from '../util/flex-layout';
import { convertFxFlexAlignToTailwind } from './flex/flex-align/flex-align';
import { convertFxFlexFillToTailwind } from './flex/flex-fill/flex-fill';
import { convertFxFlexOffsetToTailwind } from './flex/flex-offset/flex-offset';
import { convertFxFlexOrderToTailwind } from './flex/flex-order/flex-order';
import { convertFxFlexToTailwind } from './flex/flex/flex';
import { convertFxLayoutAlignToTailwind } from './flex/layout-align/layout-align';
import { convertFxLayoutGapToTailwind } from './flex/layout-gap/layout-gap';
import { convertFxLayoutToTailwind } from './flex/layout/layout';

// TODO: this clearly look messy and could see a rewrite
export function convertFile($: CheerioAPI): void {
  $(attributeWithBreakpoints).each((_, element: Element) => {
    const $element: Cheerio<Element> = $(element);
    const elementNames = Object.keys($element.attr() ?? '');

    let fxLayout: string | undefined;
    let fxLayoutBreakpoint: Breakpoint | undefined;
    let fxLayoutGap: string | undefined;
    let fxLayoutGapBreakpoint: Breakpoint | undefined;
    let fxLayoutAlign: string | undefined;
    let fxLayoutAlignBreakpoint: Breakpoint | undefined;
    let fxFlex: string | undefined;
    let fxFlexBreakpoint: Breakpoint | undefined;
    let fxGrow: string | undefined;
    let fxShrink: string | undefined;
    let fxFill: string | undefined;
    let fxFlexFill: string | undefined;
    let fxFlexOrder: string | undefined;
    let fxFlexOrderBreakpoint: Breakpoint | undefined;
    let fxFlexAlign: string | undefined;
    let fxFlexAlignBreakpoint: Breakpoint | undefined;
    let fxFlexOffset: string | undefined;
    let fxFlexOffsetBreakpoint: Breakpoint | undefined;

    elementNames.forEach(elementName => {
      const elementSplitted = elementName.split('.');
      const elementNameWithoutBreakpoint = elementSplitted[0] as FlexLayoutAttribute;

      if (elementNameWithoutBreakpoint === 'fxLayout') {
        fxLayout = $element.attr(elementName);
        fxLayoutBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxLayoutGap') {
        fxLayoutGap = $element.attr(elementName);
        fxLayoutGapBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxLayoutAlign') {
        fxLayoutAlign = $element.attr(elementName);
        fxLayoutAlignBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlex') {
        fxFlex = $element.attr(elementName);
        fxFlexBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxGrow') {
        fxGrow = $element.attr(elementName);
      } else if (elementNameWithoutBreakpoint === 'fxShrink') {
        fxShrink = $element.attr(elementName);
      } else if (elementNameWithoutBreakpoint === 'fxFill') {
        fxFill = $element.attr(elementName);
      } else if (elementNameWithoutBreakpoint === 'fxFlexFill') {
        fxFlexFill = $element.attr(elementName);
      } else if (elementNameWithoutBreakpoint === 'fxFlexOrder') {
        fxFlexOrder = $element.attr(elementName);
        fxFlexOrderBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlexAlign') {
        fxFlexAlign = $element.attr(elementName);
        fxFlexAlignBreakpoint = elementSplitted[1] as Breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlexOffset') {
        fxFlexOffset = $element.attr(elementName);
        fxFlexOffsetBreakpoint = elementSplitted[1] as Breakpoint;
      }
    });

    if (fxLayoutAlign !== undefined) {
      convertFxLayoutAlignToTailwind($element, fxLayoutAlign, fxLayoutAlignBreakpoint);
    }

    if (fxLayout !== undefined) {
      convertFxLayoutToTailwind($element, fxLayout, fxLayoutBreakpoint);
    }

    if (fxLayoutGap !== undefined) {
      convertFxLayoutGapToTailwind($element, fxLayout ?? '', fxLayoutGap, fxLayoutGapBreakpoint);
    }

    if (fxFlex !== undefined) {
      convertFxFlexToTailwind($element, fxFlex, fxGrow ?? '', fxShrink ?? '', fxFlexBreakpoint);
    }

    if (fxFill !== undefined || fxFlexFill !== undefined) {
      convertFxFlexFillToTailwind($element);
    }

    if (fxFlexOrder !== undefined) {
      convertFxFlexOrderToTailwind($element, fxFlexOrder ?? '', fxFlexOrderBreakpoint);
    }

    if (fxFlexAlign !== undefined) {
      convertFxFlexAlignToTailwind($element, fxFlexAlign ?? '', fxFlexAlignBreakpoint);
    }

    if (fxFlexOffset !== undefined) {
      convertFxFlexOffsetToTailwind($element, fxFlexOffset ?? '', fxFlexOffsetBreakpoint);
    }
  });
}
