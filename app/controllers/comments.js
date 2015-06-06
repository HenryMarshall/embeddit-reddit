import Ember from 'ember';

export default Ember.Controller.extend({

  init: function() {

    var reddit = new window.Snoocore({
      userAgent: '/u/embeddit-reddit embeddit-reddit@0.0.1',   
      oauth: {
        type: 'implicit',
        key: '7LY_7ViAfIQNkw',   
        redirectUri: 'http://localhost:8000/',
        scope: [ 'identity', 'read' ]
      }
    });
    this.set('reddit', reddit);

    var _this = this;
    reddit('comments/2aa5tl').get().then(function(response) {
      _this.set('topLevelComments', response[1].data.children);
    });

  },
});
