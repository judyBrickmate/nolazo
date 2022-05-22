import moment from 'moment';

export const localTime = (input: Date | number | string, format: string) => {
  return format ? moment(input) : moment(input).format(format);
};
