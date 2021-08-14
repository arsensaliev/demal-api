import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: 1,
      firstName: 'Arsen',
      lastName: 'Saliev',
      email: 'arsen@mail.ru',
      country: 'Казахстан',
      city: 'Алматы',
      password: '$2a$10$uvngDEcA/Q2b7LA04FtdZeUZxAB/ozJV6dHMlrRWwNmjmHyUlEGwu',
      imagePath: null,
    },
  ]);
}
