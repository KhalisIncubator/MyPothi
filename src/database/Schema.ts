import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema( {
  version: 2,
  tables: [
    tableSchema( {
      name: 'pothis',
      columns: [
        { name: 'title', type: 'string' },
      ]
    } ),
    tableSchema( {
      name: 'shabads',
      columns: [
        { name: 'pothi_id', type: 'string', isIndexed: true },
        { name: 'html', type: 'string' },
        { name: 'main_line', type: 'string' },
      ]
    } )
  ]
} )
