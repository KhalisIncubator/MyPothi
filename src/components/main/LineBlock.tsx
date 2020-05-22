/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Collection } from 'realm';
import Clipboard from '@react-native-community/clipboard';
import { unicode } from 'anvaad-js';

import { TextView } from './text/TextView';
import { GurmukhiTextContainer, RomanTextContainer } from './text/TextContainer';
import { VishraamText, BaseText } from './text/Text';
import { ContextMenu } from './text/TextMenu';
import { useValues, useEditMode } from '../../store/StateHooks';
import {
  RemappedLine, Modification, LineMenuItem, Element,
} from '../../../types/types';
import { LineContext } from '../../Hooks';


const GurmukhiMenu: LineMenuItem[] = [
  {
    title: 'Copy Unicode',
    action: ( ascii ) => { Clipboard.setString( unicode( ascii ) ); },
  },
  {
    title: 'Copy Ascii',
    action: ( ascii ) => { Clipboard.setString( ascii ); },
  },
];

const RomanMenu: LineMenuItem[] = [
  {
    title: 'Copy (Default)',
    action: ( ascii ) => { Clipboard.setString( ascii ); },
  },
];


const filterMods = ( mods, element ) => mods?.filtered( `element == "${element}"` ) ?? { 0: null };

interface Props {
  line: RemappedLine,
  lineMods: Collection<Modification>,
  onClick: ( element: Element ) => void,
  entryID: string
  selectedElement?: string,
  isMainLine?: any
}

const LineBlock: React.FC<Props> = ( {
  line, isMainLine, selectedElement, lineMods, onClick,
} ) => {
  const { fontSizes, displayElements, sources } = useValues( 'viewerModel' );
  const [ isEditMode ] = useEditMode();

  const {
    gurmukhi, eng, teeka, translit,
  } = fontSizes;
  const {
    displayEng, displayTeeka, displayTranslit, displayVishraams,
  } = displayElements;

  const {
    Gurbani, Translations, Transliteration, id, Vishraams,
  } = line;

  const { ascii } = Gurbani;

  console.log( lineMods );
  const Pangtee = (
    <TextView
      isSelected={selectedElement === 'Pangtee'}
      isMainLine={isMainLine}
      lineID={id}
      onClick={() => onClick( 'Pangtee' )}
    >
      <GurmukhiTextContainer
        style={{ fontSize: gurmukhi }}
        mod={filterMods( lineMods, 'Pangtee' )}
      >
        <VishraamText
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </GurmukhiTextContainer>
    </TextView>
  );


  const Transl = (
    <TextView
      isSelected={selectedElement === 'Eng'}
      lineID={id}
      onClick={() => onClick( 'Eng' )}
    >
      <RomanTextContainer
        style={{ fontSize: eng }}
        mod={filterMods( lineMods, 'Eng' )}
      >
        <BaseText />

      </RomanTextContainer>
    </TextView>
  );

  const Teeka = (
    <TextView
      isSelected={selectedElement === 'Teeka'}
      lineID={id}
      onClick={() => onClick( 'Teeka' )}
    >
      <GurmukhiTextContainer
        style={{ fontSize: teeka }}
        mod={filterMods( lineMods, 'Teeka' )}
      >
        <BaseText />

      </GurmukhiTextContainer>
    </TextView>
  );
  const Translit = (
    <TextView
      isSelected={selectedElement === 'Translit'}
      lineID={id}
      onClick={() => onClick( 'Translit' )}
    >
      <RomanTextContainer
        style={{ fontSize: translit }}
        mod={filterMods( lineMods, 'Translit' )}
      >
        <VishraamText
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </RomanTextContainer>
    </TextView>
  );

  const TextNodes: any[][] = [
    [ Pangtee, [ true, ascii, GurmukhiMenu ] ],
    [ Transl, [ displayEng, Translations[sources.translationLang], RomanMenu ] ],
    [ Teeka, [ displayTeeka, Translations.Punjabi[sources.teekaSource], GurmukhiMenu ] ],
    [ Translit, [ displayTranslit, Transliteration[sources.translitLang], RomanMenu ] ],
  ];
  return (
    <View style={style.column} key={`LineBlock-${id}-${ascii}`}>
      {TextNodes.map( ( [ TextNode, [ display, string, menu ] ], index ) => {
        const DisplayedNode = display && !!string && (
          !isEditMode ? (
            <ContextMenu menu={menu}>
              {TextNode}
            </ContextMenu>
          )
            : TextNode
        );
        return (
          // eslint-disable-next-line react/no-array-index-key
          <LineContext.Provider value={{ line: string }} key={`${line}-${index}`}>
            {DisplayedNode}
          </LineContext.Provider>
        );
      } )}
    </View>
  );
};


export default LineBlock;
const style = StyleSheet.create( {

  column: {
    flexDirection: 'column',
  },
} );
