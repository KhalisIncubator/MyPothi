import { Model } from '@nozbe/watermelondb'
import {  field, children, relation, date, readonly } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

class Pothi extends Model {
  static table = 'pothis'
  static associations: Associations = {
    shabads: { type: 'has_many', foreignKey: 'pothi_id' }
  }
  @field( 'title' )
  title!: string 
  @date( 'last_opened' )
  lastOpened!: Date
  @children( 'shabads' ) shabads: Shabad[] | undefined
  @readonly @date( 'created_at' )
  createdAt!: Date

}

class Shabad extends Model {
  static table = 'shabads'
  static associations: Associations = {
    pothi: { type: 'belongs_to', key: 'pothi_id' }
  }
  
  @field( 'html' )
  html!: string
  @field( 'main_line' )
  mainLine!: string
  @relation( 'pothis', 'pothi_id' )
  pothi!: Pothi

}

export { Shabad, Pothi }

