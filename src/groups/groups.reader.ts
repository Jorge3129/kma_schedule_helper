import * as fs from 'fs/promises';
import { groupsParser } from './groups.parser';
import { CourseGroup } from './course-group.type';

export class GroupsReader {
  public async loadGroups(filePath: string): Promise<CourseGroup[]> {
    const html = (await fs.readFile(filePath)).toString();

    return groupsParser.parseGroups(html);
  }
}

export const groupsReader = new GroupsReader();
