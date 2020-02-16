import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { ViewerContext } from '../../contexts/Contexts';
import { remapLine } from '../../config/database/database';

const LineBlock = (props) => {
  const ViewerCtx = useContext(ViewerContext);
  const normalized = remapLine(props.line);
  const { Gurmukhi, English, Punjabi, Transliteration } = normalized;
  const { displayEngTransl, displayPunTansl, displayTranslit } = ViewerCtx;
  return (
    <View style={style.View}>
      <View stlye={style.column}>
        <Text style={[style.Gurmukhi, { fontSize: ViewerCtx.gurmukhiSize }]}>{Gurmukhi}</Text>
        {
          displayEngTransl &&
          <Text style={[style.Translation, { fontSize: ViewerCtx.translationSize }]}>{English}</Text>
        }
        {
          displayPunTansl &&
          <Text style={[style.PunjabiTranslation, { fontSize: ViewerCtx.translationSize }]}>{Punjabi}</Text>
        }
        {
          displayTranslit &&
          <Text style={[style.Translation, { fontSize: ViewerCtx.translationSize }]}>{Transliteration.English}</Text>
        }
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  Gurmukhi: {
    marginVertical: 10,
    fontWeight: "400",
    fontFamily: "AnmolLipiTrue",
  },
  Translation: {
    marginVertical: 5,
    fontWeight: "200",
  },
  PunjabiTranslation: {
    marginVertical: 5,
    fontWeight: "200",
    fontFamily: "AnmolLipiTrue",
  },
  Translit: {
    marginVertical: 5,
    fontWeight: "200",
  }
})
export default LineBlock;