import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { attributeWithBreakpoints, Breakpoint } from '../util/breakpoint';
import { FlexLayoutAttribute } from '../util/flex-layout';
import { convertFxHideToTailwind, convertFxShowToTailwind } from './extended/show-hide';
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
    let fxHide: string | undefined;
    let fxHideBreakpoint: Breakpoint | undefined;
    let fxShow: string | undefined;
    let fxShowBreakpoint: Breakpoint | undefined;

    elementNames.forEach(elementName => {
      const elementSplitted = elementName.split('.');
      const elementNameWithoutBreakpoint = elementSplitted[0] as FlexLayoutAttribute;
      const value = $element.attr(elementName);
      const breakpoint = elementSplitted[1] as Breakpoint;

      if (elementNameWithoutBreakpoint === 'fxLayout') {
        fxLayout = value;
        fxLayoutBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxLayoutGap') {
        fxLayoutGap = value;
        fxLayoutGapBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxLayoutAlign') {
        fxLayoutAlign = value;
        fxLayoutAlignBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlex') {
        fxFlex = value;
        fxFlexBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxGrow') {
        fxGrow = value;
      } else if (elementNameWithoutBreakpoint === 'fxShrink') {
        fxShrink = value;
      } else if (elementNameWithoutBreakpoint === 'fxFill') {
        fxFill = value;
      } else if (elementNameWithoutBreakpoint === 'fxFlexFill') {
        fxFlexFill = value;
      } else if (elementNameWithoutBreakpoint === 'fxFlexOrder') {
        fxFlexOrder = value;
        fxFlexOrderBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlexAlign') {
        fxFlexAlign = value;
        fxFlexAlignBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxFlexOffset') {
        fxFlexOffset = value;
        fxFlexOffsetBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxHide') {
        fxHide = value;
        fxHideBreakpoint = breakpoint;
      } else if (elementNameWithoutBreakpoint === 'fxShow') {
        fxShow = value;
        fxShowBreakpoint = breakpoint;
      }

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

      if (fxHide !== undefined) {
        convertFxHideToTailwind($element, fxHide, fxHideBreakpoint);
      }

      if (fxShow !== undefined) {
        convertFxShowToTailwind($element, fxShow, fxShowBreakpoint);
      }
    });
  });
}
