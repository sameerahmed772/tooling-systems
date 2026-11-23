import mongoose from 'mongoose';
import app from './app.js';
import { loadConfig } from './config/index.js';

async function startServer() {
  const config = await loadConfig();

  await mongoose.connect(config.mongoUri, {
    dbName: config.databaseName,
    serverSelectionTimeoutMS: 5000,
  });

  const server = app.listen(config.port, () => {
    console.log(
      `Task API running in ${config.name} on port ${config.port}`,
    );
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Closing server...`);

    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch((error) => {
  console.error('Unable to start the application:', error.message);
  process.exit(1);
});
