import React, { useContext, useMemo } from 'react';
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
    isEditMode,
    selectedElement,
    selectedLineID,
    updateLineID,
    updateSelectedE,
    removeSelection
  } = EditCtx;
  const { Gurbani, Translations, Transliteration, id } = props.line;

  const gurmukhiSelection = useMemo(() =>
    isEditMode && (selectedLineID === id && selectedElement === 'Pangtee'),
    [isEditMode,
      selectedLineID === id,
      selectedElement === 'Pangtee']
  );
  const translationSelection = useMemo(() =>
    isEditMode && (selectedLineID === id && selectedElement === 'EngTransl'),
    [isEditMode,
      selectedLineID === id,
      selectedElement === 'EngTransl']
  );
  const teekaSelection = useMemo(() =>
    isEditMode && (selectedLineID === id && selectedElement === 'Teeka'),
    [isEditMode,
      selectedLineID === id,
      selectedElement === 'Teeka']
  );
  const translitSelection = useMemo(() =>
    isEditMode && (selectedLineID === id && selectedElement === 'Translit'),
    [isEditMode,
      selectedLineID === id,
      selectedElement === 'Translit']);

  const textBlockClick = (selectionVal, element) => {
    if (selectionVal) {
      removeSelection();
    } else {
      updateLineID(id);
      updateSelectedE(element);
    }

  }
  return (
    <View stlye={style.column}>
      <TextBlock
        isSelected={gurmukhiSelection}
        style={{ fontSize: gurmukhiSize }}
        value={Gurbani.ascii}
        onClick={() => textBlockClick(gurmukhiSelection, 'Pangtee')}
        isPangtee={true} />
      {
        displayEngTransl && !(Translations.English == null || Translations.English == " ") &&
        <TextBlock
          isSelected={translationSelection}
          value={Translations.English}
          onClick={() => textBlockClick(gurmukhiSelection, 'EngTransl')}
          style={{ fontSize: translSize }} />
      }
      {
        displayPunTansl && Translations.Punjabi.SS !== null &&
        <TextBlock
          isSelected={teekaSelection}
          value={Translations.Punjabi.SS}
          isGurmukhi={true}
          onClick={() => textBlockClick(gurmukhiSelection, 'Teeka')}
          style={{ fontSize: translSize }}
        />
      }
      {
        displayTranslit && Transliteration.English &&
        <TextBlock
          value={Transliteration.English}
          isSelected={translitSelection}
          onClick={() => textBlockClick(gurmukhiSelection, 'Translit')}
          style={{ fontSize: translitSize }} />
      }
    </View>
  );
}

const style = StyleSheet.create({
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