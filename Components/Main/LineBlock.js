import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { ViewerContext } from '../../Contexts/Contexts';

const LineBlock = (props) => {

  const ViewerCtx = useContext(ViewerContext);
  return (
    <View style={style.View}>
      <View stlye={style.column}>
        <Text style={[style.Gurmukhi, { fontSize: ViewerCtx.gurmukhiSize }]}>Hi There</Text>
        <Text style={[style.Translation, { fontSize: ViewerCtx.translationSize }]}>Content and DB coming soon </Text>
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
  },
  Translation: {
    fontWeight: "200",
  },
  Translit: {
    fontWeight: "200",
  }
})
export default LineBlock;