import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['access_token'],

  init: function() {
    // delete all existing tokens. this may cause race conditions with
    // saveAccessToken with a sufficiently large number of existing tokens, but
    // there *should* only ever be one anyway.
    this.store.find('auth-callback').then(function(record) {
      record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
          rec.deleteRecord();
          rec.save();
        });
      }, this);
    });
  },

  actions: {
    // We access `access_token` by passing to component, and on
    // didInsertElement bubbling an action back up. Oh dear!
    saveAccessToken: function(accessToken) {
      this.store.createRecord('auth-callback', {
        accessToken: accessToken
      }).save();
    }
  }
});
