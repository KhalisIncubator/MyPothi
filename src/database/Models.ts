import { Model } from '@nozbe/watermelondb'
import {  field, children, relation } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

class Pothi extends Model {
  static table = 'pothis'
  static associations: Associations = {
    shabads: { type: 'has_many', foreignKey: 'pothi_id' }
  }
  @field( 'title' ) title: string 
  @children( 'shabads' ) shabads: Shabad[]
}

class Shabad extends Model {
  static table = 'shabads'
  static associations: Associations = {
    pothi: { type: 'belongs_to', key: 'pothi_id' }
  }
  
  @field( 'html' ) html: string
  @field( 'main_line' ) mainLine: string
  @relation( 'pothis', 'pothi_id' ) pothi: Pothi

}

export { Shabad, Pothi }
