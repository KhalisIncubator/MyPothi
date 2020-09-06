import React, { useRef, useCallback, MutableRefObject } from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { HomescreenCard, IconCard } from '../components/main/Card'
import { SearchBar } from '../components/SearchComponents'
import { useTheme } from '../utils/Hooks'
import Icon from 'react-native-vector-icons/Feather'
import { useValues } from '../store/StateHooks'
import { useNavigation } from '@react-navigation/native'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

const Homescreen = () => {
  const [ theme ] = useTheme()
  const { pothiNames } = useValues( 'pothiModel' )
  const navigation = useNavigation()
  const PothiCreatingRef:MutableRefObject<SearchBar> = useRef( null )
  const createPothi = () => {
    console.log( PothiCreatingRef.current.getValue() )
  }
  return (
    <ActionSheetProvider>  
    <SafeAreaView style={styles.page} >
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
          rightIcon={<Icon style={styles.iconView} name="check" size={25} color="green"/>} />
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
            <IconCard iconName="edit-2" iconSize={40} iconSubtitle="Edit" onPress={() => alert( 'stop that' )} />
            <IconCard iconName="settings" iconSize={40} iconSubtitle="Settings" onPress={() => alert( 'stop that' )} />
            <IconCard iconName="help-circle" iconSize={40} iconSubtitle="Help" onPress={() => alert( 'stop that' )} />
        </View>
      </View>
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
    margin: 10,
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

