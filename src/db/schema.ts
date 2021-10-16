import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema( {
  version: 1, 
  tables: [
     tableSchema( {
      name: 'pothis',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'last_opened', type: 'number' } 
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
  ],
} )
