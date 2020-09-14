import { Database, Query, Model } from '@nozbe/watermelondb'
import { Shabad, Pothi } from './Models'
import schema from './Schema'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

const adapter = new SQLiteAdapter( {
 schema,
} )
const localDatabase = new Database( {
  adapter,
  modelClasses: [ Pothi, Shabad ],
  actionsEnabled: true,
  // @ts-ignore
  synchronous: true
} )

export type Columns = {
  "pothis":  Pothi,
  "shabads": Shabad,
}
export { localDatabase }

