import { convertFile } from '../converter/converter';
import { loadHtml } from './cheerio';

export function expectValidConversion(html: string, expectedClasses: string): void {
  const $ = loadHtml(html);
  const element = $('div');

  convertFile($);
  expect(element.hasClass(expectedClasses)).toBeTruthy();
}

export function expectValidChildConversion(html: string, expectedClasses: string): void {
  const $ = loadHtml(html);
  const element = $('div');

  convertFile($);
  expect(element.children().hasClass(expectedClasses)).toBeTruthy();
}
