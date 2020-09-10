import React, { ReactNode, ReactElement } from 'react'
import { Text,StyleSheet, View, StyleProp, ViewStyle, Pressable } from 'react-native'
import { useTheme, useIsTablet } from '../utils/Hooks'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

interface CardProps {
  containerStyle?: StyleProp<ViewStyle>,
  pressableStyle?: StyleProp<ViewStyle>,
  children: ReactNode,
  onPress?: () => void 
}
const CardContainer: React.FC<CardProps> = ( {  pressableStyle, containerStyle , children, onPress } ) => {

  const [ theme ] = useTheme()

  const PressableStyle = ( { pressed } ) =>  StyleSheet.flatten( [  
    CardStyles.Pressable,
    { borderRadius: theme.style.roundness, backgroundColor: pressed ? 'lightblue' : theme.colors.card, opacity: pressed ? 70: 100 },
     pressableStyle,
  ] )
  
 const ViewStyle = StyleSheet.flatten( [ CardStyles.View, containerStyle ] )

  return (
    <Pressable style={PressableStyle} onPress={onPress}>
      <View style={ViewStyle}>
      {children}
        </View>
    </Pressable>
  )

}

interface HomescreenCardProps {
  pothiName: string,
  openedTime?: string,
  rightIcon?: ReactElement
}
const HomescreenCard:React.FC<HomescreenCardProps> = ( { pothiName, openedTime, rightIcon } ) => {
  const navigation = useNavigation()
  const onPress = () => {
       navigation.navigate( 'Pothi', { pothiName } )
  }

  return (
    <CardContainer onPress={onPress}>
      <View style={HomeCardStyles.view}>
          <Text style={HomeCardStyles.mainText}>{pothiName}</Text>
          {openedTime &&<Text style={HomeCardStyles.time}>Last Opened: 0 days ago</Text>}
          {rightIcon}
        </View>
    </CardContainer>
  )
}

interface IconCardProps {
  iconName: string,
  iconSize: number,
  iconSubtitle: string,
  onPress: ( ...args: any[] ) => any
}
const IconCard: React.FC<IconCardProps> = ( { iconName, onPress, iconSize, iconSubtitle } ) => {
  const containerSize = iconSize * 2 
  const containerStyle = StyleSheet.flatten( [ IconCardStyle.Container, { width: containerSize, height: containerSize } ] )
 return (
   <CardContainer pressableStyle={containerStyle} onPress={onPress}>
     <View style={IconCardStyle.MainItems} >
     <Icon name={iconName} size={iconSize} />
     <Text>{iconSubtitle}</Text>
   </View>
     </CardContainer>
 ) 
}
export { CardContainer, HomescreenCard, IconCard }

interface SearchCardProps {
  title: string
}
const SearchCard: React.FC<SearchCardProps> = ( { title } ) => {
  return (
    <CardContainer>
      <View>
        <Text style={SearchCardStyles.Text}>{title}</Text>
      </View>
      </CardContainer>
  ) 
}

export { SearchCard }
const SearchCardStyles = StyleSheet.create( {
  Text: {
    fontFamily: 'OpenGurbaniAkhar',
    fontSize: 30
  }
} )
const CardStyles = StyleSheet.create( {
  Pressable: {
    marginVertical: 5
  },
  View: {
    margin: 5,
  }

} )
const IconCardStyle = StyleSheet.create( {
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainItems: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
} )

const HomeCardStyles = StyleSheet.create( {
  mainText: {
    alignSelf: 'flex-start',
    fontSize: 20,
    padding: 5,
    paddingBottom: 20,
    fontFamily: 'Comfortaa'
  },
  time: {
    alignSelf: 'flex-end',
    color: 'gray',
    fontFamily: 'Comfortaa',
    padding: 5
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'
  }

} )
