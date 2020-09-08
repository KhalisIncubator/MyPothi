import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Menu } from 'react-native-paper'

import { useLine } from '../../Hooks'

const ContextMenu = ( { menu, children } ) => {
  const line = useLine()
  const [ isVisible, updateVisible ] = useState( false )

  const toggleVis = () => {
    updateVisible( ( prev ) => !prev )
  }
  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVis}
      anchor={(
        <TouchableOpacity onLongPress={toggleVis} activeOpacity={0.7}>
          {children}
        </TouchableOpacity>
      )}
    >
      {menu.map( ( { title, action } ) => (
        <Menu.Item
          title={title}
          onPress={() => {
            action( line )
            toggleVis()
          }}
          key={title}
        />
      ) )}
    </Menu>
  )
}
export { ContextMenu }
