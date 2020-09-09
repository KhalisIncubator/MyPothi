import { Database } from '@nozbe/watermelondb'
import { Shabad, Pothi } from './Models'
import schema from './Schema'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

const adapter = new SQLiteAdapter( {
 schema,
} )
const localDatabase = new Database( {
  adapter,
  modelClasses: [ Pothi, Shabad ],
  actionsEnabled: true
} )


export {localDatabase}

