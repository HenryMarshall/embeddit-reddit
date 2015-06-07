import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],

  actions: {
    auth: function() {
      window.open("http://google.com/");
    }
  }
});
