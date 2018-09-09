exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert({
        email: "newuser@newuser.com",
        password: "password",
        created_at: knex.fn.now()
      });
    });
};
