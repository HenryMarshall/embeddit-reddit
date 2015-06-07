import { moduleForModel, test } from 'ember-qunit';

moduleForModel('auth-callback', 'Unit | Serializer | auth callback', {
  // Specify the other units that are required for this test.
  needs: ['serializer:auth-callback']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
