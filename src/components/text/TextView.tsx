/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactChild } from 'react'
import {
  StyleSheet, TouchableOpacity,
  View,
} from 'react-native'

import { useMPTheme } from '../../Hooks'
import { useEditMode } from '../../store/StateHooks'

interface BaseProps {
  isSelected: boolean,
  lineID: number,
  onClick?: () => void,
  children: ReactChild,
  isMainLine?: boolean,
}

const TextView: React.FC<BaseProps> = ( {
  isSelected, isMainLine, children, onClick,
} ) => {
  const theme = useMPTheme()
  const [ isEditMode ] = useEditMode()
  const ViewStyle = StyleSheet.flatten( [ styles.View, isMainLine ? theme.customTypes?.lineHighlight : {},
    isSelected ? styles.Selected : {} ] )

  return isEditMode ? (
    <TouchableOpacity style={ViewStyle} onPress={onClick}>
      {children}
    </TouchableOpacity>
  )
    : (
      <View style={ViewStyle}>
        {children}
      </View>
    )
}

export { TextView }
const styles = StyleSheet.create( {

  // #136983
  Selected: {
    borderColor: '#FFA500',
    borderStyle: 'dashed',
    borderWidth: 3,
  },

  View: {
    width: '100%',
  },
} )
