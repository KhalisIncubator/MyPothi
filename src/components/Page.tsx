import React from 'react'

import { SafeAreaView, View, StyleSheet } from 'react-native'
import { useTheme } from '../utils/Hooks'


const Page = ( { children } ) => {
  const [ theme ] = useTheme()
  const pageTheme = StyleSheet.flatten( [ PageStyles.Page, { backgroundColor: theme.colors.background } ] )
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

