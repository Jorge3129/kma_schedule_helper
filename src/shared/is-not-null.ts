export const isNotNull = <T>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null;
};
