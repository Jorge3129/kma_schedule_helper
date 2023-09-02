import * as XLSX from 'xlsx';

export class SpreadsheetService {
  public undoMerges(worksheet: XLSX.WorkSheet): void {
    const mergedRanges = worksheet['!merges'];

    if (!mergedRanges) {
      return;
    }

    mergedRanges.forEach((range) => {
      const { s, e } = range;

      const topLeftCellAddress = XLSX.utils.encode_cell(s);
      const topLeftCellValue = worksheet[topLeftCellAddress]?.v;

      for (let rowNum = s.r; rowNum <= e.r; rowNum++) {
        for (let colNum = s.c; colNum <= e.c; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          worksheet[cellAddress] = { v: topLeftCellValue, t: 's' };
        }
      }
    });
  }
}

export const spreadsheetService = new SpreadsheetService();
