export default Object.freeze({
  name: 'staging',
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB_NAME ?? 'tooling_systems_staging',
});
