import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
        {
          id: 59,
          name: 'Минск',
          nowStats: []
        },
        {
          id: 65,
          name: 'Брест',
          nowStats: []
        },
        {
          id: 67,
          name: 'Витебск',
          nowStats: []
        },
        {
          id: 64,
          name: 'Гомель',
          nowStats: []
        },
        {
          id: 66,
          name: 'Гродно',
          nowStats: []
        },
        {
          id: 68,
          name: 'Могилёв',
          nowStats: []
        },
        {
          id: 71,
          name: 'Барановичи',
          nowStats: []
        },
        {
          id: 69,
          name: 'Бобруйск',
          nowStats: []
        },
        {
          id: 72,
          name: 'Борисов',
          nowStats: []
        },
        {
          id: 74,
          name: 'Мозырь/Калинковичи',
          nowStats: []
        },
        {
          id: 73,
          name: 'Молодечно',
          nowStats: []
        },
        {
          id: 75,
          name: 'Пинск',
          nowStats: []
        },
        {
          id: 76,
          name: 'Полоцк/Новополоцк',
          nowStats: []
        },
        {
          id: 77,
          name: 'Солигорск',
          nowStats: []
        },
      ];
  },
  setupController(controller, model) {
    controller.set('cities', model);
  }
});
