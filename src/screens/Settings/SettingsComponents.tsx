import React, { ReactNode } from 'react'
import { StyleSheet, Button, StyleProp, ViewStyle } from 'react-native'
import RoundedCheckbox from "react-native-rounded-checkbox"
import Icon from 'react-native-vector-icons/Feather'
import { useActionSheet } from '@expo/react-native-action-sheet'

import { useTheme } from '../../store/Theme'
import { Text, Title } from '../../components/Text'
import { Column, Row } from '../../components/View'
import { useToggle } from '../../utils/Hooks'
import { SettingTypes } from './DefaultSettings'


type SettingsComponentProps = {
  initialValue: any,
  update: ( value: any ) => void
}
const Toggle = ( { initialValue, update }: SettingsComponentProps ) => {
  const [ theme ] = useTheme()
  const [ isChecked, updateChecked ] = useToggle( initialValue )
  const toggle = ( newValue: boolean ) => {
    updateChecked( newValue )
    update( newValue )
  }
  return <RoundedCheckbox
    checkedColor={theme.colors.orange}
    outerSize={30}
    innerSize={25}
    isChecked={isChecked}
    onPress={toggle}
    component={<Icon name="check" />}
  />
}

type PickerProps = SettingsComponentProps & {
  pickerOptions?: string[]
}
const Picker = ( { initialValue, update, pickerOptions }: PickerProps ) => {
  const { showActionSheetWithOptions } = useActionSheet()
  return <Button onPress={() => {
    showActionSheetWithOptions( { options: !!pickerOptions ? [ 'cancel', ...pickerOptions.map( optn => optn.toUpperCase() ) ] : [ 'cancel' ], cancelButtonIndex: 0 }, ( buttonIndex ) => {
      // cancel button
      if ( buttonIndex === 0 ) return
      const newValue = pickerOptions[ buttonIndex - 1 ] ?? []
      !!newValue && update( newValue )
    } )
  }} title={initialValue.toUpperCase()} />
}

const Stepper = ( { update, initialValue }: SettingsComponentProps ) => {
  const [ theme ] = useTheme()
  return (
    <Row>
      <Text>{initialValue}</Text>
      <Icon name="minus" size={25} onPress={() => {
        update( initialValue - 1 )
      }} style={{ color: theme.colors.text }} />
      <Icon name="plus" size={25} onPress={() => update( initialValue + 1 )} style={{ color: theme.colors.text }} />
    </Row>
  )
}

type SettingProps = {
  title: string,
  modifier: ReactNode,
}

const Setting = ( { title, modifier }: SettingProps ) => {
  return (
    <Row spaceBetween verticalCenter style={SettingsStyles.SettingsContainer}>
      <Text>{title}</Text>
      {modifier}
    </Row>
  )
}

type SectionProps = {
  title?: string,
  subtitle?: string,
  children: ReactNode,
  style?: StyleProp<ViewStyle>
}
const SettingsSection = ( { title, subtitle, children, style }: SectionProps ) => {
  return (
    <Column style={[ SettingsStyles.SectionContainer, style ]}>
      <Row>
        <Title style={SettingsStyles.SectionTitle}>{title}</Title>
      </Row>
      <Row>
        {!!subtitle && <Text>{subtitle}</Text>}
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
  SectionTitle: {
    fontSize: 30
  },
  SettingsContainer: {
    marginVertical: 2,
    paddingHorizontal: 15
  }
} )

const SettingsComponentMap = {
  [ SettingTypes.Stepper ]: Stepper,
  [ SettingTypes.Picker ]: Picker,
  [ SettingTypes.Toggle ]: Toggle
}
export { SettingsSection, Setting, SettingsComponentMap, Picker }
