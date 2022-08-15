<template>
  <div class="calendar-container">
    <div class="calendar-btns">
      <div class="btns-wrap">
        <div class="btn prev left-radius" title="previous month" @click="goPrevMonth">&lt;</div>
        <div class="btn next right-radius" title="next month" @click="goNextMonth">&gt;</div>
        <div class="btn today" title="this month" @click="goToday">today</div>
      </div>
      <div class="calendar-title">{{
        monthNameArr[month_show] + ' ' + year_show + '.' + (month_show + 1)
      }}</div>
      <div class="btns-wrap">
        <div class="btn month left-radius active">month</div>
        <div class="btn week">week</div>
        <div class="btn day">day</div>
        <div class="btn list right-radius">list</div>
      </div>
    </div>
    <div class="calendar-wrapper">
      <div class="week-box">
        <div v-for="i in 7" class="column-item">{{ weekDays[i - 1] }}</div>
      </div>
      <div class="calendar-box">
        <div
          v-for="(item, index) in calendarList"
          :key="index"
          :class="[
            'day-box',
            curSelectDate?.year === item.year &&
            curSelectDate?.month === item.month &&
            curSelectDate?.day === item.day
              ? 'select-day'
              : '',
          ]"
          @click="handleClickDay(item)">
          <div
            :class="[
              'day-txt',
              item.year === curYear && item.month === curMonth && item.day === curDay
                ? 'today'
                : '',
            ]">
            {{ item.day }}
          </div>
          <div class="festival">{{ item.festival }}</div>
          <div class="solarterm">{{ item.solarTerm }}</div>
        </div>
        <template v-for="(item, index) in rangeColorList" :key="index">
          <div
            v-if="item.width !== '0px'"
            class="range-color-box"
            :style="{
              width: item.width,
              left: item.left,
              top: item.top,
              backgroundColor: item.color,
            }"
            >{{ item.title }}</div
          >
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 1.获取当前年当前月份(需要获取天数)。
  // 2.31天:1,3,5,7,8,10,12月。30天: 4,6,9,11月。2月平月28，闰月29。
  // 3.判断闰年(1.能被4整除但不能被100整除的年份。2.能被400整除)
  // 4.判断当前年当前月份的第一天是周几。
  // 5.获取上一月天数（处理到前面的空格)
  // 6.把数字循环改成对象数组循环。考虑展示：假期，节气，节日，农历日期。
  // 7.添加日程事件，面板切换。
  import { ref, computed, onMounted } from 'vue';
  import { weekDays, monthNameArr, festivals, animals, cyclical, getSolarTerm } from './util';
  interface calendarItem {
    year: number;
    month: number; // 0-11
    day: number;
    festival?: string;
    solarTerm?: string;
    location: number;
  }
  interface rcItem {
    row: number;
    column: number;
    date: string;
  }
  interface rowItem {
    column: number;
    date: string;
  }
  interface classRow {
    [key: number | string]: rowItem[];
  }
  interface rangeItem {
    dateRange: string;
    title: string;
    range?: rcItem[];
    rows?: classRow;
    startDate?: string;
    endDate?: string;
    left?: string;
    top?: string;
    width?: string;
    color?: string;
    nums?: number;
  }
  // 先获取当前年月日再说
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth(); // 0 - 11
  const curDay = new Date().getDate();
  // 面板显示的年月日，默认为当前
  const year_show = ref<number>(curYear);
  const month_show = ref<number>(curMonth);
  const day_show = ref<number>(curDay);
  const curSelectDate = ref<calendarItem | null>(null); // 点击选中日期
  const rangeColorList = ref<rangeItem[]>([
    {
      dateRange: '2022.06.24-2022.06.28',
      title: 'test一半在上个月的面板一半在当前面板',
      color: 'pink',
    }, // 由于存在 -1 无法判断是否为开始点，顺带分类顺序一乱导致无法判断结束点
    { dateRange: '2022.07.04-2022.07.06', title: 'test单行', color: '#00cfff' },
    { dateRange: '2022.07.08-2022.07.12', title: 'test垮了两行', color: 'blue' },
    { dateRange: '2022.07.22-2022.08.10', title: 'test单个日期', color: 'red' },
    // 也是 -1 问题 // 思路：前后定义第-1行和第7行，用来判断 前后是不是开始或者结束点，计算location时增加麻烦。。
  ]); // 连续假期 年月日-年月日
  const monthDayNumList = computed(() => {
    // 所有月份的天数，一定别写错。。
    return [31, 28 + isLeapYear(year_show.value), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  });
  // 面板显示的(年)月份的总天数
  const showMonthDays = computed(() => {
    return monthDayNumList.value[month_show.value];
  });
  // 面板显示的(年)月份的前一个的的总天数，用来补充当前月前面的空格
  const showLastMonthDays = computed(() => {
    // 这里不需要考虑向前跨年是闰年判断，如果当前月是1月，上一年12月还是31天
    console.log('month_show.value==', month_show.value);
    if (month_show.value === 0) {
      return monthDayNumList.value[11];
    } else {
      return monthDayNumList.value[month_show.value - 1];
    }
  });
  // 面板显示的(年)月份的第一天是周几, 0-6: 0表示周日，1-6指周一到周六
  const firstDayInWeek = computed(() => {
    return new Date(`${year_show.value}-${month_show.value + 1}-${1}`).getDay();
  });
  // 最后循环的列表
  const calendarList = computed(() => {
    // 根据showLastMonthDays, firstDayInWeek, showMonthDays 处理这个数组，表示每天的信息
    let list: calendarItem[] = [];
    const festivalKeyArr = Object.keys(festivals);
    // 前面格子的
    const lastMonthNearDays: calendarItem[] = new Array(firstDayInWeek.value)
      .fill(0)
      .map((item, index) => {
        console.log('index==', index);
        const dayNum = showLastMonthDays.value - firstDayInWeek.value + (index + 1);
        // 此处的月份是要用上一个月，需要减1，但是festival是按照月份1-12来的写key, month_show 是0-11取值所以匹配时还得加1。
        const monthDayStr = `${month_show.value}-${dayNum}`;
        const year_num = month_show.value === 0 ? year_show.value - 1 : year_show.value;
        return {
          year: year_num,
          month: month_show.value - 1,
          day: dayNum,
          festival: festivalKeyArr.includes(monthDayStr) ? (festivals as any)[monthDayStr] : '',
          animal: animals[(year_num - 4) % 12],
          lunarYearCn: cyclical(year_num - 1900 + 36),
          solarTerm: getSolarTerm(year_num, month_show.value - 1, dayNum),
          location: index, // 格子的位置0-41
        };
      });
    // 本月的格子
    const monthDaysList: calendarItem[] = new Array(showMonthDays.value)
      .fill(0)
      .map((item, index) => {
        const monthDayStr = `${month_show.value + 1}-${index + 1}`;
        return {
          year: year_show.value,
          month: month_show.value,
          day: index + 1,
          festival: festivalKeyArr.includes(monthDayStr) ? (festivals as any)[monthDayStr] : '',
          animal: animals[(year_show.value - 4) % 12],
          lunarYearCn: cyclical(year_show.value - 1900 + 36),
          solarTerm: getSolarTerm(year_show.value, month_show.value, index + 1),
          location: index + firstDayInWeek.value,
        };
      });
    // 后面填满42个格子，表示下个月的前几天，从1开始往后递增就行
    const nextMonthNearDays: calendarItem[] = new Array(
      42 - showMonthDays.value - firstDayInWeek.value,
    )
      .fill(0)
      .map((item, index) => {
        const monthDayStr = `${month_show.value + 2}-${index + 1}`;
        const year_num = month_show.value === 11 ? year_show.value + 1 : year_show.value;
        return {
          year: year_num,
          month: month_show.value + 1,
          day: index + 1,
          festival: festivalKeyArr.includes(monthDayStr) ? (festivals as any)[monthDayStr] : '',
          animal: animals[(year_num - 4) % 12],
          lunarYearCn: cyclical(year_num - 1900 + 36),
          solarTerm: getSolarTerm(year_num, month_show.value + 1, index + 1),
          location: index + firstDayInWeek.value + showMonthDays.value,
        };
      });
    list = [...lastMonthNearDays, ...monthDaysList, ...nextMonthNearDays];
    console.log('cur calendar===', list);
    return list;
  });
  console.log(curYear, curMonth, curDay);
  // 是否闰年， 返回闰年多的天数
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 === 0) || year % 400 === 0 ? 1 : 0;
  };
  const goPrevMonth = () => {
    if (month_show.value === 0) {
      month_show.value = 11;
      year_show.value--;
    } else {
      month_show.value--;
    }
    rangeColorList.value = getColorList(getRangeDateList(rangeColorList.value));
  };
  const goNextMonth = () => {
    if (month_show.value === 11) {
      month_show.value = 0;
      year_show.value++;
    } else {
      month_show.value++;
    }
    rangeColorList.value = getColorList(getRangeDateList(rangeColorList.value));
  };
  const goToday = () => {
    year_show.value = curYear;
    month_show.value = curMonth;
    day_show.value = curDay;
    const todayItem = calendarList.value.find(
      (item) => item.year === curYear && item.month === curMonth && item.day === curDay,
    );
    if (typeof todayItem !== 'undefined') {
      curSelectDate.value = todayItem;
    }
    rangeColorList.value = getColorList(getRangeDateList(rangeColorList.value));
  };
  const handleClickDay = (item: calendarItem) => {
    console.log(item);
    if (item.month !== month_show.value) {
      month_show.value = item.month;
    }
    // 点击选中给样式
    curSelectDate.value = item;
    rangeColorList.value = getColorList(getRangeDateList(rangeColorList.value));
  };
  //思路：根据连续假期日期范围，处理成一个个div定位, 一条连续日期可能处理成多条（跨几行就几条），计算位置，标注起点和结束点。注意判断是不是当前面板的连续日期
  // 1. 每个格子的日期标个location。
  // 2.计算处理 left,top,width
  // 3. 一个判断连续日期是否跨行的方法
  // 4. 一个用来计算 日期位于第几个格子，第几行第几列
  // 5. 存在一部分在当前面板 一部分不在的情况，显示在的那一部分
  // 获取范围内的日期
  const getRangeDayList = (rangeStr: string) => {
    // rangeStr = '2022.10.01-2022.10.07' return ['2022.10.01','2022.10.02','2022.10.03',...]
    const [start, end] = rangeStr.split('-');
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    const timeDiff = endTime - startTime;
    const arr = [];
    for (let i = 0; i <= timeDiff; i += 86400000) {
      const tDate = new Date(startTime + i);
      arr.push(`${tDate.getFullYear()}.${tDate.getMonth() + 1}.${tDate.getDate()}`); // 天拼不拼0无所谓，下面用的时候会Number掉
    }
    return arr;
  };
  const getRangeDateList = (rangeList: rangeItem[]) => {
    // 得找到各个范围内所有天数日期
    rangeList.forEach((item) => {
      const range = getRangeDayList(item.dateRange);
      const rcArr: rcItem[] = [];
      range.forEach((inner) => {
        const tempObj = getDateRowAndColumn(inner);
        rcArr.push(tempObj);
      });
      const rows = classifyTypes(rcArr);
      item.rows = rows;
      item.nums = range.length;
      const dateArr = item.dateRange.split('-').filter((inner) => inner !== '');
      if (dateArr.length > 0) {
        item.startDate = dateArr[0];
        item.endDate = dateArr.length > 1 ? dateArr[1] : dateArr[0];
      }
    });
    console.log('temp range====', rangeList);
    return rangeList;
  };
  const getColorList = (list: rangeItem[]) => {
    const temp: rangeItem[] = [];
    list.forEach((item) => {
      if (item.rows) {
        const len = Object.keys(item.rows).length;
        Object.keys(item.rows).forEach((inner) => {
          // inner 就是行号
          // 两边都跨面板 前后都没边距，前跨左边无边距，后跨右边无边距
          // 利用当前这行的日期含不含 开始和结束日期 来判断当前这行长条是不是包含开始点和结束点；包含开始日期就是开始点，包含结束日期就是结束点，不用想那么多
          const tempDateArr =
            (item.rows && item.rows[inner].map((mitem) => new Date(mitem.date).getTime())) || [];
          let l_offset = 0; // 开始点偏移
          let r_offset = 0; // 结束点偏移
          if (item.startDate && tempDateArr.includes(new Date(item.startDate).getTime())) {
            l_offset = 10;
          }
          if (item.endDate && tempDateArr.includes(new Date(item.endDate).getTime())) {
            r_offset = 10;
          }
          const width = item.rows && item.rows[inner] && item.rows[inner].length; // 这里的ts真的是醉了。。明明上面包了一层if(item.rows)存在的判断
          const start_column = item.rows && item.rows[inner] && item.rows[inner][0].column;
          // const end_column = item.rows[inner][width - 1]
          temp.push({
            title: item.title,
            dateRange: item.dateRange,
            startDate: item.startDate,
            color: item.color,
            endDate: item.endDate,
            left: `calc(${start_column}*100%/7 + ${l_offset}px)`,
            top: `calc(${inner} * 100px + 60px)`,
            width:
              Number(inner) === -1
                ? '0px'
                : `calc(${width}*100%/7 - ${l_offset}px - ${r_offset}px)`,
          });
        });
      }
    });
    console.log(temp, '----- temp temp----');
    return temp;
  };
  // 获取日期行列号
  const getDateRowAndColumn = (date: string) => {
    // 没有年份的 固定假期暂时不考虑 到时候拼接 面板年份
    // date = '2022.10.01' // 去当前面板里查询 // 如果日期不在当前面板就不显示 location= -1 // 注意 month + 1
    const dateArr = date.split('.');
    if (dateArr.length < 3) return { row: -1, column: -1, date }; // 日期一定是年月日，否则当没有
    const fitem = calendarList.value.find(
      (item) =>
        item.year === Number(dateArr[0]) &&
        item.month + 1 === Number(dateArr[1]) &&
        item.day === Number(dateArr[2]),
    );
    if (typeof fitem !== 'undefined') {
      const row = Math.floor(fitem.location / 7);
      const column = fitem.location % 7;
      return { row, column, date };
    } else {
      return { row: -1, column: -1, date };
    }
  };
  // 根据row分类，row相等的为一类（表示在一行里），值就是行里跨过的列
  const classifyTypes = (list: any[], base = 'row') => {
    // list = [{row, column, date}] // return { [row1]: [column1,column2,...], [row2]:[column1,column2,...] }
    const temp: any = {};
    list.forEach((item) => {
      if (!temp[item[base]]) {
        temp[item[base]] = [{ column: item.column, date: item.date }];
      } else {
        temp[item[base]].push({ column: item.column, date: item.date });
      }
    });
    return temp;
  };
  onMounted(() => {
    rangeColorList.value = getColorList(getRangeDateList(rangeColorList.value));
  });
