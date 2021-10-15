import { Model, Query, Relation } from '@nozbe/watermelondb'
import { field, children, relation, action } from '@nozbe/watermelondb/decorators'
import { Associations } from '@nozbe/watermelondb/Model'

class Pothi extends Model {
  static table = 'pothis'
  static associations: Associations = {
    shabads: { type: 'has_many', foreignKey: 'pothi_id' }
  }
  @field( 'title' ) title: string
  @children( 'shabads' ) shabads: Query<Shabad>

  @action async addShabad( html: string, main_line: string ) {
    return await this.collections.get<Shabad>( 'shabads' ).create( shabad => {
      shabad.pothi.set( this )
      shabad.html = html
      shabad.mainLine = main_line
    } )
  }
}

class Shabad extends Model {
  static table = 'shabads'
  static associations: Associations = {
    pothi: { type: 'belongs_to', key: 'pothi_id' }
  }

  @field( 'html' ) html: string
  @field( 'main_line' ) mainLine: string
  @relation( 'pothis', 'pothi_id' ) pothi: Relation<Pothi>

}

export { Shabad, Pothi }
