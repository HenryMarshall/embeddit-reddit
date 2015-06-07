import Ember from 'ember';

export default Ember.Component.extend({

  // FIXME: This probably should be done with the controller's views. It's late
  didInsertElement: function() {
    console.log("this.get('access_token'): ",this.get('access_token'));
  }
});
