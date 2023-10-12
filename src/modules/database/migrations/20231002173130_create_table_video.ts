import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      // Create table channel
      .createTable('channel', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable().unique()
      })
      // Create table video
      .createTable('video', (table) => {
        table.increments('id').primary()
        table.string('name', 255).notNullable()
        table.string('publication_date').notNullable()
        table.timestamp('scrapping_date').notNullable()
        table.integer('channel_id').references('id').inTable('channel').unique()
      })
  )
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('video')
    .dropTableIfExists('channel')
    .catch((err) => {
      throw err
    })
}
