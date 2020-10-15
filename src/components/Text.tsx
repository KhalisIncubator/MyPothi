import React, { ComponentProps } from 'react'
import { Text as NativeText, StyleSheet } from 'react-native'
import { useTheme } from '../store/Theme'

type TextProps = ComponentProps<typeof NativeText> 

// here we use React.FC so that TS recognizes this as a text component 
const Text: React.FC<TextProps> = ( props ) => {
  const [ theme ] = useTheme()
  const { style, ...rest } = props
  return (
    <NativeText {...rest} style={[ TextStyle.Text, { fontSize: theme.text.textSize }, style ]}/>
  )
}
export { Text }


const Title: React.FC<TextProps> = ( props ) => {
  const [ theme ] = useTheme()
  return ( 
    <Text {...props} style={[ TextStyle.title, { fontSize: theme.text.titleSize } ]} />
)
}

const Subtitle: React.FC<TextProps> = ( props ) =>  {
  const [ theme ] = useTheme()
  return ( <Text {...props} style={[ TextStyle.subtitle, { fontSize: theme.text.subheaderSize } ]} /> )

}


const TextStyle = StyleSheet.create( {
  Text: {
    fontFamily: 'Comfortaa',
    fontWeight: '400',
    paddingVertical: 5
  },
  subtitle: {
    fontWeight: '500'
  },
  title: {
    fontWeight: 'bold'
  }

} )

export { Title, Subtitle }
