import { getMonthDays, isSameDate } from '@mantine/dates';

export const getWeekDays = (date: Date): Date[] => {
  let monthDays = getMonthDays(date);
  const dates = monthDays.find((week) => week.find((day) => isSameDate(day, date)));
  return dates || [];
};

export const toWeekId = (date: Date): string => {
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
};
