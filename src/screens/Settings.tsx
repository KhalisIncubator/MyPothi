import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Page } from '../components/Page'
import { Colors } from '../utils/Themes'
import { Editor } from '../components/Editor'
import { useTheme } from '../store/Theme'
import { Text } from '../components/Text'
import { Column, Row } from '../components/View'
import { SettingsMap, SectionsMap } from '../utils/SettingsMap'
import { useSettings } from '../store/Settings'
import {  SettingsSection } from '../components/SettingsComponents'
import { ValueOf } from '../index'
import { useCachedValue, useExpCachedValueUpdater } from '../utils/Hooks'

const SettingsScreen = () => {
  const [ theme ] = useTheme()
  let tester = {
    test: 'bruh'
  }
  const test = useExpCachedValueUpdater( 'oop', tester )
  console.log( 'rerender' )
  useEffect( () => {
    setTimeout( () => {
      tester = {
        test: 'not good'
      }
      console.log( 'executing' )
    }, 3000 )
  } )

  return (
    <Page>
      <ScrollView style={[ SettingsStyles.EditorContainer, { borderRadius: theme.style.roundness } ]}>
        <Editor style={{ backgroundColor: Colors.LightGrey }} html="<div>yo</div>" onHeightChange={() => { console.log( 'hi' )}}/>
      </ScrollView>
      <ScrollView style={SettingsStyles.SettingsContainer}>
      <Row centered>
        <Text>Settings</Text>
      </Row>
        {Object.entries( SectionsMap ).map( ( [ key, info ] )=> {
          const { title, values  } = info
          // @ts-expect-error this is due to Object.entries returning key typeof as string
          const SettingMap = SettingsMap[ key ]
          // @ts-expect-error
        }
        )}
      </ScrollView>
    </Page>
  )
}
export default SettingsScreen

const generateSettings = ( settingMap: ValueOf<typeof SettingsMap>, settings: any ) => {
  console.log( settings )
}

const SettingsStyles = StyleSheet.create( {
  EditorContainer: {
    backgroundColor: Colors.LightGrey,
    flex: 3,
    flexGrow: 3,
    marginBottom: 10
  },
  SettingsContainer: {
    flex: 7,
    flexGrow: 7,
  }
} )
