/* eslint-disable react/display-name */
import 'react-native-gesture-handler'

import React, {
  Suspense,
} from 'react'
import { View } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

import { MyPothiTheme } from '../types/types'
import { MobileRoutes } from './navigation'
import { ThemeProvider } from './store/Theme'

const theme: MyPothiTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    backdrop: '#FFA500',
    background: '#e7e7e7',
    surface: '#c6cfd4',
    text: '#000',
    notification: '#e7e7e7',
  },
  customTypes: {
    lineHighlight: '#c6cfd4',
  },
}

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#2C2F33',
    backdrop: '#FFA500',
    text: '#FFFFFF',
    notification: '#2C2F33',
    customType: {
      lineHighlight: '#52555a',
    },


  },
}

const trueDark = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0089BF',
    accent: '#99AAB5',
    surface: '#99AAB5',
    background: '#000000',
    backdrop: '#FFA500',
    text: '#FFFFFF',
    notification: '#2C2F33',
    customType: {
      lineHightlight: '#2C2F33',
    },
  },
}

const App = () => {
  return (
    <ThemeProvider>
    <PaperProvider
      theme={theme}
      settings={{
        icon: ( props ) => <Icon {...props} />,
      }}
    >
        <MobileRoutes />
    </PaperProvider>
  </ThemeProvider>
  )
}
export default App
