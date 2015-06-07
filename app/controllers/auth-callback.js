import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['access_token'],

  init: function() {

    var _this = this;
    
    this.store.find('auth-callback').then(function(record) {
      record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
          rec.deleteRecord();
          rec.save();
        });
      }, this);
    }).then(function() {
      var queries = window.location.hash;
      var accessToken = queries.match(/access_token=(.+?)&/)[1];
      _this.store.createRecord('authCallback', {
        accessToken: accessToken
      }).save();
    });
  }
});
