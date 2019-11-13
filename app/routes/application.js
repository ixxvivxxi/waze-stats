import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  model() {
    return [
      {
        id: 59,
        name: 'Минск',
        color: '#1678c2',
      },
      {
        id: 65,
        name: 'Брест',
        color: '#a7bd0d',
      },
      {
        id: 67,
        name: 'Витебск',
        color: '#16ab39',
      },
      {
        id: 64,
        name: 'Гомель',
        color: '#009c95',
      },
      {
        id: 66,
        name: 'Гродно',
        color: '#36A2EB',
      },
      {
        id: 68,
        name: 'Могилёв',
        color: '#f26202',
      },
      {
        id: 71,
        name: 'Барановичи',
        color: '#eaae00',
      },
      {
        id: 69,
        name: 'Бобруйск',
        color: '#4BC0C0',
      },
      {
        id: 72,
        name: 'Борисов',
        color: '#FFCE56',
      },
      {
        id: 74,
        name: 'Мозырь/Калинковичи',
        color: '#FF6384',
      },
      {
        id: 73,
        name: 'Молодечно',
        color: '#607d8b',
      },
      {
        id: 75,
        name: 'Пинск',
        color: '#0097a7',
      },
      {
        id: 76,
        name: 'Полоцк/Новополоцк',
        color: '#5829bb',
      },
      {
        id: 77,
        name: 'Солигорск',
        color: '#e61a8d',
      },
    ];
  },

  setupController(controller, model) {
    controller.set('cities', model);
  },

  actions: {
    didTransition() {
      $('.ui.sidebar').sidebar('hide');
      return true;
    },
  },
});
