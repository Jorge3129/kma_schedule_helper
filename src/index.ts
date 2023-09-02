import * as path from 'path';
import { groupsReader } from './groups/groups.reader';

async function main() {
  const groupsPath = path.join('public', 'groups.html');

  const groups = await groupsReader.loadGroups(groupsPath);

  console.log(groups);
}

main();
