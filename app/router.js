import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('comments', { path: '/' });
  this.route('auth-callback');
});

export default Router;
