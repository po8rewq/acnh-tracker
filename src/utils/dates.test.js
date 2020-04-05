import * as DateUtils from './dates';

it('getSundayDateForWeek', () => {
  expect(DateUtils.getSundayDateForWeek('2020-04-05')).toEqual('2020-04-05');
  expect(DateUtils.getSundayDateForWeek('2020-04-07')).toEqual('2020-04-05');
});