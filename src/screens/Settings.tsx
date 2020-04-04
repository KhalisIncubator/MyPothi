/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ScrollView, Text } from 'react-native';
import {
  useTheme, Card, Paragraph,
} from 'react-native-paper';

import { useValues, useUpdaters } from '../store/StateHooks';

import SettingsCard, { SettingWithSwitch, SettingWithFonts, SettingWithList } from '../components/main/SettingsComponents';

import { ViewerSettings } from '../Defaults';
import { FontConsts, DisplayConsts } from '../store/StoreConsts';

const mapToComponent = ( type, key, value, updater, theme, menuList ) => {
  switch ( type ) {
    case 'font-size':
      return <SettingWithFonts text={FontConsts[key]} value={value} updater={updater} theme={theme} objKey={key}/>;
    case 'switch':
      return <SettingWithSwitch text={DisplayConsts[key]} value={value} updater={updater} objKey={key} />;
    case 'menu':
      return <SettingWithList values={menuList} current={value} theme={theme} updater={updater} text={key}/>;
    case 'BaniLength':
      return ( <>
      <SettingWithList values={menuList} current={value} theme={theme} updater={updater} text="Bani Length" isBani/>
      <Paragraph>If you have previously added banis, please remove and then add again</Paragraph>
      </> );
    default:
  }
  return <Text>Mope</Text>;
};
const SettingsScreen = ( ) => {
  const theme = useTheme();

  const viewerValues = useValues( 'viewerModel' );
  const viewerUpdaters = useUpdaters( 'viewerModel' );
  const { isDarkMode } = useValues( 'themeModel' );
  const { updateDarkMode } = useUpdaters( 'themeModel' );

  return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} >
          <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Theme" />
              <Card.Content>
                <SettingWithSwitch text="Dark Theme" value={isDarkMode} updater={() => updateDarkMode()} objKey={null}/>
              </Card.Content>
            </Card>
            {
              ViewerSettings.map( ( {
                title, values, type, updater, menuValues,
              }, index ) => {
                const modelVals = viewerValues[values];
                const storeUpdater = viewerUpdaters[updater];
                return (
                <SettingsCard title={title} theme={theme}>
                  {
                    title !== 'Banis'
                      ? Object.entries( modelVals ).map( ( [ key, value ] ) => mapToComponent( type, key, value, storeUpdater, theme, menuValues ) )
                      : mapToComponent( 'BaniLength', 'Length', modelVals, storeUpdater, theme, menuValues )
                  }
                </SettingsCard>
                );
              } )
            }
        </ScrollView>
  );
};
/*
<Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Font Size" />
              <Card.Content>
                  <View>
                    <SettingWithFonts
                      theme={theme}
                      text="Gurmukhi Font"
                      value={fontSizes.gurmukhi}
                      positiveUpdater={() => updateFontSize( [ 'gurmukhi', fontSizes.gurmukhi + 1 ] ) }
                      negativeUpdater={() => updateFontSize( [ 'gurmukhi', fontSizes.gurmukhi - 1 ] ) }
                    />
                    <SettingWithFonts
                      theme={theme} text="English Font"
                      value={fontSizes.eng}
                      positiveUpdater={() => updateFontSize( [ 'eng', fontSizes.eng + 1 ] ) }
                      negativeUpdater={() => updateFontSize( [ 'eng', fontSizes.eng - 1 ] ) }
                    />
                    <SettingWithFonts
                      theme={theme}
                      text="Teeka Font"
                      value={fontSizes.teeka}
                      positiveUpdater={() => updateFontSize( [ 'teeka', fontSizes.teeka + 1 ] ) }
                      negativeUpdater={() => updateFontSize( [ 'teeka', fontSizes.teeka - 1 ] ) }
                    />
                    <SettingWithFonts
                      theme={theme}
                      text="Transliteration Font"
                      value={fontSizes.translit}
                      positiveUpdater={() => updateFontSize( [ 'translit', fontSizes.translit + 1 ] ) }
                      negativeUpdater={() => updateFontSize( [ 'translit', fontSizes.translit - 1 ] ) }
                    />
                    </View>
              </Card.Content>
            </Card>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Display" />
              <Card.Content>
                <View>
                      <SettingWithSwitch text="English" value={displayElements.displayEng} updater={() => toggleElement( 'displayEng' )} />
                      <SettingWithSwitch text="Teeka" value={displayElements.displayTeeka} updater={() => toggleElement( 'displayTeeka' )} />
                      <SettingWithSwitch text="Translit" value={displayElements.displayTranslit} updater={() => toggleElement( 'displayTranslit' )} />
                </View>
                <Divider />
                <View>
                  <SettingWithList text="Bani Length*" values={baniLengths} current={baniLength} updater={updateLength} theme={theme}/>
                  <Paragraph>*If you have any banis currently added, please remove and re-add</Paragraph>
                </View>
              </Card.Content>
            </Card>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Sources" />
              <Card.Content>
                <SettingWithSwitch text="Dark Theme" value={isDarkMode} updater={() => updateDarkMode()} />
              </Card.Content>
            </Card> */
export default SettingsScreen;
