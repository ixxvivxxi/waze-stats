import Ember from 'ember';

export default Ember.Controller.extend({
  pieData: Ember.computed('cities' , function() {
     var piedata = {};
     piedata.labels = ['Минск', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилёв'];


     Promise.all([
       this.store.query('stat', {'a':'city', 'id': 59, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 65, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 67, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 64, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 66, 'type':1, 'format':'json'}),
       this.store.query('stat', {'a':'city', 'id': 68, 'type':1, 'format':'json'})
     ]).then((values) => {
       values.forEach((value) => {
         console.log(value.get('lastObject').get('online'));
       });

        return 'готово';
     });



  }),

});
