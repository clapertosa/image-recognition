module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "image-recognition",
      user: "postgres",
      password: "password",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};
