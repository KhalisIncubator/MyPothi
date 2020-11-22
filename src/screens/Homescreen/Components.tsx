/* eslint-disable react-native/no-raw-text */
import React, { ReactNode, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { CardContainer } from 'components/Card'
import { Row, Column } from 'components/View'
import { Text, Title } from 'components/Text'
import { useTheme } from 'store/Theme'
import { Pothi } from 'database/Models '
import { useNavigation } from '@react-navigation/native'
import themes from 'utils/Themes'

type SectionProps = {
  header: ReactNode,
  children: ReactNode
}
const HomeSection = ( { header, children }: SectionProps ) => (
  <Column style={SectionStyles.Main}>
    {header}
    {children}
  </Column>
)
const SectionStyles = StyleSheet.create( {
  Main: {
    marginVertical: 5
  }
} )
export { HomeSection }

type SubheaderProps = {
  icon: string,
  text: string,
  rightButton?: ReactNode
}
const Subheader = ( { icon, text, rightButton }: SubheaderProps ) => {
  const [ theme ] = useTheme()
  return (
    <Row spaceBetween>
      <Row verticalCenter>
        <Icon name={icon} size={30} color={theme.colors.orange} />
        <Title style={SubheaderStyles.Text}>{text}</Title>
      </Row>
      {rightButton}
    </Row>
  )
}

const SubheaderStyles = StyleSheet.create( {
  Text: {
    fontSize: 30,
    margin: 5
  }
} )

export { Subheader }
interface HomescreenCardProps {
  pothi: Pothi,
  rightIcon?: ReactNode | false,
  updatePothi: ( pothi: Pothi, title: string ) => void,
  editing: boolean,
}
const HomescreenCard = ( { pothi, rightIcon, editing, updatePothi }: HomescreenCardProps ) => {
  const [ theme ] = useTheme()
  const navigation = useNavigation()
  const [ inputValue, updateInputValue ] = useState( pothi.title )

  const onPress = () => {
    navigation.navigate( 'Viewer', { pothiName: pothi.title } )
  }
  const textStyles = [ CardStyles.Text, { color: theme.colors.text } ]

  useEffect( () => {
    if ( !editing && pothi.title !== inputValue ) {
      updatePothi( pothi, { title: inputValue } )
    }
  }, [ editing, pothi, updatePothi, inputValue ] )
  return (
    <CardContainer onPress={onPress} disabled={editing}>
      <Row spaceBetween verticalCenter>
        <TextInput
          editable={editing}
          style={textStyles}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={updateInputValue}
        >
          {inputValue}
        </TextInput>
        {rightIcon}
      </Row>
    </CardContainer>
  )
}


const CardStyles = StyleSheet.create( {
  Text: {
    alignSelf: 'flex-start',
    fontSize: 20,
    padding: 5,
    paddingBottom: 20,
    fontFamily: 'Comfortaa'
  }
} )
export { HomescreenCard }

type IconCardProps = {
  name: string,
  size: number,
  subtitle: string,
  onPress: ( ...args: any[] ) => void
}
const IconCard = ( { name, size, subtitle, onPress }: IconCardProps ) => {
  const [ theme ] = useTheme()
  const containerSize = size * 2
  const containerStyle = StyleSheet.flatten( [ IconCardStyles.Container, { width: containerSize, height: containerSize } ] )
  return (
    <CardContainer pressableStyle={containerStyle} onPress={onPress}>
      <Row style={IconCardStyles.MainItems} >
        <Icon name={name} size={size} style={{ color: theme.colors.text }} />
        <Text>{subtitle}</Text>
      </Row>
    </CardContainer>
  )
}

export { IconCard }
const IconCardStyles = StyleSheet.create( {
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
