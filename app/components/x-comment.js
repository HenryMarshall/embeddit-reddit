import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],

  actions: {
    // vote: function(arst, direction) {
    vote: function(comment, direction) {
      var reddit = this.get('reddit');
      var accessToken = this.get('accessToken');
      if (accessToken) {
        // If validated, take action
        reddit.auth(accessToken).then(function() {

          return reddit('/api/vote').post({
            dir: direction,
            id: comment.kind + '_' + comment.data.id // e.g. t3_345jur
          });
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
