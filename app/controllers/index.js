import Controller from '@ember/controller';
import {
  get,
  set,
  computed
}
from '@ember/object';

export default Controller.extend({
  pieDefaultData: computed(function () {
    return {
      datasets: [{
        label: "",
        data: [1],
        backgroundColor: ["#838383"],
      }],
      labels: ['нет данных'],
    }
  }),
  yearIconType: 'bar',
  yearChartType: 'doughnut',
  nowIconType: 'bar',
  nowChartType: 'doughnut',
  nowData: null,
  maxData: null,

  getPieData: function (data) {
    if (data.length === 0) {
      return get(this, 'pieDefaultData');
    }
    data = data.sortBy('online').reverse();
    return {
      datasets: [{
        label: "",
        data: data.map((item) => {
          return item.online;
        }),
        backgroundColor: data.map((item) => {
          return item.backgroundColor;
        }),
      }],
      labels: data.map((item) => {
        return item.name;
      })
    };
  },
  pieData: computed('nowData.[]', function () {
    return this.getPieData(get(this, 'nowData'));
  }),
  pieMaxData: computed('maxData.[]', function () {
    return this.getPieData(get(this, 'maxData'));
  }),
  actions: {
    changeChart: function (type) {
      if (get(this, type + 'ChartType') === 'doughnut') {
        set(this, type + 'ChartType', 'bar');
        set(this, type + 'IconType', 'pie');
      } else {
        set(this, type + 'ChartType', 'doughnut');
        set(this, type + 'IconType', 'bar');
      }
    }
  }
});
