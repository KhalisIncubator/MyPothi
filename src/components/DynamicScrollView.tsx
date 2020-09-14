import React, { ReactChild, useState } from 'react'

import { ScrollView, Keyboard, useWindowDimensions, StyleSheet, SafeAreaView } from 'react-native'
import { Page } from './Page'


type DynamicScrollViewProps = {
  children: ReactChild
}
const DynamicScrollView = ( { children }: DynamicScrollViewProps ) => {
  const window = useWindowDimensions()
  const [ pageHeight, updatePageHeight ] = useState( 0 )

    return (
      <Page>
        <ScrollView onScroll={() => Keyboard.dismiss()} scrollEnabled={pageHeight > window.height} onContentSizeChange={( width, height ) => {updatePageHeight( height )}}>
          {children}
        </ScrollView>
      </Page>
  )

}

export { DynamicScrollView }
