import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { Pothi, Shabad } from './models'

import schema from './schema'
import migrations from './migrations'


const adapter = new SQLiteAdapter( {
  schema,
  migrations,
  jsi: true,
  // onSetUpError: error => {}
} )


const database = new Database( {
  adapter,
  modelClasses: [ Pothi, Shabad ],
  actionsEnabled: true
} )

export { database }