</script>
<style lang="scss" scoped>
  $white: #fff;
  $yellow: #fac863;
  $shadow: rgba(0, 0, 0, 0.1);
  $border: #ddd;
  $primary: #1890ff;
  $btnhover: rgba(24, 144, 255, 0.8);
  $btnactive: #183fff;
  $today: #ff0000;
  $festival: rgba(76, 175, 80, 0.2);
  $festivalcolor: #539156;
  $solarterm: rgba(156, 39, 176, 0.2);
  $solartermcolor: #9c27b0;
  $selectday: rgba(24, 144, 255, 0.07);
  $holiday: pink;
  .calendar-container {
    box-sizing: border-box;
    padding: 20px;
    width: 1200px;
    background-color: #fff;
    border-top: 4px solid $yellow;
    box-shadow: 0 1px 2px 0 $shadow;
  }
  .calendar-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btns-wrap {
    display: flex;
    align-items: center;
  }
  .calendar-title {
    flex: 1;
    padding: 0 20px;
    text-align: center;
    font-size: 24px;
  }
  .btn {
    height: 36px;
    line-height: 36px;
    padding: 0 14px;
    background: $primary;
    color: $white;
    cursor: pointer;
    &:hover {
      background: $btnhover;
    }
    &.left-radius {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &.right-radius {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.prev,
    &.next {
      font-weight: 600;
    }
    &.today {
      margin-left: 5px;
      border-radius: 4px;
    }
    &.active {
      background-color: $btnactive;
    }
  }
  .calendar-wrapper {
    margin-top: 20px;
  }
  .week-box {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));
    gap: 0;
    border-top: 1px solid $border;
    border-left: 1px solid $border;
    .column-item {
      position: relative;
      box-sizing: border-box;
      padding: 4px;
      text-align: center;
      border-right: 1px solid $border;
    }
  }
  .calendar-box {
    @extend .week-box;
    position: relative;
    .day-box {
      @extend .column-item;
      border-bottom: 1px solid $border;
      height: 100px;
      padding-top: 30px;
      cursor: pointer;
      .festival {
        box-sizing: border-box;
        padding: 0 5px;
        text-align: left;
        background-color: $festival;
        color: $festivalcolor;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        line-height: 24px;
      }
      .solarterm {
        @extend .festival;
        background-color: $solarterm;
        color: $solartermcolor;
      }
      &.select-day {
        background-color: $selectday;
      }
    }
    .day-txt {
      position: absolute;
      top: 2px;
      right: 2px;
      border-radius: 50%;
      height: 28px;
      line-height: 28px;
      width: 28px;
      text-align: center;
      &.lastmonth_day,
      &.nextmonth_day {
        opacity: 0.5;
      }
      &.today {
        background: $today;
        color: $white;
      }
    }
  }
  .range-color-box {
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 10px;
    position: absolute;
    height: 30px;
    line-height: 30px;
    color: $white;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
