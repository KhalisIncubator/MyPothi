import React, { ReactNode, useState, useRef, useImperativeHandle, forwardRef, useMemo } from 'react'
import { TextInput, View, StyleSheet, StyleProp } from 'react-native'
import { Colors, Theme } from 'utils/Themes'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from 'store/Theme'
import { Text } from 'components/Text'
import { SourceColors } from 'utils/Themes'
import { CardContainer } from 'components/Card'
import { Row } from 'components/View'

interface SearchBarProps extends React.ComponentPropsWithRef<typeof TextInput> {
  theme: Theme
  icon: string
  textInputStyle?: StyleProp<TextInput>
  iconStyle?: StyleProp<Icon>
  rightIcon?: ReactNode
}

const FunctionalSearchbar = ( props: SearchBarProps, ref ) => {
  const { placeholder, rightIcon, ...restInputProps } = props
  const [ theme ] = useTheme()
  const inputRef = useRef<TextInput>()
  const [ inputValue, setValue ] = useState( placeholder ?? '' )

  useImperativeHandle( ref, () => ( {
    clear: () => inputRef?.current?.clear(),
    focus: () => inputRef?.current?.focus(),
    blur: () => inputRef?.current?.blur(),
    isFocused: inputRef?.current?.isFocused(),
    getValue: () => inputValue,
    updateValue: ( text: string ) => setValue( text )
  } ) )

  return (
      <View style={[
          SearchBarStyles.view,
          { backgroundColor: theme.colors.card, borderRadius: theme.style.roundness }
      ]}>
        <View style={SearchBarStyles.inputView}>
          <Icon name={props.icon} size={25} />
          <TextInput  
            accessibilityRole="search"
            onChangeText={setValue} 
            style={SearchBarStyles.input}  
            ref={inputRef}  
            placeholder={placeholder}
            clearButtonMode="while-editing"
            {...restInputProps}
          />
        </View>
        {!!inputValue.length && rightIcon} 
      </View>
  )
}

const SearchBar = forwardRef( FunctionalSearchbar )

export { SearchBar }
const SearchBarStyles = StyleSheet.create( {
  input: {
    flex: 2,
    fontFamily: 'Comfortaa',
    fontSize: 20 ,
    marginHorizontal: 10
  },
  inputView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flex: 3
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 20
  }
} )

const Tags = ( { info } ) => {
    const { raag, writer, source } = info
    const [ theme ] = useTheme()
  
    const subtitle = useMemo( () => [
      // bhai gurdaas ji vaaran edge case
      { value:  raag !== ' -' ? raag : null, color: theme.colors.primary },  
      { value: writer, color: theme.colors.secondary },
      { value: source, color: SourceColors[ source as keyof typeof SourceColors ] }
    ], [ raag, source, writer, theme ] )
    return (
      <>
        {subtitle.map( ( { value, color }: {value: string, color: string} ) => value && (
          <View style={TagStyles.TagView} key={value}>
            <Text style={[ TagStyles.Tag, { color } ]}>
              {value}
            </Text>
          </View>
        ) )}
      </>
    )
  }

const TagStyles = StyleSheet.create( {
  Tag: {
    backgroundColor: Colors.White,
    borderRadius: 6,
    fontFamily: 'OpenGurbaniAkhar',
    overflow: 'hidden',
    paddingVertical: 2,
  },
  TagView: {
    marginHorizontal: 8
  }
} )
const SearchCard = ( { result: [ info, value ] } ) => {
  return (
    <CardContainer>
      <View style={CardStyles.Content}>
        <Text style={CardStyles.Title}>{value.verse.gurmukhi}</Text>
      </View>
      <Row spaceEvenly>
        <Tags info={info} />
      </Row>
    </CardContainer>
  ) 
}

export { SearchCard }
const CardStyles = StyleSheet.create( { Content: {
    padding: 5
  },
  Title: {
    fontFamily: 'OpenGurbaniAkhar',
    fontSize: 20,
    textAlign: 'center'
  } } )