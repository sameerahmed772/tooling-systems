export default Object.freeze({
  name: 'preprod',
  port: Number(process.env.PORT ?? 3001),
  mongoUri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DB_NAME ?? 'tooling_systems_preprod',
});
