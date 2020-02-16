import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { ViewerContext } from '../../contexts/Contexts';

const LineBlock = (props) => {
  const ViewerCtx = useContext(ViewerContext);
  const { Gurmukhi } = props.line;
  return (
    <View style={style.View}>
      <View stlye={style.column}>
        <Text style={[style.Gurmukhi, { fontSize: ViewerCtx.gurmukhiSize }]}>{Gurmukhi}</Text>
        <Text style={[style.Translation, { fontSize: ViewerCtx.translationSize }]}></Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  Gurmukhi: {
    fontWeight: "400",
    fontFamily: "AnmolLipiTrue",
  },
  Translation: {
    fontWeight: "200",
  },
  Translit: {
    fontWeight: "200",
  }
})
export default LineBlock;