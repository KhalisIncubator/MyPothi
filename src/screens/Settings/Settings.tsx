import React, { useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Page } from 'components/Page'
import { Editor } from 'components/Editor/Editor'
import { useTheme } from 'store/Theme'
import { Text } from 'components/Text'
import { Row } from 'components/View'
import { SettingsComponentMap, Setting, SettingsSection } from 'screens/Settings/SettingsComponents'
import { useSettings } from 'store/Settings'
import { SectionMap, SettingsMap } from 'screens/Settings/DefaultSettings'
import { SettingsPreviewHTML } from '../../Defaults'
import { RichEditor } from 'react-native-pell-rich-editor'

const SettingsScreen = () => {
  return (
    <Page>
      <SettingsPreview />
      <ScrollView style={SettingsStyles.SettingsContainer}>
        <Row horizontalCenter>
          <Text>Settings Preview</Text>
        </Row>
        <DynamicSettings />
      </ScrollView>
    </Page>
  )
}
export default SettingsScreen

const SettingsPreview = () => {
  const EditorRef = useRef<RichEditor>( null )
  const [ theme ] = useTheme()
  return (
    <View style={[ SettingsStyles.EditorContainer, { borderRadius: theme.style.roundness, backgroundColor: theme.colors.background } ]}>
      <Editor ref={EditorRef}
        // literally do anything because this function is actually useless
        onHeightChange={() => 1}
        onMessage={( event ) => {console.log( event.nativeEvent.data )}}
        editorStyle={{ backgroundColor: theme.colors.background, cssText: theme.colors.text }} html={SettingsPreviewHTML} useContainer={false} disabled />
    </View>
  )

}
const DynamicSettings = () => {
  const settings = useSettings()
  const setSetting = useCallback( ( section: any, path: string ) => ( value: any ) => settings.updateSettings( section, path, value ), [ settings ] )

  const createSetting = useCallback( ( valueSource, settingKey, settingsMap, settingPath, value ) => {
    const { title: settingTitle, type, pickerValues } = settingsMap[ settingKey ]
    const Mod = SettingsComponentMap[ type as keyof typeof SettingsComponentMap ]
    const update = setSetting( valueSource, settingPath )

    return (
      <Setting
        key={`${settingKey}-${settingTitle} ${settingPath} ${value} `}
        title={settingTitle}
        modifier={
          <Mod key={`${settingKey}-modifier-${settingTitle} ${value}`} initialValue={value} update={update} pickerOptions={pickerValues} />
        }
      />
    )

  }, [ setSetting ] )
  return (
    <>
      {
        SectionMap.map( section => {
          const { title, valueSource, values, subsections, subtitle } = section
          const settingsValues = settings[ valueSource as keyof typeof settings ]
          return (
            <SettingsSection title={title} subtitle={subtitle} key={`${title}-container`} >
              {!!subsections && Object.entries( subsections ).map( ( [ subKey, { title: subtitle, values: subValues } ] ) => {
                return (
                  <SettingsSection style={SettingsStyles.SettingsSubsection} subtitle={subtitle} key={`${title}-${subtitle}-container`}>
                    {subValues.map( subValueKey => createSetting( valueSource, subValueKey, SettingsMap[ subKey as keyof typeof SettingsMap ], `${subKey}/${subValueKey}`, settingsValues[ subKey ][ subValueKey ] ) )}
                  </SettingsSection>
                )
              } )}
              {values.map( valueSettingKey => {
                return createSetting( valueSource, valueSettingKey, SettingsMap, `${valueSettingKey}`, settingsValues[ valueSettingKey ] )
              } )}
            </SettingsSection>

          )
        } )
      }
    </>
  )
}

const SettingsStyles = StyleSheet.create( {
  EditorContainer: {
    flex: 3,
    flexGrow: 3,
    marginBottom: 10,
  },
  SettingsContainer: {
    flex: 7,
    flexGrow: 7,
  },
  SettingsSubsection: {
    marginVertical: 0,
    padding: 5
  }
} )
