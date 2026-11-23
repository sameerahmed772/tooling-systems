import assert from 'node:assert/strict';
import test from 'node:test';
import { loadConfig } from '../src/config/index.js';

test('loads the selected environment configuration dynamically', async () => {
  const keys = ['MONGODB_URI', 'MONGODB_DB_NAME', 'PORT'];
  const previousValues = Object.fromEntries(
    keys.map((key) => [key, process.env[key]]),
  );

  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017';
  process.env.MONGODB_DB_NAME = 'config_test_db';
  delete process.env.PORT;

  try {
    const config = await loadConfig('preprod');

    assert.equal(config.name, 'preprod');
    assert.equal(config.databaseName, 'config_test_db');
    assert.equal(config.mongoUri, 'mongodb://127.0.0.1:27017');
  } finally {
    for (const key of keys) {
      if (previousValues[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = previousValues[key];
      }
    }
  }
});

test('rejects unsupported environment names', async () => {
  await assert.rejects(
    loadConfig('development'),
    /Unsupported APP_ENV/,
  );
});
