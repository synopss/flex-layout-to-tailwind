import { CheerioAPI, load } from 'cheerio';

export function loadHtml(html: string): CheerioAPI {
  return load(html, { xmlMode: true, decodeEntities: false }, false);
}
