import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],
  isUpvoted: false,
  isDownvoted: false,

  actions: {
    // I believe that comment is unnecessary, but am moving to fast to test
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
    },

    toggleReplyVisible: function() {
      this.toggleProperty('replyVisible');
    },

    submitReply: function(parent) {
      // FIXME: MOAR CP!
      var reddit = this.get('reddit');
      var accessToken = this.get('accessToken');
      var replyText = this.get('replyText');

      if (accessToken) {
        // If validated, take action
        // reddit.auth(accessToken).then(function() {
          // debugger;
          return reddit('/api/comment').post({
            api_type: 'json',
            text: replyText,
            thing_id: parent.kind + '_' + parent.data.id, // e.g. t3_345jur
            'X-Modhash header': accessToken
          });
        // });
        this.set('replyText', '');
      }
      else {
        // Else, get accessToken through auth
        var authUrl = reddit.getImplicitAuthUrl();
        window.open(authUrl);
      }
    }
  }
});
