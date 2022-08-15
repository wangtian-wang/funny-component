<template>
  <div class="count-content">
    <image
      class="count-bg"
      src="http://oss.umetrip.com/fs/advert/icon/187,2625d93b7c5724f9"></image>
    <div v-if="remainTime > 0" class="time-wrapper">
      <text class="time-day">倒计时{{ dayString }}天</text>
      <div class="cell-wrapper">
        <text class="time-cell">{{ hourString.length > 1 ? hourString.split('')[0] : 0 }} </text>
      </div>
      <div class="cell-wrapper">
        <text class="time-cell">{{ hourString.length > 1 ? hourString.split('')[1] : 0 }}</text>
      </div>
      <text>:</text>
      <div class="cell-wrapper">
        <text class="time-cell">{{ minuteString.length > 1 ? minuteString.split('')[0] : 0 }}</text>
      </div>
      <div class="cell-wrapper">
        <text class="time-cell">{{ minuteString.length > 1 ? minuteString.split('')[1] : 0 }}</text>
      </div>
      <text>:</text>
      <div class="cell-wrapper">
        <text class="time-cell"
          >{{ secondString.length > 1 ? secondString.split('')[0] : 0 }}
        </text>
      </div>
      <div class="cell-wrapper">
        <text class="time-cell"
          >{{ secondString.length > 1 ? secondString.split('')[1] : 0 }}
        </text>
      </div>
    </div>
    <div v-else class="text-wrapper">
      <text class="text-end">活动已结束</text>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimeDown',
    props: {
      totalTime: {
        // 倒计时间总秒数
        type: [String, Number],
        default: 0,
      },
    },
    data() {
      return {
        day: '',
        hour: '',
        minute: '',
        second: '',
        promiseTimer: '',
        nowTime: new Date().getTime(),
        allTime: null,
      };
    },
    computed: {
      hourString() {
        return this.formatNum(this.hour);
      },
      minuteString() {
        return this.formatNum(this.minute);
      },
      secondString() {
        return this.formatNum(this.second);
      },
      dayString() {
        return this.formatNum(this.day);
      },
      remainTime() {
        return (this.allTime - this.nowTime) / 1000;
      },
    },
    watch: {
      totalTime: {
        handler(val) {
          if (!val) return;
          this.checkTime();
        },
        immediate: true,
      },
    },
    created() {},
    mounted() {
      this.init();
    },
    methods: {
      init() {
        if (this.remainTime > 0) {
          this.day = Math.floor(this.remainTime / 3600 / 24);
          this.hour = Math.floor((this.remainTime / 3600) % 24);
          this.minute = Math.floor((this.remainTime / 60) % 60);
          this.second = Math.floor(this.remainTime % 60);
          this.countDowm();
        }
      },
      checkTime() {
        if (this.totalTime && this.totalTime.indexOf('-') !== -1) {
          this.allTime = new Date(this.totalTime.replace(/-/g, '/')).getTime();
        } else {
          this.allTime = new Date(this.totalTime).getTime();
        }
      },
      countDowm() {
        const self = this;
        clearInterval(this.promiseTimer);
        this.promiseTimer = setInterval(() => {
          /* eslint-disable no-lonely-if */
          if (self.day === 0) {
            if (self.hour === 0) {
              if (self.minute !== 0 && self.second === 0) {
                self.second = 59;
                self.minute -= 1;
              } else if (self.minute === 0 && self.second === 0) {
                self.second = 0;
                self.$emit('countDowmEnd', true);
                clearInterval(self.promiseTimer);
              } else {
                self.second -= 1;
              }
            } else {
              if (self.minute !== 0 && self.second === 0) {
                self.second = 59;
                self.minute -= 1;
              } else if (self.minute === 0 && self.second === 0) {
                self.hour -= 1;
                self.minute = 59;
                self.second = 59;
              } else {
                self.second -= 1;
              }
            }
          } else {
            if (self.hour === 0 && self.minute === 0 && self.second === 0) {
              self.day -= 1;
              self.hour = 23;
              self.minute = 60;
              self.second = 60;
            } else {
              if (self.hour === 0) {
                if (self.minute !== 0 && self.second === 0) {
                  self.second = 59;
                  self.minute -= 1;
                } else if (self.minute === 0 && self.second === 0) {
                  self.second = 0;
                } else {
                  self.second -= 1;
                }
              } else {
                if (self.minute !== 0 && self.second === 0) {
                  self.second = 59;
                  self.minute -= 1;
                } else if (self.minute === 0 && self.second === 0) {
                  self.hour -= 1;
                  self.minute = 59;
                  self.second = 59;
                } else {
                  self.second -= 1;
                }
              }
            }
          }
          /* eslint-disable no-lonely-if */
        }, 1000);
      },
      formatNum(num) {
        return num < 10 ? `0${num}` : `${num}`;
      },
    },
  };
</script>
<style>
  .count-content {
    width: 710px;
    height: 96px;
  }
  .count-time {
    font-size: 25px;
    font-weight: bold;
    color: #fe2828;
    margin-right: 10px;
    margin-left: 10px;
  }
  .count-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 710px;
    height: 96px;
  }

  .time-wrapper {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 250px;
    margin-top: 23px;
  }
  .time-day {
    margin-right: 8px;
  }
  .cell-wrapper {
    width: 32px;
    padding-left: 4px;
    background-image: linear-gradient(to bottom, #ffffff, #fff5f2);
    border-style: solid;
    border-width: 1px;
    border-color: #f8cec8;
    border-radius: 6px;
  }
  .time-cell {
    height: 49px;
    line-height: 49px;
  }
  .text-wrapper {
    position: absolute;
    top: 29px;
    right: 30px;
  }
  .text-end {
    font-size: 26px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #ad5f54;
    line-height: 37px;
  }
</style>
