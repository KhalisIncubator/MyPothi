import React, { ReactNode } from 'react'
import { StyleSheet, Button } from 'react-native'
import RoundedCheckbox from "react-native-rounded-checkbox"
import Icon from 'react-native-vector-icons/Feather'
import { useActionSheet } from '@expo/react-native-action-sheet'

import { useTheme } from '../store/Theme'
import { Text, Title } from './Text'
import { Column, Row } from './View'
import { useToggle } from '../utils/Hooks'

const Checkbox = () => {
  const [ theme ] = useTheme()
  const [ isChecked, updateChecked ] = useToggle()
  
  return <RoundedCheckbox 
             checkedColor={theme.colors.orange}
             outerSize={25}
             innerSize={20}
             isChecked={isChecked} 
             onPress={updateChecked}
             component={<Icon name="check" />}
             />  
}

const Picker = () => {
  const { showActionSheetWithOptions } = useActionSheet()
  return <Button onPress={() => {
    showActionSheetWithOptions( { options: [ 'cancel', 'nope' ], cancelButtonIndex: 0 }, ( buttonIndex ) => {
      console.log( buttonIndex )
    } )
  }}title={'test'}/>
}

const Stepper = () => {
 const [ theme ] = useTheme()
 return (
  <Row>
    <Icon name="minus" size={25}/>
    <Icon name="plus" size={25}/>
  </Row> 
 )
} 

type SettingProps = {
  title: string,
  modifier: ReactNode,
}

const Setting = ( { title, modifier }: SettingProps ) => {
  return (
    <Row spaceBetween>
      <Text>{title}</Text>
      {modifier}
    </Row>
  )
}

const SettingsSection = ( { title, children }: {title: string, children: ReactNode} ) => {
  const [ theme ] = useTheme()
  return (
    <Column style={[ SettingsStyles.SectionContainer, { backgroundColor: theme.colors.card, borderRadius: theme.style.roundness } ]}>
      <Row>
        <Title>{title}</Title>
      </Row>
      <Column>
        {children}
      </Column>
    </Column>
  )
}

const SettingsStyles = StyleSheet.create( {
  SectionContainer: {
    marginVertical: 10,
    padding: 10
  },
} )

const SettingsComponentMap = {
  "stepper": Stepper,
  "picker": Picker,
  "checkbox": Checkbox
}
export { SettingsSection, Setting }