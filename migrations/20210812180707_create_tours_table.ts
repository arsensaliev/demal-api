import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tours', (table) => {
    table.increments('id');
    table.string('title', 255).notNullable();
    table.string('subTitle', 255).notNullable();
    table.string('place', 255).notNullable();
    table.integer('price').notNullable().defaultTo(0);
    table.string('country', 255).notNullable();
    table.integer('duration').notNullable();
    table.text('description').nullable();
    table.integer('travelersCount').notNullable();
    table.date('startDate').notNullable();
    table.integer('categoryId').unsigned().nullable();
    table
      .foreign('categoryId')
      .references('categories.id')
      .onDelete('SET NULL');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tours');
}
