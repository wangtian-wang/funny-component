/**
 获取每月的第一天是周几
 */
function getFirstWeekDay(year, month) {
  const date = new Date(year, month - 1, 1);
  return date.getDay();
}

/**
 获取每月的天数
 */
function getMonthDayCount(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}
/**
 获取日历上第一行展示的上个月的天数
 */
function getLastMonthRestDays(year, month) {
  const days = getFirstWeekDay(year, month); //  假设7月的第一天是周五, 那占日期的格子第5格, index从0开始  小于第五个格子的就是上个月的日期
  let lastMonthDays = getMonthDayCount(year, month - 1);
  const restDays = [];
  while (restDays.length < days) {
    restDays.push(lastMonthDays--);
  }
  return restDays.reverse();
}
/**
 获取日历上最后一行展示的下个月的天数
 */
function getNextMonthRestDays(year, month) {
  const lastDaysCount = getMonthDayCount(year, month);

  const firstWeekDayMonth = getFirstWeekDay(year, month);
  console.log(firstWeekDayMonth, '--------');
  const nextMonthRestDays = 42 - (lastDaysCount + firstWeekDayMonth);
  const restDays = [];
  for (let i = 0; i < nextMonthRestDays; i++) {
    restDays.push(i);
  }
  return restDays;
}

function getDateInfo(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
/**
 *
使用-来分割年月日
 */
function getFormatDate(year, month, date) {
  const dateArr = [year, month, date];
  for (let i = 1; i < dateArr.length; i++) {
    dateArr[i] < 10 && (dateArr[i] = `0${dateArr[i]}`);
  }
  return dateArr.join('-');
}
