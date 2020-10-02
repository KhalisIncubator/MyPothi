import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Page } from '../components/Page'
import { Colors } from '../utils/Themes'
import { Editor } from '../components/Editor'
import { useTheme } from '../store/Theme'
import { Text } from '../components/Text'
import { Row, Column } from '../components/View'
import { SettingsComponentMap, SettingsSection, Setting } from '../components/SettingsComponents'
import { SettingsMap, SectionsMap } from '../utils/SettingsMap'
import { useSettings } from '../store/Settings'

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
  const updateSetting = ( section: any ) => ( key: string, value: any ) => settings.updateSettings( section, key, value )

  const generateSettings = (): JSX.Element[] => Object.entries( SectionsMap ).map( ( [ mapKey, mapInfo ] ) => {
     
    const { title,valueSource } = mapInfo
    // @ts-expect-error this is due to Object.entries returning key typeof as string
    const sectionInfo = SettingsMap[ mapKey ]
    // @ts-expect-error
    const settingValues = settings[ mapKey ]
    return (
    <SettingsSection key={title} title={title}>
      {
        Object.entries( sectionInfo ).map( ( [ settingKey, settingInfo ] )=> {
           const settingValue = settingValues[ settingKey ]
           const { title: settingTitle, type, pickerValues }: any = settingInfo

           if( !!settingValue ) {
            const Component = SettingsComponentMap[ type ]

            return <Setting key={`${settingKey}-${settingValue} ${settingTitle}`} title={settingTitle} modifier={<Component key={`${settingTitle}-${settingKey}`} settingKey={settingKey} update={updateSetting( valueSource )} initialvalue={settingValue} pickerOptions={pickerValues}/>}/>
           }
        } )
      } 
    </SettingsSection>
    )
  } )
  
  return (
    <>
    {generateSettings()}
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
// Object.entries( settingValues ).map( ( [ settingKey, settingValue ], settingIdx ) => {
//   if ( typeof settingValue === 'object' ) {
//   // // map to record of string and boolean since this is displaySettings
//     return (
//       <Column key={`${settingKey}-column`}>
//         <Text key={settingKey}>{settingKey[ 0 ].toUpperCase().concat( settingKey.slice( 1 ) )}</Text> 
//           { Object.entries( settingValue as Record<string, boolean> ).map( ( [ subKey, subValue ], subIdx ) => {
//             const { title: settingTitle, type }: {title: string, type: keyof typeof SettingsComponentMap} = sectionInfo[ subKey ]
//             const Component = SettingsComponentMap[ type ]

//             return <Setting key={`${subIdx} ${settingKey}-${subKey}-${subValue} ${settingTitle}`} title={settingTitle} modifier={<Component key={`${settingTitle}-${subKey}`} settingKey={subKey} update={updateSetting( valueSource )} initialvalue={subValue} />}/>

//         } )}
//   </Column> )
// } else {
//   const { title: settingTitle, type, pickerValues }: {title: string, type: keyof typeof SettingsComponentMap, pickerValues: string[]} = sectionInfo[ settingKey ]
//     const Component = SettingsComponentMap[ type ]

//     return <Setting key={`${settingIdx} ${settingKey}-${settingValue} ${settingTitle}`} title={settingTitle} modifier={<Component key={`${settingTitle}-${settingKey}`} settingKey={settingKey} update={updateSetting( valueSource )} initialvalue={settingValue} pickerOptions={pickerValues}/>}/>

// }