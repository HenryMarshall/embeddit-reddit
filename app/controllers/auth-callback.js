import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['access_token'],

  actions: {
    // We access `access_token` by passing to component, and on
    // didInsertElement bubbling an action back up. Oh dear!
    saveAccessToken: function(accessToken) {
      this.store.createRecord('auth-callback', {
        accessToken: accessToken
      });
    }
  }
});
