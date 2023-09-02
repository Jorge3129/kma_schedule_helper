export enum LessonType {
  LECTURE = 'lecture',
  PRACTICE = 'practice',
}

export type LessonInfo =
  | {
      type: LessonType.LECTURE;
    }
  | {
      type: LessonType.PRACTICE;
      groupNumber: number;
    };
