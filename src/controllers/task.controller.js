import mongoose from 'mongoose';
import * as taskService from '../services/task.service.js';
import AppError from '../utils/app-error.js';

function getTaskId(req) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError('Invalid task ID.', 400);
  }

  return id;
}

export async function listTasks(req, res) {
  const tasks = await taskService.listTasks();
  res.status(200).json({ data: tasks });
}

export async function getTask(req, res) {
  const task = await taskService.getTaskById(getTaskId(req));
  res.status(200).json({ data: task });
}

export async function createTask(req, res) {
  const task = await taskService.createTask(req.validatedBody);
  res.status(201).json({ data: task });
}

export async function updateTask(req, res) {
  const task = await taskService.updateTask(
    getTaskId(req),
    req.validatedBody,
  );
  res.status(200).json({ data: task });
}

export async function deleteTask(req, res) {
  const task = await taskService.deleteTask(getTaskId(req));
  res.status(200).json({
    message: 'Task deleted successfully.',
    data: task,
  });
}
