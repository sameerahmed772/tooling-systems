export default Object.freeze({
  name: 'prod',
  port: Number(process.env.PORT ?? 3002),
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB_NAME ?? 'tooling_systems_prod',
});
