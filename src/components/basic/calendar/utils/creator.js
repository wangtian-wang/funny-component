const { WeekDays } = './config.js';
function createHeaderNode() {
  const oHeader = document.createElement('div');
  oHeader.className = 'calendar-header';
  oHeader.innerHTML = WeekDays.map((item) => {
    `<p>${item}</p>`;
  }).join('');
  return oHeader;
}
