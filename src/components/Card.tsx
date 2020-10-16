import React, { ReactNode } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, Pressable } from 'react-native'

import { useTheme } from 'store/Theme'

interface CardProps extends React.ComponentProps<typeof Pressable> {
  contentContainerStyle?: StyleProp<ViewStyle>,
  pressableStyle?: StyleProp<ViewStyle>,
  children: ReactNode,
  onPress?: () => void,
}
const CardContainer= ( {  pressableStyle, contentContainerStyle , children, onPress, ...restPresableProps }: CardProps ) => {
  const [ theme ] = useTheme()
  const PressableStyle = ( { pressed }: {pressed: boolean} ) =>  [  
    CardStyles.Pressable,
    { borderRadius: theme.style.roundness, backgroundColor: pressed ? 'lightblue' : theme.colors.card, opacity: pressed ? 70: 100 },
     pressableStyle,
  ]
 const ViewStyle = [ CardStyles.View, contentContainerStyle ]
  return (
    <Pressable style={PressableStyle} onPress={onPress} {...restPresableProps}>
      <View style={ViewStyle}>
      {children}
        </View>
    </Pressable>
  )

}

export { CardContainer }
const CardStyles = StyleSheet.create( {
  Pressable: {
    marginVertical: 5
  },
  View: {
    margin: 5,
  }

} )

