import assert from 'node:assert/strict';
import test from 'node:test';
import { parseTaskPayload } from '../src/utils/task-validation.js';

test('trims and returns valid task fields', () => {
  const result = parseTaskPayload({
    title: '  Prepare the project  ',
    description: '  Add the MongoDB connection  ',
    completed: false,
  });

  assert.deepEqual(result, {
    title: 'Prepare the project',
    description: 'Add the MongoDB connection',
    completed: false,
  });
});

test('requires a title when creating a task', () => {
  assert.throws(
    () => parseTaskPayload({ description: 'Missing title' }),
    (error) => error.statusCode === 400 && /title field is required/.test(error.message),
  );
});

test('allows partial updates but rejects an empty update', () => {
  assert.deepEqual(
    parseTaskPayload({ completed: true }, { partial: true }),
    { completed: true },
  );

  assert.throws(
    () => parseTaskPayload({}, { partial: true }),
    (error) => error.statusCode === 400,
  );
});

test('rejects unknown fields and invalid field types', () => {
  assert.throws(
    () => parseTaskPayload({ title: 'Task', admin: true }),
    (error) => error.statusCode === 400 && /Unknown field/.test(error.message),
  );

  assert.throws(
    () => parseTaskPayload({ title: 'Task', completed: 'yes' }),
    (error) => error.statusCode === 400 && /boolean/.test(error.message),
  );
});
