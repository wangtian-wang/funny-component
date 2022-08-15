export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthNameArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
// 阳历节日
export const festivals = {
  '1-1': '元旦节',
  '2-14': '情人节',
  '3-8': '妇女节',
  '3-12': '植树节',
  '4-1': '愚人节',
  '5-1': '劳动节',
  '5-4': '青年节',
  '5-12': '护士节',
  '6-1': '儿童节',
  '7-1': '建党节',
  '8-1': '建军节',
  '9-10': '教师节',
  '10-1': '国庆节',
  '12-24': '平安夜',
  '12-25': '圣诞节',
};
export const holiday = {
  '10.1-10.7': '国庆假期',
};
// 生肖
export const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
// 天干 地支 ==== 传入 offset,传回干支,0=甲子
export const cyclical = (offset: number) => {
  const Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return Gan[offset % 10] + Zhi[offset % 12];
};
// 节气
export const getSolarTerm = (y: number, m: number, d: number) => {
  const sTermInfo = [
    0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343,
    285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758,
  ];
  const solarTerm = [
    '小寒',
    '大寒',
    '立春',
    '雨水',
    '惊蛰',
    '春分',
    '清明',
    '谷雨',
    '立夏',
    '小满',
    '芒种',
    '夏至',
    '小暑',
    '大暑',
    '立秋',
    '处暑',
    '白露',
    '秋分',
    '寒露',
    '霜降',
    '立冬',
    '小雪',
    '大雪',
    '冬至',
  ];
  let solarTermStr = '';
  let tmp1 = new Date(
    31556925974.7 * (y - 1900) + sTermInfo[m * 2 + 1] * 60000 + Date.UTC(1900, 0, 6, 2, 5),
  );
  let tmp2 = tmp1.getUTCDate();
  if (tmp2 === d) solarTermStr = solarTerm[m * 2 + 1];
  tmp1 = new Date(
    31556925974.7 * (y - 1900) + sTermInfo[m * 2] * 60000 + Date.UTC(1900, 0, 6, 2, 5),
  );
  tmp2 = tmp1.getUTCDate();
  if (tmp2 === d) solarTermStr = solarTerm[m * 2];
  return solarTermStr;
};
