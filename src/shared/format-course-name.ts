export const formatCourseName = (courseName: string): string => {
  return courseName.replace(/`/gi, "'");
};
