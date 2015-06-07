import Ember from 'ember';

export default Ember.Controller.extend({

  params: {
    articleUrl: null,
    whitelistedSubreddits: ""
  },

  // TODO: These should be proken up into methods.
  init: function() {
    var _this = this;

    // Set up Snoocore instance
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


    // Get params from wrapper set by user.
    var wrapper = $('#embeddit-wrapper')[0];
    var paramsKey = Object.keys(this.get('params'));
    paramsKey.forEach(function(paramKey) {
      var arg = $(wrapper).data(paramKey.dasherize());
      if (arg !== undefined) {
        this.set(`params.${paramKey}`, arg);
      }
    }, this);


    // Get threads for given url.
    var url = this.get('params.articleUrl');
    reddit('api/info').get({ url: url }).then(function(response) {
      var approvedSubreddits = this.get('params.whitelistedSubreddits').split(' ');
      var allThreads = response.data.children;
      // if (approvedSubreddits) {
      //   // Any thread found on whitelist
      //   var existingWhitelistedThreads = allThreads.filter(function(thread) {
      //     return approvedSubreddits.some(function(approvedSubreddit) {
      //       return (approvedSubreddit === thread.data.subreddit);
      //     });
      //   });
      //   this.set('existingWhitelistedThreads', existingWhitelistedThreads);
      // }
      // // In the absense of a whitelist, everything is permitted
      // else {
      //   this.set('existingWhitelistedThreads', allThreads);
      // }
    });


    // Set accessToken from local storage
    this.store.find('authCallback').then(function(auth) {
      var credential = auth.get('firstObject');
      if (credential) {
        var accessToken = credential.get('accessToken');
        _this.set('accessToken', accessToken);
      }
    });


    // Get comments for given thread
    reddit('comments/2aa5tl').get().then(function(response) {
      _this.set('topLevelComments', response[1].data.children);
    });

  },
});
