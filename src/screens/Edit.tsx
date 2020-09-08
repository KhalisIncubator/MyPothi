import React, { useState } from 'react'
import {
  KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native'
import {
  Avatar, Card, IconButton, Snackbar, Title,
  useTheme,
} from 'react-native-paper'

import ShabadCard, { generateTags, SourceColors } from '../components/Results'

const Edit = ( { route } ) => {
  const theme = useTheme()

  return (
    <KeyboardAvoidingView style={style.View} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50}>
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create( {
  Card: {
    backgroundColor: 'white',
    margin: 5,
  },
  Snack: {
    alignSelf: 'flex-end',
  },
  View: {
    flex: 1,
    flexDirection: 'column',

  },
} )
export default Edit
