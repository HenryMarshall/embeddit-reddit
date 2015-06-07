import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [ 'comment' ],

  actions: {
    auth: function() {
      var reddit = this.get('reddit');
      var authUrl = reddit.getImplicitAuthUrl();
      window.open(authUrl);
    }
  }
});
