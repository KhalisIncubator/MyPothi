/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type ViewProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
}
type RowProps = ViewProps & {
  centered?: boolean
  spaceEvenly?: boolean,
  spaceBetween?: boolean
  spaceAround?: boolean,
  flexEnd?: boolean
}
const Row = ( { children, style, ...rest }: RowProps ) => {

  const { spaceEvenly, spaceBetween, spaceAround, flexEnd,   centered } = rest
  const ViewStyle: StyleProp<ViewStyle>[] = [
    ViewStyles.Row,
    style,
    centered && { justifyContent: 'center' },
    spaceEvenly && { justifyContent: 'space-evenly' },
    spaceBetween && { justifyContent: 'space-between' },
    spaceAround && { justifyContent: 'space-around' },
    flexEnd && { justifyContent: 'flex-end' }
  ]

  return <View style={ViewStyle}>{children}</View> 
}


type ColumnProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
}
const Column = ( { children, style }: ColumnProps ) => (
  <View style={[ ViewStyles.Column, style ]}>{children}</View>
)
export { Column, Row }

const ViewStyles = StyleSheet.create( {
  Column: {
    
  },
  Row: {
    flexDirection: 'row'
  }
} )

