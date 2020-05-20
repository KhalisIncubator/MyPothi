/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { unicode } from 'anvaad-js';
import {
  TextBlockBase, GurmukhiTextContainer, RomanTextContainer,
} from './text/TextBlock';
import { VishraamText, BaseText } from './text/Text';
import { withContextMenu } from './text/TextMenu';
import { EditCtx } from '../../store/context_stores/Contexts';
import { useValues } from '../../store/StateHooks';
import { RemappedLine, Modification, LineMenuItem } from '../../../types/types';


const LineContext = createContext( null );

export { LineContext };

interface NewProps {
  line: RemappedLine,
  lineMod: Modification,
  entryID: string
  selectedElement?: string,
  isMainLine?: any
}


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

const LineBlock: React.FC<NewProps> = ( { line, isMainLine } ) => {
  const { fontSizes, displayElements, sources } = useValues( 'viewerModel' );

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
  const Pangtee = (
    <TextBlockBase
      isSelected={false}
      isMainLine={isMainLine}
      lineID={id}
    >
      <GurmukhiTextContainer style={{ fontSize: gurmukhi }}>
        <VishraamText
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </GurmukhiTextContainer>
    </TextBlockBase>
  );


  const Transl = (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <RomanTextContainer><BaseText /></RomanTextContainer>
    </TextBlockBase>
  );

  const Teeka = (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <GurmukhiTextContainer><BaseText /></GurmukhiTextContainer>
    </TextBlockBase>
  );
  const Translit = (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <RomanTextContainer>
        <VishraamText
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </RomanTextContainer>
    </TextBlockBase>
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
        const DisplayedNode = display && !!string && TextNode;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <LineContext.Provider value={{ line: string }} key={`${line}-${index}`}>
            <>
              {withContextMenu( DisplayedNode )( menu )}
            </>
            {/* {DisplayedNode} */}
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
