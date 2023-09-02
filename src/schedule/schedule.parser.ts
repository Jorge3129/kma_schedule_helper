import { formatCourseName } from '../shared/format-course-name';
import { isNotNull } from '../shared/is-not-null';
import { LessonInfo, LessonType } from './models/lesson-info.type';
import { ScheduleEntry } from './models/schedule-entry.type';
import * as _ from 'lodash';
import { TimeRange } from './models/time-range.type';
import { WeekRange } from './models/week-range.type';
import { trimKeys } from '../shared/trim-keys';
import { weekDayParser } from '../shared/week-day.parser';

export class ScheduleParser {
  public parse(rawRecords: Record<string, any>[]): ScheduleEntry[] {
    return trimKeys(rawRecords)
      .map((rawRecord) => this.parseScheduleEntry(rawRecord))
      .filter(isNotNull);
  }

  private parseScheduleEntry(
    rawRecord: Record<string, string>,
  ): ScheduleEntry | null {
    const SCHEDULE_KEYS = {
      DAY: 'День',
      TIME: 'Час',
      COURSE_AND_PROFESSOR: 'Дисципліна, викладач',
      GROUP: 'Група',
      WEEKS: 'Тижні',
    };

    const rawCourseAndProfessor = rawRecord[SCHEDULE_KEYS.COURSE_AND_PROFESSOR];

    if (!rawCourseAndProfessor) {
      return null;
    }

    const [courseName, professor] = rawCourseAndProfessor
      .split(',')
      .map((el) => el.trim());

    return {
      day: weekDayParser.parse(rawRecord[SCHEDULE_KEYS.DAY]),
      lessonInfo: this.parseLessonInfo(rawRecord[SCHEDULE_KEYS.GROUP]),
      weekRange: this.parseWeekRange(rawRecord[SCHEDULE_KEYS.WEEKS]),
      time: this.parseTime(rawRecord[SCHEDULE_KEYS.TIME]),
      courseName: formatCourseName(courseName),
      professorName: professor,
    };
  }

  private parseLessonInfo(rawGroup: string): LessonInfo {
    if (rawGroup === 'лекція') {
      return { type: LessonType.LECTURE };
    }

    return {
      type: LessonType.PRACTICE,
      groupNumber: parseInt(rawGroup),
    };
  }

  private parseTime(rawTimeRange: string): TimeRange {
    const [startTime, endTime] = (rawTimeRange ?? '')
      .split('-')
      .map((el) => el.trim());

    return {
      start: startTime,
      end: endTime,
    };
  }

  private parseWeekRange(rawWeekRange: string): WeekRange {
    const [startWeek, endWeek] = (rawWeekRange ?? '')
      .split('-')
      .map((el) => parseInt(el.trim()));

    return {
      start: startWeek,
      end: endWeek,
    };
  }
}

export const scheduleParser = new ScheduleParser();
