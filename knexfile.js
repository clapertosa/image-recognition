module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "image-recognizer",
      user: "postgres",
      password: "password"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};
