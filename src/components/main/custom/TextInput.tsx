import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';

const TextInput = ( props ) => {
  const [ cursorVal, updateCursorVal ] = useState( 0 );
  const cursorAnim = useRef( new Animated.Value( 0 ) ).current;
  const { style, value, isActive } = props;

  // const cursorLoop = Animated.loop(
  //   Animated.sequence( [
  //     Animated.timing( cursorAnim, {
  //       toValue: 1,
  //       duration: 400,
  //       useNativeDriver: false,
  //     } ),
  //     Animated.timing( cursorAnim, {
  //       toValue: 0,
  //       duration: 400,
  //       useNativeDriver: false,
  //     } ),
  //   ] ),
  //   { iterations: -1 },
  // );

  const fadeIn = () => ( Animated.timing( cursorAnim, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false,
  } ) );

  const fadeOut = () => (
    Animated.timing( cursorAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    } )
  );

  useEffect( () => {
    cursorAnim.addListener( ( animVal ) => updateCursorVal( animVal.value ) );

    const interval = setInterval( () => {
      if ( cursorVal === 1 ) {
        fadeOut().start();
      } else {
        fadeIn().start();
      }
    }, 450 );

    return () => clearInterval( interval );
  } );
  return (
    <View>
      <Text>
        <Text>{value}</Text>
        {isActive && <Animated.Text style={[ style, { opacity: cursorAnim } ]}>|</Animated.Text>}
      </Text>
    </View>
  );
};

export default TextInput;
