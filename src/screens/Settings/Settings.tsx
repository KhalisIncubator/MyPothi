import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Page } from 'components/Page'
import { Colors } from 'utils/Themes'
import { Editor } from 'components/Editor'
import { useTheme } from 'store/Theme'
import { Text } from 'components/Text'
import { Row } from 'components/View'
import { SettingsComponentMap, Setting, SettingsSection } from 'screens/Settings/SettingsComponents'
import { useSettings } from 'store/Settings'
import { SectionMap, SettingsMap } from 'screens/Settings/DefaultSettings'

const SettingsScreen = () => {
  return (
    <Page>
      <SettingsPreview />
      <ScrollView style={SettingsStyles.SettingsContainer}>
      <Row centered>
        <Text>Settings Preview</Text>
      </Row>
      <DynamicSettings />
      </ScrollView>
    </Page>
  )
}
export default SettingsScreen

const SettingsPreview = () => {
  const [ theme ] = useTheme()
  return (
    <View style={[ SettingsStyles.EditorContainer, { borderRadius: theme.style.roundness } ]}>
      <Editor style={{ backgroundColor: Colors.Blue }} html="<div>yo</div>" useContainer={false} disabled />
    </View>
  )

}
const DynamicSettings = () => {
  const settings = useSettings()
  const setSetting = useCallback( ( section:any, path: string ) => ( value: any ) => settings.updateSettings( section, path, value ), [ settings ] )

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
        const settingsValues = settings[ valueSource ]
        return (
          <SettingsSection title={title} subtitle={subtitle} key={`${title}-container`} >
            {!!subsections && Object.entries( subsections ).map( ( [ subKey, { title: subtitle, values: subValues } ] ) => {
              return (
                <SettingsSection subtitle={subtitle} key={`${title}-${subtitle}-container`}> 
                  {subValues.map( subValueKey => createSetting( valueSource, subValueKey, SettingsMap[ subKey ], `${subKey}-${subValueKey}`, settingsValues[ subKey ][ subValueKey ] ) )}
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
    marginLeft: 10
  }
} )
