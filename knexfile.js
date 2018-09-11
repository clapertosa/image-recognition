module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "image-recognition",
      user: "postgres",
      password: "password"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};
