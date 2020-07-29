import React, { ReactNode } from 'react'
import { Text,StyleSheet, View, StyleProp, ViewStyle, Pressable } from 'react-native'
import { useTheme, useIsTablet } from '../../utils/Hooks'
import { useNavigation } from '@react-navigation/native'

interface CardProps {
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
  clickAction?: () => any 
}
const CardContainer: React.FC<CardProps> = ( { style , children, clickAction } ) => {

  const [ theme ] = useTheme()

 const ViewStyle = StyleSheet.flatten( [  
    { borderRadius: theme.style.roundness, backgroundColor: theme.colors.card },
     style,
  ] )

  return (
    <Pressable style={ViewStyle} onPress={clickAction}>
      <View style={CardStyles.container}>
      {children}
        </View>
    </Pressable>
  )

}

interface HomescreenCardProps {
  pothiName: string,
  openedTime: string
}
const HomescreenCard:React.FC<HomescreenCardProps> = ( { pothiName, openedTime } ) => {
  const navigation = useNavigation()
  const [ isTablet ] = useIsTablet()
  const onClick = () => {
    isTablet ?
      navigation.navigate( 'Stack', { screen: 'Pothi', params: { pothiName } } )  
      : navigation.navigate( 'Search', { pothiName } )
  }

  return (
    <CardContainer clickAction={onClick}>
      <View style={HomeCardStyles.view}>
          <Text style={HomeCardStyles.mainText}>{pothiName}</Text>
          <Text style={HomeCardStyles.time}>Last Opened: 0 days ago</Text>
        </View>
    </CardContainer>
  )
}

export { CardContainer, HomescreenCard }

const CardStyles = StyleSheet.create( {
  container: {
    padding: 5
  },

} )

const HomeCardStyles = StyleSheet.create( {
  mainText: {
    alignSelf: 'flex-start',
    fontSize: 20,
    padding: 5,
    paddingBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'gray',
    padding: 5
  },
  view: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  }

} )
