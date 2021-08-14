import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    { id: 0, name: 'Гастрономические туры', iconPath: null },
    { id: 1, name: 'Йога-туры', iconPath: null },
    { id: 2, name: 'Пешие прогулки', iconPath: null },
    { id: 3, name: 'Виа-Феррата', iconPath: null },
    { id: 4, name: 'Ски-туры', iconPath: null },
    { id: 5, name: 'Альпинизм', iconPath: null },
    { id: 6, name: 'Каякинг', iconPath: null },
    { id: 7, name: 'Новые места', iconPath: null },
  ]);
}
