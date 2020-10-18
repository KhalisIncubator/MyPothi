import React, { ReactNode } from 'react'
import {  View, SafeAreaView, StyleSheet, StyleProp, ViewStyle, StatusBar } from 'react-native'
import { useTheme } from '../store/Theme'


export type PageProps = {
  children: ReactNode,
  style?: StyleProp<ViewStyle>
}
const Page = ( { children, style }: PageProps ) => {
  const [ theme ] = useTheme()
  return (
    <SafeAreaView style={[ PageStyles.Page, { backgroundColor: theme.colors.background }, style ] }>
      <StatusBar barStyle={theme.statusbar} />
      <View style={[ PageStyles.View, { backgroundColor: theme.colors.background } ]}>
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

