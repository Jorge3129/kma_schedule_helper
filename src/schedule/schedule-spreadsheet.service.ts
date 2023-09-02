import * as XLSX from 'xlsx';
import { spreadsheetService } from '../spreadsheet/spreadsheet.service';

export class ScheduleSpreadsheetService {
  public loadRawData(
    filePath: string,
    startCell: string,
    endCell: string,
  ): object[] {
    const workbook = XLSX.readFile(filePath);

    const firstSheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[firstSheetName];

    spreadsheetService.undoMerges(worksheet);

    const newRange = `${startCell}:${endCell}`;
    worksheet['!ref'] = newRange;

    return XLSX.utils.sheet_to_json(worksheet);
  }
}

export const scheduleSpreadsheetService = new ScheduleSpreadsheetService();
