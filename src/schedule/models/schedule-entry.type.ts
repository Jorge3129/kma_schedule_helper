import { WeekDay } from '../../shared/const/week-day.enum';
import { LessonInfo } from './lesson-info.type';
import { TimeRange } from './time-range.type';
import { WeekRange } from './week-range.type';

export type ScheduleEntry = {
  day: WeekDay;
  time: TimeRange;
  courseName: string;
  professorName: string;
  lessonInfo: LessonInfo;
  weekRange: WeekRange;
};
