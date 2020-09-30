import React, { ReactNode, useState } from 'react'

import { ScrollView, Keyboard, useWindowDimensions } from 'react-native'
import { Page, PageProps } from './Page'


const DynamicScrollView = ( { children, style }: PageProps ) => {
  const window = useWindowDimensions()
  const [ pageHeight, updatePageHeight ] = useState( 0 )

    return (
      <Page style={style}>
        <ScrollView onScroll={() => Keyboard.dismiss()} scrollEnabled={pageHeight > window.height} onContentSizeChange={( _, height ) => {updatePageHeight( height )}}>
          {children}
        </ScrollView>
      </Page>
  )

}

export { DynamicScrollView }
