import React, { ReactNode, useState, useRef, useImperativeHandle, forwardRef, useMemo, ForwardRefRenderFunction } from 'react'
import { TextInput, View, StyleSheet, StyleProp, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from 'store/Theme'
import { Picker, Setting } from 'screens/Settings/SettingsComponents'
import { Text, Title } from 'components/Text'
import { SourceColors } from 'utils/Themes'
import { CardContainer } from 'components/Card'
import { Row } from 'components/View'
import Modal from 'react-native-modal'
import { fetchShabad, RemappedQuery, RemappedQueryInfo } from '../../database/BanidbApi'
import { createShabadHTML } from 'utils/GenerateHTML'
import { usePothis } from 'utils/Hooks'
import { Pothi } from 'database/Models '

interface SearchBarProps extends React.ComponentPropsWithRef<typeof TextInput> {
  icon: string
  textInputStyle?: StyleProp<TextInput>
  iconStyle?: StyleProp<Icon>
  rightIcon?: ReactNode
}

type SearchBarHandle = {
  clear: () => void,
  focus: () => void,
  blur: () => void,
  isFocused: boolean | undefined,
  getValue: () => string,
  updateValue: ( next: string ) => void
}

const FuntionalSearchBar: ForwardRefRenderFunction<SearchBarHandle, SearchBarProps> = ( props, ref ) => {
  const { placeholder, rightIcon, style, ...restInputProps } = props
  const [ theme ] = useTheme()
  const inputRef = useRef<TextInput>( null )
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
          style={[ SearchBarStyles.input, { color: theme.colors.text }, style ]}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text}
          clearButtonMode="while-editing"
          {...restInputProps}
        />
      </View>
      {!!inputValue.length && rightIcon}
    </View>
  )
}
const SearchBar = forwardRef( FuntionalSearchBar )
export { SearchBar }
const SearchBarStyles = StyleSheet.create( {
  input: {
    flex: 2,
    fontFamily: 'Comfortaa',
    fontSize: 20,
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

const Tags = ( { info }: {info: RemappedQueryInfo} ) => {
  const { raag, writer, source } = info
  const [ theme ] = useTheme()

  const subtitle = useMemo( () => [
    // bhai gurdaas ji vaaran edge case
    { value: raag !== ' -' ? raag : null, color: theme.colors.primary },
    { value: writer, color: theme.colors.secondary },
    { value: source, color: SourceColors[ source as keyof typeof SourceColors ] }
  ], [ raag, source, writer, theme ] )
  return (
    <>
      {subtitle.map( ( { value, color } ) => value && (
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
    borderRadius: 6,
    fontFamily: 'OpenGurbaniAkhar',
    overflow: 'hidden',
    paddingVertical: 2,
  },
  TagView: {
    marginHorizontal: 8
  }
} )
const SearchCard = ( { result: { verse, info }, onPressed }: {result: RemappedQuery, onPressed: ( ids: [number, number] ) => void} ) => {
  return (
    <CardContainer onPress={() => onPressed( [ verse.id, verse.verseId ] )}>
      <View style={CardStyles.Content}>
        <Text style={CardStyles.Title}>{verse.gurmukhi}</Text>
        {!!verse.translation && <Text numberOfLines={1} style={CardStyles.Subtitle}>{verse.translation}</Text>}
      </View>
      <Row spaceEvenly>
        <Tags info={info} />
      </Row>
    </CardContainer>
  )
}

export { SearchCard }

type PopupProps = {
  isVisible: boolean
  closePopUp: () => void,
  onConfirm: ( pothi: Pothi ) => Promise<void>,
}
const Popup = ( { isVisible, closePopUp, onConfirm }: PopupProps ) => {
  const [ selectedPothi, setSelectedPothi ] = useState( '' )
  const [ theme ] = useTheme()
  const [ pothis ] = usePothis()
  return (

    <Modal isVisible={isVisible} useNativeDriver >
      <View style={[ ModalStyles.modal, { backgroundColor: theme.colors.card, borderRadius: theme.style.roundness } ]}>
        <Title>Pick Pothi</Title>
        <Setting
          modifier={<Picker initialValue={!!selectedPothi ? selectedPothi : ( pothis[ 0 ]?.title ?? 'Loading...' )}
            update={( value ) => {setSelectedPothi( value )}}
            pickerOptions={pothis?.map( pothi => pothi.title )} />}
          title="Selected Pothi"
        />
        <Row verticalCenter spaceEvenly>
          <Button title="Done" onPress={async () => {
            await onConfirm( pothis.find( pothi => pothi.title === selectedPothi ) ?? pothis[ 0 ] )
            closePopUp()
          }} />
          <Button title="Cancel" onPress={closePopUp} />
        </Row>
      </View>
    </Modal>
  )
}

export { Popup }
const ModalStyles = StyleSheet.create( {
  modal: {
    padding: 10
  },
} )
const CardStyles = StyleSheet.create( {
  Content: {
    padding: 5
  },
  Subtitle: {
    textAlign: 'center',

  },
  Title: {
    fontFamily: 'OpenGurbaniAkhar',
    fontSize: 20,
    textAlign: 'center'
  }
} )
