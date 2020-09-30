import React, { ComponentProps } from 'react'
import { Text as NativeText, StyleSheet  } from 'react-native'
import { useTheme } from '../store/Theme'

type TextProps = ComponentProps<typeof NativeText> 

// here we use React.FC so that TS recognizes this as a text component 
const Text: React.FC<TextProps> = ( props ) => {
  const { style, ...rest } = props
  return (
    <NativeText {...rest} style={[ TextStyle.Text, style ]}/>
  )
}
export { Text }


const Title: React.FC<TextProps> = ( props ) => {
  const [ theme ] = useTheme()
  return ( 
    <Text {...props} style={{ fontSize: theme.style.textSize }} />
  )
}

const TextStyle = StyleSheet.create( {
  Text: {
    fontFamily: 'Comfortaa',
    fontWeight: '400',
    paddingVertical: 5
  }

} )

export { Title }
