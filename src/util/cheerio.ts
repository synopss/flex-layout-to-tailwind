import { CheerioAPI, load } from 'cheerio';

export function loadHtml(html: string): CheerioAPI {
  return load(html, { xml: { decodeEntities: false, lowerCaseAttributeNames: false } }, false);
}
