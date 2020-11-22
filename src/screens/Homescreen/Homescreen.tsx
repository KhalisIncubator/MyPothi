import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet, Keyboard, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { HomeSection, IconCard, Subheader, HomescreenCard } from './Components'

import { DynamicScrollView } from 'components/DynamicScrollView'
import { SearchBar } from 'screens/Search/SearchComponents'
import { Text } from 'components/Text'
import { usePothis, useQuery } from 'utils/Hooks'
import { useTheme } from 'store/Theme'
import { Column, Row } from 'components/View'
import { Colors } from 'utils/Themes'

const Homescreen = () => {
  const [ theme ] = useTheme()
  const [ pothis, newPothi, deletePothi, updatePothi ] = usePothis()
  const [ editing, toggleEditing ] = useState( false )

  const navigation = useNavigation()
  const PothiCreatingRef = useRef<any>( null )

  const makePothi = () => {
    newPothi( { title: PothiCreatingRef?.current?.getValue() } )
    Keyboard.dismiss()
    PothiCreatingRef?.current?.clear()
  }
  return (
    <DynamicScrollView>
      <Row horizontalCenter spaceEvenly verticalCenter>
        <Text style={HomeStyles.title}>MyPothi</Text>
        <Column>
          <Text style={HomeStyles.subtitle}>Kirtan</Text>
          <Text style={HomeStyles.subtitle}>Assistant</Text>
        </Column>
      </Row>
      <SearchBar
        ref={PothiCreatingRef}
        placeholder="Create Pothi..."
        icon="book" autoCorrect={false}
        autoCapitalize="none"
        rightIcon={<Icon style={HomeStyles.iconView} onPress={makePothi} name="plus" size={25} color="green" />} />
      <HomeSection header={
        <Subheader
          text="Pothis"
          icon="book-open"
          rightButton={<Button title={editing ? "Done" : "Edit"} onPress={() => toggleEditing( prev => !prev )} />} />
      }>
        {pothis.map( pothi => <HomescreenCard
          updatePothi={updatePothi}
          editing={editing}
          pothi={pothi}
          key={pothi.title}
          rightIcon={editing && <Icon style={HomeStyles.editIcon} size={25} name="minus-circle" onPress={() => deletePothi( pothi.id )} />} /> )}
      </HomeSection>
      <HomeSection header={
        <Subheader
          icon="command"
          text="Actions"
        />
      }>
        <Row spaceBetween>
          <IconCard name="search" size={40} subtitle="Search" onPress={() => navigation.navigate( 'Search' )} />
          <IconCard name="settings" size={40} subtitle="Settings" onPress={() => navigation.navigate( 'Settings' )} />
          <IconCard name="help-circle" size={40} subtitle="Help" onPress={() => console.log( 'stop that' )} />
        </Row>
      </HomeSection>
    </DynamicScrollView>
  )
}
export { Homescreen }


const HomeStyles = StyleSheet.create( {
  editIcon: {
    color: Colors.Red
  },
  iconView: {
    alignSelf: 'flex-end',
  },
  subtitle: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
  },
  title: {
    fontFamily: 'Comfortaa',
    fontSize: 40,
    fontWeight: '500',
    marginVertical: 10,
  }
} )

