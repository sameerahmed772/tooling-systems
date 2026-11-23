import express from 'express';
import taskRoutes from './routes/task.routes.js';
import AppError from './utils/app-error.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  next(new AppError('Route not found.', 404));
});

app.use(errorHandler);

export default app;
