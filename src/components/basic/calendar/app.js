import { render } from 'less';
import MyCalendar from './utils/calendar';
(() => {
  const MyCalendar = MyCalendar();
  const oApp = document.querySelector('#app');
  const dateInfo = MyCalendar.getDateInfo();
  function init() {
    render(...dateInfo);
  }
  function render(...args) {
    oApp.appendChild(MyCalendar.render(...args));
  }
  init();
})();
