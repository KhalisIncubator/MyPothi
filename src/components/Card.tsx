import React, { ReactNode, ReactElement, useMemo, useEffect, useRef, useState } from 'react'
import { Text,StyleSheet, View, StyleProp, ViewStyle, Pressable, TextInput } from 'react-native'
import { useTheme } from '../utils/Hooks'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { SourceColors } from '../utils/Themes'
import { Pothi } from '../database/Models'

interface CardProps extends React.ComponentProps<Pressable> {
  containerStyle?: StyleProp<ViewStyle>,
  pressableStyle?: StyleProp<ViewStyle>,
  children: ReactNode,
  onPress?: () => void,
}
const CardContainer= ( {  pressableStyle, containerStyle , children, onPress, ...restPresableProps }: CardProps ) => {
  const [ theme ] = useTheme()
  const PressableStyle = ( { pressed } ) =>  StyleSheet.flatten( [  
    CardStyles.Pressable,
    { borderRadius: theme.style.roundness, backgroundColor: pressed ? 'lightblue' : theme.colors.card, opacity: pressed ? 70: 100 },
     pressableStyle,
  ] )
 const ViewStyle = StyleSheet.flatten( [ CardStyles.View, containerStyle ] )
  return (
    <Pressable style={PressableStyle} onPress={onPress} {...restPresableProps}>
      <View style={ViewStyle}>
      {children}
        </View>
    </Pressable>
  )

}

interface HomescreenCardProps {
  pothi: Pothi,
  openedTime?: string,
  rightIcon?: ReactElement
  updatePothi: ( pothi: Pothi, fields ) => void,
  editing: boolean,
}
const HomescreenCard = ( { pothi, openedTime, rightIcon, editing, updatePothi }: HomescreenCardProps ) => {
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate( 'Pothi', { pothiName: pothi.title } )
  }
  const textStyles = StyleSheet.flatten( [ HomeCardStyles.mainText, { textDecorationLine: editing ? 'underline' : "none" } ] )
  const [ inputValue, updateInputValue ] = useState( pothi.title )

  useEffect( ()=> {
    if( !editing && pothi.title !== inputValue ) {
      console.log( 'save' )
      updatePothi( pothi, { title: inputValue } )
    }
  }, [ editing, pothi, updatePothi, inputValue ] )
  return (
    <CardContainer onPress={onPress} disabled={editing}>
      <View style={HomeCardStyles.view}>
          <TextInput  
            editable={editing}  
            style={textStyles} 
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={updateInputValue}
         > 
        {inputValue}</TextInput>
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
  result: any
}
const Tags = ( { info } ) => {
  const { raag, writer, source } = info
  const [ theme ] = useTheme()

  const subtitle = useMemo( () => [
    // bhai gurdaas ji vaaran edge case
    { value:  raag !== ' -' ? raag : null, color: theme.colors.primary },  
    { value: writer, color: theme.colors.secondary },
    { value: source, color: SourceColors[ source ] }
  ], [ raag, source, writer, theme ] )
  return (
    <>
      {subtitle.map( ( { value, color } ) => value && (
        <View style={{ paddingHorizontal: 8 }} key={value}>
          <Text style={{
                color,
                fontFamily: 'OpenGurbaniAkhar',
                borderRadius: 6,
                backgroundColor: 'white',
                overflow: 'hidden',
                paddingVertical: 2,
            }}>
            {!!value && value}
          </Text>
        </View>
      ) )}
    </>
  )
}
const SearchCard: React.FC<SearchCardProps> = ( { result: [ info, value ] } ) => {
  return (
    <CardContainer>
      <View style={SearchCardStyles.Content}>
        <Text style={SearchCardStyles.Title}>{value.verse.gurmukhi}</Text>
      </View>
      <View style={SearchCardStyles.Tags}>
        <Tags info={info} />
      </View>
      </CardContainer>
  ) 
}

export { SearchCard }
const SearchCardStyles = StyleSheet.create( {
  Content: {
    padding: 5
  },
  Tags: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  Title: {
    fontFamily: 'OpenGurbaniAkhar',
    fontSize: 20,
    textAlign: 'center'
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
    fontFamily: 'Comfortaa',
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
