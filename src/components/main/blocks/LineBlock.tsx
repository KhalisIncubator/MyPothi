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
}
const LineBlock = ( props: Props ) => {
  const { fontSizes, displayElements } = useValues( 'viewerModel' );
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
  const { displayEng, displayTeeka, displayTranslit } = displayElements;

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
                vishraams={Vishraams}
                isSelected={gurmukhiSelection}
                mods={filteredMod}
                style={{ fontSize: gurmukhi }}
                value={Gurbani.ascii === '‚' ? Gurbani.unicode : Gurbani.ascii}
                onClick={() => textBlockClick( gurmukhiSelection, 'Pangtee' )}
                isPangtee
            />
             {displayEng
                && !(
                  Translations.English == null || Translations.English === ' '
                ) && (
                    <TextBlock
                        type="Eng"
                        mods={filteredMod}
                        isSelected={translationSelection}
                        value={Translations.English}
                        onClick={() => textBlockClick( translationSelection, 'Eng' )
                        }
                        style={{ fontSize: eng }}
                    />
             )}
            {displayTeeka
            && !( !Translations.Punjabi.SS || Translations.Punjabi.SS === ' ' )
              && (
                <TextBlock
                    type="Teeka"
                    mods={filteredMod}
                    isSelected={teekaSelection}
                    value={Translations.Punjabi.SS}
                    isGurmukhi
                    onClick={() => textBlockClick( teekaSelection, 'Teeka' )}
                    style={{ fontSize: teeka }}
                />
              )}
             {displayTranslit && !( Transliteration.English === '' || !Transliteration.English ) && (
                <TextBlock
                    type="Translit"
                    mods={filteredMod}
                    value={Transliteration.English}
                    isSelected={translitSelection}
                    onClick={() => textBlockClick( translitSelection, 'Translit' )
                    }
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
