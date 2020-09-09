import React, { ReactNode } from 'react'
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
  openedTime: string
}
const HomescreenCard:React.FC<HomescreenCardProps> = ( { pothiName, openedTime } ) => {
  const navigation = useNavigation()
  const onPress = () => {
       navigation.navigate( 'Pothi', { pothiName } )
  }

  return (
    <CardContainer onPress={onPress}>
      <View style={HomeCardStyles.view}>
          <Text style={HomeCardStyles.mainText}>{pothiName}</Text>
          <Text style={HomeCardStyles.time}>Last Opened: 0 days ago</Text>
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

const EditCard = ( { subheading, itemsRight, title, icon } ) => {
  return (
    <CardContainer>
        <View style={EditCardStyle.CardContent}>
          <View style={EditCardStyle.CardTitleContainer}>
            <Text style={EditCardStyle.CardTitle}>{title}</Text>
            {subheading}
          </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'auto',
        }}
        >
          {itemsRight}
        </View>
        </View>
      </CardContainer>
  )

}

export { EditCard }
const EditCardStyle = StyleSheet.create( {
  CardContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardTitle: {
    fontFamily: 'OpenGurbaniAkhar',
    padding: 5,
    textAlign: 'center',
  },
  CardTitleContainer: {
    flex: 1,
  },
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
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  }

} )
