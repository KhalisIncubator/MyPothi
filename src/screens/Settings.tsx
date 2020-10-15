import React, { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Page } from '../components/Page'
import { Colors } from '../utils/Themes'
import { Editor } from '../components/Editor'
import { useTheme } from '../store/Theme'
import { Text, Title } from '../components/Text'
import { Row, Column } from '../components/View'
import { SettingsComponentMap, Setting } from '../components/SettingsComponents'
import { useSettings } from '../store/Settings'
import { SectionMap, SettingsMap } from '../utils/DefaultSettings'

const SettingsScreen = () => {
  const [ theme ] = useTheme()
  return (
    <Page>
      <ScrollView style={[ SettingsStyles.EditorContainer, { borderRadius: theme.style.roundness } ]}>
        <Editor style={{ backgroundColor: Colors.Blue }} html="<div>yo" onHeightChange={() => { console.log( 'hi' )}}/>
      </ScrollView>
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

const DynamicSettings = () => {
  const settings = useSettings()
  const setSetting = useCallback( ( section:any, path: string ) => ( value: any ) => settings.updateSettings( section, path, value ), [ settings ] )
  return (
   <>
    {
      SectionMap.map( section => {
        const { title, valueSource, values, subections, subtitle } = section
        const settingsValues = settings[ valueSource ]
        return (
          <Column key={`${title}-container`}>
            <Title>{title}</Title>
            {!!subtitle && <Title>{subtitle}</Title>}
            
            {!!subections && Object.entries( subections ).map( ( [ subKey, { title: subtitle, values } ] ) => (
              <Column key={`${subtitle}-container`}>
              <Title>{subtitle}</Title>
                {values.map( valueKey => {
                  const { title: settingTitle, type, pickerValues } = SettingsMap[ subKey ][ valueKey ]
                  const Modifier = SettingsComponentMap[ type ]
                  const updater = setSetting( valueSource, `${subKey}-${valueKey}` )
                  return (
                    <Setting 
                      key={`${settingTitle}-${title}-${subKey}-${valueKey} ${settingsValues[ subKey ][ valueKey ]}`}
                      title={settingTitle}
                      modifier={<Modifier  
                                key={`${settingTitle}-${title}-${subKey}-${valueKey} ${settingsValues[ subKey ][ valueKey ]} modifier`}
                                update={updater}  
                                initialValue={settingsValues[ subKey ][ valueKey ]}  
                                pickerOptions={pickerValues} />}
                    />
                  )
                } )}
              </Column>
             ) )}
              {values.map( valueName => {
                const { title: settingTitle, type, pickerValues } = SettingsMap[ valueName ]
                  const Modifier = SettingsComponentMap[ type ]
                  const updater = setSetting( valueSource, `${valueName}` )
                  return (
                    <Setting 
                        key={`${settingTitle}-${title}-${valueName} ${settingsValues[ valueName ]}`}
                        title={settingTitle}
                        modifier={<Modifier  
                                    key={`${settingTitle}-${title}-${valueName} ${settingsValues[ valueName ]} modifier`}
                                    update={updater}  
                                    initialValue={settingsValues[ valueName ] }  
                                    pickerOptions={pickerValues} />} />
                  )
                } )}
          </Column>
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
  }
} )
