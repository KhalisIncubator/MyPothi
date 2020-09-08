import React from 'react'
import {
  FlatList,
  SafeAreaView,
  View,
} from 'react-native'

import ShabadBlock from './ShabadBlock'

const Viewer = ( props ) => {
  const { currentLines } = props

  const renderItem = ( { item, index } ) => (
    <ShabadBlock item={item} index={index} />
  )

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <FlatList
        data={currentLines}
        initialNumToRender={currentLines[ 0 ]?.length < 101 ? 1 : undefined}
        keyExtractor={( item, index ) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{
            width: '100%',
            backgroundColor: '#3498db',
            height: 3,
          }}
          />
        )}
      />
    </SafeAreaView>
  )
}


export default Viewer
