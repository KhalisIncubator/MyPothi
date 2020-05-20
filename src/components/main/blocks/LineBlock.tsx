/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { unicode } from 'anvaad-js';
import {
  TextBlockBase, GurmukhiTextContainer, VishraamText, RomanTextContainer, withContextMenu,
} from './TextBlock';
import { EditCtx } from '../../../store/context_stores/Contexts';
import { useValues } from '../../../store/StateHooks';
import { RemappedLine, Modification, LineMenuItem } from '../../../../types/types';

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
  const Pangtee = withContextMenu(
    <TextBlockBase
      isSelected={false}
      isMainLine={isMainLine}
      lineID={id}
    >
      <GurmukhiTextContainer style={{ fontSize: gurmukhi }}>
        <VishraamText
          line={ascii}
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </GurmukhiTextContainer>
    </TextBlockBase>,
  )( ascii, GurmukhiMenu );


  const Transl = displayEng && !!Translations[sources.translationLang] && (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <RomanTextContainer>{Translations[sources.translationLang]}</RomanTextContainer>
    </TextBlockBase>
  );

  const Teeka = displayTeeka && !!Translations.Punjabi[sources.teekaSource] && (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <GurmukhiTextContainer>{Translations.Punjabi[sources.teekaSource]}</GurmukhiTextContainer>
    </TextBlockBase>
  );
  const Translit = displayTranslit && !!Transliteration[sources.translitLang] && (
    <TextBlockBase
      isSelected={false}
      lineID={id}
    >
      <RomanTextContainer>
        <VishraamText
          line={Transliteration[sources.translitLang]}
          vishraams={displayVishraams ? Vishraams : {}}
          source={sources.vishraamSource}
          lineID={id}
        />
      </RomanTextContainer>
    </TextBlockBase>
  );

  return (
    <View style={style.column}>
      {[ Pangtee, Transl, Teeka, Translit ]}
    </View>
  );
};


export default LineBlock;
const style = StyleSheet.create( {

  column: {
    flexDirection: 'column',
  },
} );
