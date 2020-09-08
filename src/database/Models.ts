import { Model } from '@nozbe/watermelondb'
import { field, relation, children } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

class Pothi extends Model {
  static table = 'pothis'
  static associations: Associations = {
    shabads: { type: 'has_many', foreignKey: 'pothi_id' }
  }
  @field( 'name' ) name: string
  @children( 'shabads' ) shabads
}

class Shabad extends Model {
  static table = 'shabads'
  static associations: Associations = {
    pothi: { type: 'belongs_to', key: 'pothi_id' }
  }
  
  @field( 'html' ) html
  @field( 'main_line' ) mainLine

  @relation( 'pothis', 'pothi_id' ) pothi

}

export { Shabad, Pothi }
