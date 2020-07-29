import React, { useRef, useEffect, useMemo } from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { HomescreenCard } from '../components/main/Card'
import { SearchBar } from '../components/SearchComponents'
import { useTheme } from '../utils/Hooks'
import Icon from 'react-native-vector-icons/Feather'
const Homescreen = () => {
  const [ theme ] = useTheme()

  const PothiCreatingRef = useRef( null )

  const createPothi = () => {
    console.log( PothiCreatingRef.current.getValue() )
  }

  const iconStyle = useMemo( () => ( StyleSheet.flatten( [ styles.iconView, { color: 'green' } ] ) ) , [ theme ] )
  return (
    <SafeAreaView style={styles.page}>
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
            rightIcon={<Icon style={iconStyle} name="check" size={25}  />} />
      </View>
      <View style={styles.subheader}>
        <Icon name="book-open" size={30} color={theme.colors.secondary} />
        <Text style={styles.subheaderText}>Pothis</Text>
      </View>
      <HomescreenCard pothiName="Kirtaan" openedTime="12"/>
    </SafeAreaView>
  )
}

export { Homescreen }

const styles = StyleSheet.create( {
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
    margin: 10
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  subheaderText: {
    fontFamily: 'Comfortaa',
    fontSize: 30,
    padding: 5,
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

