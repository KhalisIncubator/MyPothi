import React, { useCallback, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { ViewerContext } from '../../contexts/Contexts';
import { remapLine } from '../../config/database/database';

const LineBlock = (props) => {
  const ViewerCtx = useContext(ViewerContext);
  const { gurmukhiSize, displayEngTransl, displayPunTansl, displayTranslit } = ViewerCtx;
  const { Gurmukhi, English, Punjabi, Transliteration } = props.line;
  return (
    <View style={style.View}>
      <View stlye={style.column}>
        <Text style={[style.Gurmukhi, style.text, { fontSize: gurmukhiSize }]}>{Gurmukhi}</Text>
        {
          displayEngTransl &&
          <Text style={[style.Translation, style.text, { fontSize: ViewerCtx.translationSize }]}>{English}</Text>
        }
        {
          displayPunTansl &&
          <Text style={[style.PunjabiTranslation, style.text, { fontSize: ViewerCtx.translationSize }]}>{Punjabi}</Text>
        }
        {
          displayTranslit &&
          <Text style={[style.Translation, style.text, { fontSize: ViewerCtx.translationSize }]}>{Transliteration.English}</Text>
        }
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 5,
  },
  column: {
    flexDirection: 'column',
  },
  Gurmukhi: {
    marginVertical: 8,
    fontWeight: "400",
    fontFamily: "AnmolLipiTrue",
  },
  Translation: {
    marginVertical: 3,
    fontWeight: "200",
  },
  PunjabiTranslation: {
    marginVertical: 3,
    fontWeight: "200",
    fontFamily: "AnmolLipiTrue",
  },
  Translit: {
    marginVertical: 3,
    fontWeight: "200",
  }
})
export default LineBlock;