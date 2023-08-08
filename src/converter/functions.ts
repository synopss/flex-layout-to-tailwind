import * as fs from 'fs';
import { Cheerio, Element, load } from 'cheerio';
import { convertFxFlexToTailwind } from './flex';
import { convertFxFlexFillToTailwind } from './flex-fill';
import { convertFxLayoutToTailwind } from './layout';
import { convertFxLayoutAlignToTailwind } from './layout-align';
import { convertFxLayoutGapToTailwind } from './layout-gap';

const fxAttributes = ['fxFill', 'fxLayout', 'fxLayoutAlign', 'fxGap', 'fxFlex'];

export function convertFlexLayoutToTailwind(filePath: string) {
  const html = fs.readFileSync(filePath, 'utf-8');
  return extractHtmlTags(html).reduce((html, tag) => html.replace(tag, convertTag(tag)), html);
}

export function convertTag(tag: string): string {
  if (!fxAttributes.some(a => tag.includes(a))) return tag;

  const $ = load(tag, { xmlMode: true, decodeEntities: false });

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

  let newTag = $.html();
  newTag = newTag.replace(/(\W\w+)=""/gm, '$1');

  if (newTag.endsWith('/>') && tag.endsWith('/>')) {
    return newTag;
  } else {
    return newTag.slice(0, -2) + '>';
  }
}

export function extractHtmlTags(html: string): string[] {
  const openingTags = [];
  let tag = '';
  let inTag = false;
  let quote = null;

  for (const ch of [...html]) {
    if (!inTag && ch === '<') {
      inTag = true;
      tag += ch;
    } else if (inTag) {
      tag += ch;

      if (quote === null && (ch === '"' || ch === "'")) {
        quote = ch;
      } else if (quote !== null && ch === quote) {
        quote = null;
      } else if (quote === null && ch === '>') {
        openingTags.push(tag);
        tag = '';
        inTag = false;
      }
    }
  }

  return openingTags;
}
