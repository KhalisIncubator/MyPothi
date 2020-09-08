/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'

import HighlightSelector from '../components/HighlightSelector'
import ShimmeringLine from '../components/ShimmeringBlock'
import Toolbar from '../components/Toolbar'
import Viewer from '../components/Viewer'
import { parseLines } from '../database/BanidbApi'
import {
  EditCtx,
  FullScreenCtx,
} from '../store/context_stores/Contexts'

const Gutka = () => {
  const theme = useTheme()
  const doubleTapRef = useRef()
  const [ shabads, updateShabads ] = useState( [] )
  const handleTap = ( e ) => {
    if ( e.nativeEvent.state === State.ACTIVE ) {
    }
  }

  return (
    <View>

    </View>
  )
}
const styles = StyleSheet.create( {
  Footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Highlighter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingBottom: 5,
    width: '100%',
  },
  View: {
    alignContent: 'space-between',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
} )

const withEditCtx = () => (
  <EditCtx.Provider>
    <Gutka />
  </EditCtx.Provider>
)
export default withEditCtx
