import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('wishlist_tours', (table) => {
    table.increments('id');
    table.integer('tourId').unsigned().notNullable();
    table.foreign('tourId').references('tours.id').onDelete('CASCADE');
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('users.id').onDelete('CASCADE');
    table.unique(['tourId', 'userId']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('wishlist_tours');
}
