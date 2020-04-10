import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

/**
 * if refDate is a sunday, then returns refDate, otherwise we get the previous sunday
 */
export const getSundayDateForWeek = (refDate) => {
  const date = dayjs(`${refDate}T12:00:00.000Z`);
  const d = dayjs(date).day();
  if (d === 0) return dayjs(date).format('YYYY-MM-DD');
  const currentWeek = dayjs(date).startOf('week').format('YYYY-MM-DD');
  return currentWeek;
};

export const tmp = () => null; // TODO: rm
