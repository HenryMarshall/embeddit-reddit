import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],
  isUpvoted: false,
  isDownvoted: false,

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

        var directionToToggle = direction === "1" ? "isUpvoted" : "isDownvoted";
        this.toggleProperty(directionToToggle);
      }
      else {
        // Else, get accessToken through auth
        var authUrl = reddit.getImplicitAuthUrl();
        window.open(authUrl);
      }
    }
  }
});
