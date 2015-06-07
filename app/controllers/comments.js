import Ember from 'ember';

export default Ember.Controller.extend({

  init: function() {
    var _this = this;

    var reddit = new window.Snoocore({
      userAgent: '/u/embeddit-reddit embeddit-reddit@0.0.1',   
      oauth: {
        type: 'implicit',
        key: '7LY_7ViAfIQNkw',   
        redirectUri: 'http://localhost:4200/auth-callback',
        scope: [ 'identity', 'read', 'vote' ]
      }
    });
    this.set('reddit', reddit);

    this.store.find('authCallback').then(function(auth) {
      var credential = auth.get('firstObject');
      if (credential) {
        var accessToken = credential.get('accessToken');
        _this.set('accessToken', accessToken);
      }
    });

    reddit('comments/2aa5tl').get().then(function(response) {
      _this.set('topLevelComments', response[1].data.children);
    });

  },
});
