exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  

/* Para ejecutar la migrations debes ejecutar el comando ( npx knex migrate:latest ) */