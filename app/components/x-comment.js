import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],

  actions: {
    auth: function() {
      var reddit = this.get('reddit');
      var accessToken = this.get('accessToken')
      if (accessToken) {
        // If validated, take action
        reddit.auth(accessToken).then(function() {
          return reddit('/api/v1/me').get();
        }).then(function(data) {
          console.log(data);
        });
      }
      else {
        // Else, get accessToken through auth
        var authUrl = reddit.getImplicitAuthUrl();
        window.open(authUrl);
      }
    }
  }
});
