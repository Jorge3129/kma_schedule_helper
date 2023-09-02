import { WeekDay } from './const/week-day.enum';

export class WeekDayParser {
  public parse(rawDay: string): WeekDay {
    const weekDays: Record<string, WeekDay> = {
      Понеділок: WeekDay.MONDAY,
      Вівторок: WeekDay.TUESDAY,
      Середа: WeekDay.WEDNESDAY,
      Четвер: WeekDay.THURSDAY,
      "П'ятниця": WeekDay.FRIDAY,
      Субота: WeekDay.SATURDAY,
      Неділя: WeekDay.SUNDAY,
    };

    const key = rawDay.replace(/`/gi, "'").trim();

    return weekDays[key];
  }
}

export const weekDayParser = new WeekDayParser();
