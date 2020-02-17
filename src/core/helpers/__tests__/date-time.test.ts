import {formatDate, formatDateTime, formatTime} from '../date-time';

describe('date-time helpers', () => {
  it('date-time helpers', () => {
    const dateStr: string = '2019-11-01';
    const date: Date = new Date(dateStr);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    expect(formatDate(date)).toEqual(dateStr);
    expect(formatDateTime(date)).toEqual(`${dateStr} 00:00:00`);
    expect(formatTime(date)).toEqual('00:00:00');
  });
});
