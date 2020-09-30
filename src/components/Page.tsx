import React, { ReactNode } from 'react'
import {  View, SafeAreaView, StyleSheet, Keyboard, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../store/Theme'


export type PageProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
}
const Page = ( { children, style }: PageProps ) => {
  const [ theme ] = useTheme()
  const pageTheme = StyleSheet.flatten( [ PageStyles.Page, { backgroundColor: theme.colors.background }, style ] )
  return (
    <SafeAreaView style={pageTheme}>
      <View style={PageStyles.View}>
        {children}
        </View>
    </SafeAreaView>
  )
}

const PageStyles = StyleSheet.create( {
  Page: {
    flex: 1,
  },
  View: {
    flex: 1,
    padding: 10
  }
} )

export { Page, PageStyles }

