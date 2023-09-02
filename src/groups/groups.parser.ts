import * as cheerio from 'cheerio';
import { CourseGroup } from './course-group.type';

export class GroupsParser {
  public parseGroups(html: string): CourseGroup[] {
    const $ = cheerio.load(html);

    const result = $('table > tbody > tr')
      .map((_, el) => this.parseGroup($, el))
      .get();

    return result;
  }

  private parseGroup($: cheerio.Root, row: cheerio.Element): CourseGroup {
    const code = parseInt($(row).find('td > span').text());
    const name = $(row).find('td > a').text().trim();

    const group = parseInt(
      $(row).find('td > select > option[selected]').attr('value') ?? '',
    );

    return {
      code,
      name,
      group,
    };
  }
}

export const groupsParser = new GroupsParser();
