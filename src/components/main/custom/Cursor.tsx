import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// TODO: Add animations to native Driver (blocked by loop bug, where use native driver does not work)


const Cursor = ( { style } ) => {
  const cursorAnim = useRef( new Animated.Value( 0 ) ).current;


  useEffect( () => {
    Animated.loop(
      Animated.sequence( [
        Animated.timing( cursorAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        } ),
        Animated.timing( cursorAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        } ),
      ] ),
      { iterations: -1 },
    ).start();
  }, [] );
  return <Animated.Text style={[ style, { opacity: cursorAnim } ]}>|</Animated.Text>;
};

export default Cursor;
