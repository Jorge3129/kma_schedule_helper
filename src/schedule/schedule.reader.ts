import { ScheduleEntry } from './models/schedule-entry.type';
import { scheduleSpreadsheetService } from './schedule-spreadsheet.service';
import { scheduleParser } from './schedule.parser';

export class ScheduleReader {
  public loadSchedule(filePath: string): ScheduleEntry[] {
    const startCell = 'A10';
    const endCell = 'F63';

    const rawData = scheduleSpreadsheetService.loadRawData(
      filePath,
      startCell,
      endCell,
    );

    return scheduleParser.parse(rawData);
  }
}

export const scheduleReader = new ScheduleReader();
