import React, { useRef, useState, MutableRefObject } from 'react'
import { View, SafeAreaView, StyleSheet, Text, Keyboard, ScrollView, useWindowDimensions } from 'react-native'
import { HomescreenCard, IconCard } from '../components/Card'
import { SearchBar } from '../components/SearchComponents'
import { useTheme } from '../utils/Hooks'
import Icon from 'react-native-vector-icons/Feather'
import { useValues, useUpdaters } from '../store/StateHooks'
import { useNavigation } from '@react-navigation/native'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

const Homescreen = () => {
  const [ theme ] = useTheme()
  const window = useWindowDimensions()
  const [ pageHeight, updatePageHeight ] = useState( 0 )
  const { pothiNames } = useValues( 'pothiModel' )
  const navigation = useNavigation()
  const PothiCreatingRef= useRef( null )
  const { createPothi } = useUpdaters( 'pothiModel' )
  const makePothi = () => {
    createPothi( PothiCreatingRef.current.getValue() )
    Keyboard.dismiss()
    PothiCreatingRef.current.clear()
  }
  return (
    <ActionSheetProvider>  
    <SafeAreaView style={styles.page} >
      <ScrollView style={styles.page} scrollEnabled={pageHeight > window.height} onContentSizeChange={( screenWidth, screenHeight ) => { updatePageHeight( screenHeight )}}>
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
            icon="book"  
            autoCorrect={false}
            autoCapitalize="none"
          rightIcon={<Icon style={styles.iconView} onPress={makePothi} name="check" size={25} color="green"/>} />
      </View>
      <View style={styles.subsection} >
          <View style={styles.subheader}>
            <Icon name="book-open" size={30} color={theme.colors.orange} />
            <Text style={styles.subheaderText}>Pothis</Text>
          </View>
            {pothiNames.map( ( [ pothi, id ] ) => <HomescreenCard pothiName={pothi} openedTime="12" key={id}/> )}
      </View>
      <View style={styles.subsection} >
          <View style={styles.subheader}>
            <Icon name="command" size={30} color={theme.colors.orange} />
            <Text style={styles.subheaderText}>Actions</Text>
          </View>
        <View style={styles.Row}>
          <IconCard iconName="search" iconSize={40} iconSubtitle="Search" onPress={() => navigation.navigate( 'Search' )} />
          <IconCard iconName="edit-2" iconSize={40} iconSubtitle="Edit" onPress={() => navigation.navigate( 'Edit', { type: 'Pothi' } )} />
            <IconCard iconName="settings" iconSize={40} iconSubtitle="Settings" onPress={() => navigation.navigate( 'Settings' )} />
            <IconCard iconName="help-circle" iconSize={40} iconSubtitle="Help" onPress={() => alert( 'stop that' )} />
        </View>
      </View>
        </ScrollView>
    </SafeAreaView>
  </ActionSheetProvider>
  )
}

export { Homescreen }

const styles = StyleSheet.create( {
  Row: {
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
  page: {
    flex: 1,
    padding: 10
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 2,
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

