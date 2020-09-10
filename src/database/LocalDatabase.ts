import { Database, Query, Model } from '@nozbe/watermelondb'
import { Shabad, Pothi } from './Models'
import schema from './Schema'
import Collection from '@nozbe/watermelondb/Collection'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Observable } from 'rxjs'

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

interface Columns {
  "pothis":  Pothi,
  "shabads": Shabad,
  [key: string]: Pothi | Shabad

}
export { localDatabase, Columns }

