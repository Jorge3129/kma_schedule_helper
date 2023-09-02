import * as _ from 'lodash';

export const trimKeys = <T extends object>(data: T[]): T[] => {
  return data.map((record) =>
    _.mapKeys(record, (_value, key) => key.trim()),
  ) as T[];
};
