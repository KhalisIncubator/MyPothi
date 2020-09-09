import React, { useState } from 'react'

import { ScrollView, useWindowDimensions, StyleSheet, SafeAreaView } from 'react-native'


const DynamicScrollView = ( { children } ) => {
  const window = useWindowDimensions()
  const [ pageHeight, updatePageHeight ] = useState( 0 )

    return (
      <SafeAreaView  style={PageStyles.page} >
        <ScrollView scrollEnabled={pageHeight > window.height} style={PageStyles.scrollView} onContentSizeChange={( width, height ) => {updatePageHeight( height )}}>
          {children}
        </ScrollView>
      </SafeAreaView>
  )

}

const PageStyles = StyleSheet.create( {
  page: {
    flex: 1,
  },
  scrollView: {
    padding: 10
  }
} )

export { DynamicScrollView }
