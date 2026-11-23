import Task from '../models/Task.js';
import AppError from '../utils/app-error.js';

export async function listTasks() {
  return Task.find().sort({ createdAt: -1 }).lean();
}

export async function getTaskById(id) {
  const task = await Task.findById(id).lean();

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
}

export async function createTask(payload) {
  const task = await Task.create(payload);
  return task.toObject();
}

export async function updateTask(id, payload) {
  const task = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
}

export async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id).lean();

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
}
