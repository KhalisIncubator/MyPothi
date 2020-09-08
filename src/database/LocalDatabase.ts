/* eslint-disable no-restricted-syntax */
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './Schema'
import { Shabad, Pothi } from './Models'

const adapter = new SQLiteAdapter( {
 schema,
} )
const localDatabase = new Database( {
  adapter,
  modelClasses: [ Pothi, Shabad ],
  actionsEnabled: true
} )


export { localDatabase }
