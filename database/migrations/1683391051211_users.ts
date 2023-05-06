import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 100).notNullable()
      table.string('password', 240).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
