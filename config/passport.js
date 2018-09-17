const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const knex = require("../db/knex");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      knex("users")
        .select()
        .where("id", jwt_payload.id)
        .then(user => {
          if (user[0]) {
            return done(null, user[0]);
          }
          return done(null, false);
        })
        .catch(error => error);
    })
  );
};
