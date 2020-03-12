import React, { useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import TextBlock from './TextBlock';
import { EditCtx } from '../../config/app_state/easy-peasy/models';
import { useValues } from '../../config/app_state/hooks';


const LineBlock = (props) => {
  const { fontSizes, displayElements } = useValues("viewerModel");
  const { isEditMode, selectedInfo } = EditCtx.useStoreState(store => { return { ...store } });
  const updatedSelectedInfo = EditCtx.useStoreActions(actions => actions.updatedSelectedInfo);

  const selectedLineID = selectedInfo[0];
  const selectedElement = selectedInfo[1];

  const { Gurbani, Translations, Transliteration, id } = props.line;
  const { gurmukhi, eng, teeka, translit } = fontSizes;
  const { displayEng, displayTeeka, displayTranslit } = displayElements

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

  const textBlockClick = useCallback((selectionVal, element) => {
    if (selectionVal) {
      updatedSelectedInfo([null, null]);
    } else {
      updatedSelectedInfo([id, element]);

    }

  }, [isEditMode, selectedElement, selectedLineID])
  return (
    <View stlye={style.column}>
      <TextBlock
        isSelected={gurmukhiSelection}
        style={{ fontSize: gurmukhi }}
        value={Gurbani.ascii}
        onClick={() => textBlockClick(gurmukhiSelection, 'Pangtee')}
        isPangtee={true} />
      {
        displayEng && !(Translations.English == null || Translations.English == " ") &&
        <TextBlock
          isSelected={translationSelection}
          value={Translations.English}
          onClick={() => textBlockClick(gurmukhiSelection, 'EngTransl')}
          style={{ fontSize: eng }} />
      }
      {
        displayTeeka && Translations.Punjabi.SS !== null &&
        <TextBlock
          isSelected={teekaSelection}
          value={Translations.Punjabi.SS}
          isGurmukhi={true}
          onClick={() => textBlockClick(gurmukhiSelection, 'Teeka')}
          style={{ fontSize: teeka }}
        />
      }
      {
        displayTranslit && Transliteration.English &&
        <TextBlock
          value={Transliteration.English}
          isSelected={translitSelection}
          onClick={() => textBlockClick(gurmukhiSelection, 'Translit')}
          style={{ fontSize: translit }} />
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