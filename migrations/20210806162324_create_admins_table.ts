import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('admins');
}
