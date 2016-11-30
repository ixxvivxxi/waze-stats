import Ember from 'ember';

const {
  RSVP: { Promise }
} = Ember;

export default Ember.Controller.extend({
  pieData: Ember.computed('cities' , function() {
     var piedata = {};
     piedata.labels = ['Минск', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилёв'];

     return Promise.all([
       this.store.query('stat', {'a':'city', 'id': 59, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 65, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 67, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 64, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 66, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 68, 'type':1, 'format':'json'})
     ])
     .then((values) => {
       values.forEach((value, index) => console.log(index, Math.max(...value.mapBy('online'))));
       values.forEach((value, index) => console.log(index, value.get('lastObject.online')));
       return 'готово';
     })
     .catch((e) => console.error(e));
  }),

});
