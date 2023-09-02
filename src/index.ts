import * as path from 'path';
import { groupsReader } from './groups/groups.reader';
import { scheduleReader } from './schedule/schedule.reader';
import * as _ from 'lodash';
import { CourseGroup } from './groups/course-group.type';
import { ScheduleEntry } from './schedule/models/schedule-entry.type';

async function main() {
  const groupsPath = path.join('public', 'groups.html');

  const courseGroups: CourseGroup[] = await groupsReader.loadGroups(groupsPath);

  const groupsByCourseName = _.keyBy(courseGroups, 'courseName');

  const scheduleFiles: string[] = [
    'SE_B3_Autumn_2023_2024.xlsx',
    'SE_B4_Autumn_2023_2024.xlsx',
  ];

  const scheduleEntries = scheduleFiles
    .map((fileName) => path.join('public', fileName))
    .flatMap((path) => scheduleReader.loadSchedule(path));

  const userScheduleEntries = scheduleEntries.filter((scheduleEntry) => {
    const { courseName, lessonInfo } = scheduleEntry;

    return (
      !!groupsByCourseName[courseName] &&
      (lessonInfo.type === 'lecture' ||
        lessonInfo.groupNumber === groupsByCourseName[courseName]?.groupNumber)
    );
  });

  const res = _.chain(userScheduleEntries)
    .groupBy('day')
    .mapValues((dayEntries) => {
      return dayEntries
        .sort((a, b) => {
          const getTime = (entry: ScheduleEntry) =>
            new Date(`1970-01-01T${entry.time.start}:00`).getTime();

          return getTime(a) - getTime(b);
        })
        .map((entry) => ({
          time: `${entry.time.start}-${entry.time.end}`,
          subject: entry.courseName,
          professor: entry.professorName,
          weeks: `${entry.weekRange.start}-${entry.weekRange.end}`,
          type: entry.lessonInfo.type,
          group:
            entry.lessonInfo.type === 'lecture'
              ? undefined
              : entry.lessonInfo.groupNumber,
        }));
    })
    .value();

  console.log(res);
}

main();
