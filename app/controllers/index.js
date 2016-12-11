import Ember from 'ember';

export default Ember.Controller.extend({
  pieDefaultData: {
    datasets: [{
        label: "",
        data: [1],
        backgroundColor: ["#838383"],
    }],
    labels: ['нет данных']
  },
  yearIconType: 'bar',
  yearChartType: 'doughnut',
  nowIconType: 'bar',
  nowChartType: 'doughnut',
  nowData: [],
  maxData: [],
  getPieData: function (data) {
    if (data.length === 0) {
      return this.get('pieDefaultData');
    }
    data = data.sortBy('online').reverse();
    return {
      datasets: [{
          label: "",
          data: data.map((item) => {return item.online;}),
          backgroundColor: data.map((item) => {return item.backgroundColor;}),
      }],
      labels: data.map((item) => {return item.name;})
    };
  },
  pieData: Ember.computed('nowData.[]' , function() {
    return this.getPieData(this.get('nowData'));
   }),
  pieMaxData: Ember.computed('maxData.[]' , function() {
    return this.getPieData(this.get('maxData'));
  }),
  actions: {
    changeChart: function(type) {
      if (this.get(type + 'ChartType') === 'doughnut') {
        this.set(type + 'ChartType', 'bar');
        this.set(type + 'IconType', 'pie');
      } else {
        this.set(type + 'ChartType', 'doughnut');
        this.set(type + 'IconType', 'bar');
      }
    }
  }
});
