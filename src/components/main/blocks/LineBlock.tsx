/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import TextBlock from './TextBlock';
import { EditCtx } from '../../../store/context_stores/Contexts';
import { useValues } from '../../../store/StateHooks';
import { RemappedLine, Modification } from '../../../../types/types';

interface Props {
  line: RemappedLine,
  entryID: string,
  mods: Modification[],
  isMainLine?: any
}
const LineBlock = ( props: Props ) => {
  const { fontSizes, displayElements, sources } = useValues( 'viewerModel' );
  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );
  const updatedSelectedInfo = EditCtx.useStoreActions(
    ( actions ) => actions.updatedSelectedInfo,
  );

  const [ selectedLineID, selectedElement ] = selectedInfo;
  const {
    Gurbani, Translations, Transliteration, id, Vishraams,
  } = props.line;
  const { entryID, mods } = props;
  const {
    gurmukhi, eng, teeka, translit,
  } = fontSizes;
  const {
    displayEng, displayTeeka, displayTranslit, displayVishraams,
  } = displayElements;

  const filteredMod = mods ? mods.filter( ( mod ) => mod.lineID === id ) : [];

  const gurmukhiSelection = useMemo(
    () => isEditMode
            && selectedLineID === id
            && selectedElement === 'Pangtee',
    [ isEditMode, selectedLineID === id, selectedElement === 'Pangtee' ],
  );
  const translationSelection = useMemo(
    () => isEditMode
            && selectedLineID === id
            && selectedElement === 'Eng',
    [ isEditMode, selectedLineID === id, selectedElement === 'Eng' ],
  );
  const teekaSelection = useMemo(
    () => isEditMode && selectedLineID === id && selectedElement === 'Teeka',
    [ isEditMode, selectedLineID === id, selectedElement === 'Teeka' ],
  );
  const translitSelection = useMemo(
    () => isEditMode
            && selectedLineID === id
            && selectedElement === 'Translit',
    [ isEditMode, selectedLineID === id, selectedElement === 'Translit' ],
  );

  const textBlockClick = useCallback(
    ( selectionVal, element ) => {
      if ( selectionVal ) {
        updatedSelectedInfo( [ null, null, null ] );
      } else {
        updatedSelectedInfo( [ id, element, entryID ] );
      }
    },
    [ isEditMode, selectedElement, selectedLineID ],
  );
  return (
    <View style={style.column}>
      <TextBlock
        type="Pangtee"
        lineID={id}

        isMainLine={props.isMainLine}
        vishraams={displayVishraams ? Vishraams : null}
        source={displayVishraams ? sources.vishraamSource : null}
        isSelected={gurmukhiSelection}
        mod={filteredMod.filter( ( mod ) => mod?.element === 'Pangtee' )}
        style={{ fontSize: gurmukhi }}
        value={Gurbani.ascii === '‚' ? Gurbani.unicode : Gurbani.ascii}
        onClick={() => textBlockClick( gurmukhiSelection, 'Pangtee' )}
      />
      {displayEng
                && !(
                  Translations[sources.translationLang] == null || Translations[sources.translationLang] === ' '
                ) && (
                <TextBlock
                  type="Eng"
                  lineID={id}

                  mod={filteredMod.filter( ( mod ) => mod?.element === 'Eng' )}
                  isSelected={translationSelection}
                  value={Translations[sources.translationLang]}
                  onClick={() => textBlockClick( translationSelection, 'Eng' )}
                  style={{ fontSize: eng }}
                />
      )}
      {displayTeeka
            && !( !Translations.Punjabi[sources.teekaSource] || Translations.Punjabi[sources.teekaSource] === ' ' )
              && (
                <TextBlock
                  type="Teeka"
                  lineID={id}
                  mod={filteredMod.filter( ( mod ) => mod?.element === 'Teeka' )}
                  isSelected={teekaSelection}
                  value={Translations.Punjabi[sources.teekaSource]}
                  onClick={() => textBlockClick( teekaSelection, 'Teeka' )}
                  style={{ fontSize: teeka }}
                />
              )}
      {displayTranslit
      && !( Transliteration[sources.translitLang] === '' || !Transliteration[sources.translitLang] )
      && (
      <TextBlock
        type="Translit"
        lineID={id}
        source={displayVishraams ? sources.vishraamSource : null}
        vishraams={Vishraams}
        mod={filteredMod.filter( ( mod ) => mod?.element === 'Translit' )}
        value={Transliteration[sources.translitLang]}
        isSelected={translitSelection}
        onClick={() => textBlockClick( translitSelection, 'Translit' )}
        style={{ fontSize: translit }}
      />
      )}
    </View>
  );
};

const style = StyleSheet.create( {
  column: {
    flexDirection: 'column',
  },
} );
export default LineBlock;
