import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('reddit', new window.Snoocore({
      userAgent: '/u/embeddit-reddit embeddit-reddit@0.0.1',
      oauth: {
        type: 'implicit',
        key: '7LY_7ViAfIQNkw',
        redirectUri: 'http://localhost:8000/',
        scope: [ 'identify', 'read' ]
      }
    }));
  }
});
