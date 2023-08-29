import { Element } from 'cheerio';
import classNames from 'classnames';
import { FlexLayoutAttribute } from './flex-layout';

const BREAKPOINT_MAP: Record<FlexLayoutAttribute, boolean> = {
  fxLayout: true,
  fxLayoutAlign: true,
  fxLayoutGap: true,
  fxFlex: true,
  fxGrow: false,
  fxShrink: false,
  fxFlexOrder: true,
  fxFlexOffset: true,
  fxFlexAlign: true,
  fxFlexFill: true,
  fxFill: true,
  fxShow: true,
  fxHide: true,
};

const FLEX_LAYOUT_BREAKPOINTS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'lt-sm',
  'lt-md',
  'lt-lg',
  'lt-xl',
  'gt-xs',
  'gt-sm',
  'gt-md',
  'gt-lg',
] as const;

const BREAKPOINT_MAPPING: { [key in Breakpoint]: string } = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  'lt-sm': 'lt-sm',
  'lt-md': 'lt-md',
  'lt-lg': 'lt-lg',
  'lt-xl': 'lt-xl',
  'gt-xs': 'gt-xs',
  'gt-sm': 'gt-sm',
  'gt-md': 'gt-md',
  'gt-lg': 'gt-lg',
};

export type Breakpoint = (typeof FLEX_LAYOUT_BREAKPOINTS)[number];

export type FlexLayoutAttributeWithBreakpoint = FlexLayoutAttribute | `${FlexLayoutAttribute}.${Breakpoint}`;

export function usesBreakpoints(attribute: string): boolean {
  return BREAKPOINT_MAP[attribute as FlexLayoutAttribute];
}

export function getAttributeWithBreakpoints(attributes: FlexLayoutAttribute[]): FlexLayoutAttributeWithBreakpoint[] {
  const newAttributes: FlexLayoutAttributeWithBreakpoint[] = attributes;

  attributes.forEach((attribute: FlexLayoutAttribute) => {
    if (!usesBreakpoints(attribute)) {
      newAttributes.push(attribute);
    }
    FLEX_LAYOUT_BREAKPOINTS.forEach((breakpoint: Breakpoint) => newAttributes.push(`${attribute}.${breakpoint}`));
  });

  return newAttributes;
}

export const attributeWithBreakpoints: Element = getAttributeWithBreakpoints([
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
])
  .map((attribute: FlexLayoutAttributeWithBreakpoint) => `[${attribute.replace('.', '\\.')}]`)
  .join(', ') as unknown as Element;

function mapBreakpoint(breakPoint: Breakpoint | undefined): string {
  if (!breakPoint) {
    return '';
  }

  if (!BREAKPOINT_MAPPING[breakPoint]) {
    throw new Error(`Unknown breakpoint: ${breakPoint}`);
  }

  return BREAKPOINT_MAPPING[breakPoint] || '';
}

export function classWithBreakpoint(className: string, breakpoint: Breakpoint | undefined): string {
  if (!className) {
    return '';
  }

  const mappedBreakpoint = mapBreakpoint(breakpoint);
  return mappedBreakpoint ? `${mappedBreakpoint}:${className}` : className;
}

export function classesWithBreakpoint(classes: string, breakpoint: Breakpoint | undefined): string {
  return classNames(
    classes.split(' ').map(classeName => {
      return classWithBreakpoint(classeName, breakpoint);
    }),
  );
}

export function flexLayoutAttribute(attribute: FlexLayoutAttribute, breakpoint: Breakpoint | undefined) {
  return breakpoint ? `${attribute}.${breakpoint}` : attribute;
}
