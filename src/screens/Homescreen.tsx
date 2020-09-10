import React, { useRef, useState } from 'react'
import { View,  StyleSheet, Text, Keyboard, Button } from 'react-native'
import { HomescreenCard, IconCard } from '../components/Card'
import { SearchBar } from '../components/SearchComponents'
import { useTheme } from '../utils/Hooks'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { DynamicScrollView } from '../components/DynamicScrollView'

import { useQuery } from '../utils/Hooks'

const Homescreen =  () => {
  const [ theme ] = useTheme()
  const navigation = useNavigation()
  const PothiCreatingRef= useRef( null )
  const [ pothis, newPothi, deletePothi ] = useQuery('pothis')
  const [ editing, toggleEditing ] = useState( false )
  const makePothi = () => {
    newPothi( { title: PothiCreatingRef.current.getValue() } )
    Keyboard.dismiss()
    PothiCreatingRef.current.clear() }
  return (
      <DynamicScrollView>
      <View style={styles.headerView}>
        <Text style={styles.title}>MyPothi</Text>
        <View>
          <Text style={styles.subtitle}>Kirtaan</Text>
          <Text style={styles.subtitle}>Assistant</Text>
        </View>
      </View>
      <View>
        <SearchBar  
            ref={PothiCreatingRef}  
            theme={theme}  
            placeholder="Create Gutka..."  
            icon="book"  autoCorrect={false}
            autoCapitalize="none"
          rightIcon={<Icon style={styles.iconView} onPress={makePothi} name="check" size={25} color="green"/>} />
      </View>
      <View style={styles.subsection} >
          <View style={styles.subheaderRow}>
            <View style={styles.subheader}>
            <Icon name="book-open" size={30} color={theme.colors.orange} />
            <Text style={styles.subheaderText}>Pothis</Text>
            </View>
            <Button title={editing ? "Done" : "Edit"} onPress={() => toggleEditing( prev => !prev )}/>
          </View>
        {pothis.map( pothi => <HomescreenCard pothiName={pothi.title} openedTime={!editing && '1'} key={pothi.title} rightIcon={ editing && <Icon style={{ color: 'red' }} size={25} name="minus-circle" onPress={() => deletePothi( pothi.id )}/>} /> )}
      </View>
      <View style={styles.subsection} >
          <View style={styles.subheader}>
            <Icon name="command" size={30} color={theme.colors.orange} />
            <Text style={styles.subheaderText}>Actions</Text>
          </View>
        <View style={styles.Row}>
          <IconCard iconName="search" iconSize={40} iconSubtitle="Search" onPress={() => navigation.navigate( 'Search' )} />
            <IconCard iconName="settings" iconSize={40} iconSubtitle="Settings" onPress={() => navigation.navigate( 'Settings' )} />
            <IconCard iconName="help-circle" iconSize={40} iconSubtitle="Help" onPress={() => alert( 'stop that' )} />
        </View>
      </View>
      </DynamicScrollView>
  )
} 
export { Homescreen }


const styles = StyleSheet.create( {
  Row: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconView: {
    alignSelf: 'flex-end',
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  subheaderRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subheaderText: {
    fontFamily: 'Comfortaa',
    fontSize: 30,
    padding: 5,
  },
  subsection: {
    paddingVertical: 5
  },
  subtitle: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
  },
  title : {
    fontFamily: 'Comfortaa',
    fontSize: 40,
    fontWeight: '500',
    paddingVertical: 10,
  }
} )

