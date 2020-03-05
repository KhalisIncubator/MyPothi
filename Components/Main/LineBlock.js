import React, { useContext } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import TextBlock from './TextBlock';
import { ViewerContext, EditContext } from '../../contexts/Contexts';

const LineBlock = (props) => {
  const ViewerCtx = useContext(ViewerContext);
  const EditCtx = useContext(EditContext);
  const {
    gurmukhiSize,
    translSize,
    translitSize,
    displayEngTransl,
    displayPunTansl,
    displayTranslit,
  } = ViewerCtx;
  const {
    isEditMode
  } = EditCtx;
  const { Gurbani, Translations, Transliteration } = props.line;
  return (
    <View style={style.View}>
      <View stlye={style.column}>
        <TextBlock
          isSelectable={isEditMode}
          style={{ fontSize: gurmukhiSize }}
          value={Gurbani.ascii}
          isPangtee={true} />
        {
          displayEngTransl && !(Translations.English == null || Translations.English == " ") &&
          <TextBlock
            isSelectable={isEditMode}
            value={Translations.English}
            style={{ fontSize: translSize }} />
        }
        {
          displayPunTansl && Translations.Punjabi.SS !== null &&
          <TextBlock
            isSelectable={isEditMode}
            value={Translations.Punjabi.SS}
            isGurmukhi={true}
            style={{ fontSize: translSize }}
          />
        }
        {
          displayTranslit && Transliteration.English !== null &&
          <TextBlock
            value={Transliteration.English}
            isSelectable={isEditMode}
            style={{ fontSize: translitSize }} />
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
    marginVertical: 4,
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