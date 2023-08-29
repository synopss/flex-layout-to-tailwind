import chalk from 'chalk';
import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { NodeWithChildren } from 'domhandler';

export const FLEX_LAYOUT_ATTRIBUTES = [
  'fxLayout',
  'fxLayoutAlign',
  'fxLayoutGap',
  'fxFlex',
  'fxGrow',
  'fxShrink',
  'fxFlexOrder',
  'fxFlexOffset',
  'fxFlexAlign',
  'fxFlexFill',
  'fxFill',
  'fxShow',
  'fxHide',
] as const;

export type FlexLayoutAttribute = (typeof FLEX_LAYOUT_ATTRIBUTES)[number];

export const ATTRIBUTES_HANDLED = FLEX_LAYOUT_ATTRIBUTES.map(value => chalk.bold(value)).join(', ');

export function findElementsWithFxAttributes($: CheerioAPI): Cheerio<Element>[] {
  const elements: Cheerio<Element>[] = [];
  const nodes: NodeWithChildren[] = [];
  nodes.push($.root()[0]);

  while (nodes.length !== 0) {
    const node = nodes.pop();

    if (!node || !node.children) {
      continue;
    }

    node.children.forEach(childElement => {
      if (childElement.type === 'tag') {
        const child: Cheerio<Element> = $(childElement);
        const attrs = Object.keys(childElement.attribs || {});

        if (FLEX_LAYOUT_ATTRIBUTES.some(attribute => attrs.includes(attribute))) {
          elements.push(child);
        }
      }
      nodes.push(childElement as NodeWithChildren);
    });
  }

  return elements;
}
