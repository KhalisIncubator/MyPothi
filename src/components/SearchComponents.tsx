import React, { ReactNode, ReactElement } from 'react'
import { TextInput, View, StyleSheet, StyleProp } from 'react-native'
import { Theme } from '../utils/Themes'
import Icon from 'react-native-vector-icons/Feather'
import { Surface } from 'react-native-paper'


interface SearchBarProps extends React.ComponentPropsWithRef<typeof TextInput> {
  theme: Theme
  icon: string
  placeholder?: string
  onTextChange?: ( input: string ) => void
  textInputStyle?: StyleProp<TextInput>
  iconStyle?: StyleProp<Icon>
  rightIcon?: ReactNode
}

interface SearchBarState {
  inputValue: string
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  static defaultProps = {
    placeholder: 'Search ...'
  }
  constructor( props: SearchBarProps ) {
    super( props )
    this.state = {
      inputValue: '',
    }
  }
  #input: TextInput
  clear = (): void => this.#input?.clear() 
  focus = (): void => this.#input.focus() 
  blur = (): void => this.#input.blur()
  isFocused = (): boolean => this.#input.isFocused()
  getValue = (): string => this.state.inputValue
  updateValue = ( text: string ): void => this.setState( { inputValue: text } )
  ViewStyle = StyleSheet.flatten( [
    SearchBarStyles.view,
    { backgroundColor: this.props.theme.colors.card, borderRadius: this.props.theme.style.roundness }
  ] )

  render(): ReactElement {
    const { 
      rightIcon,
      ...inputProps
    } = this.props
    return (
      <View style={this.ViewStyle}>
        <View style={SearchBarStyles.inputView}>
          <Icon name={this.props.icon} size={25} />
          <TextInput  
            accessibilityRole="search"
            onChangeText={this.updateValue} 
            style={SearchBarStyles.input}  
            ref={( input ) => {this.#input = input}}  
            placeholder={this.props.placeholder}
            clearButtonMode="while-editing"
            {...inputProps}
          />
        </View>
        {!!this.state.inputValue.length && rightIcon} 
      </View>
    )
  }
}

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

