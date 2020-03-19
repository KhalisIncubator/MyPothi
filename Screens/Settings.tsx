import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  useTheme, Card,
} from 'react-native-paper';
import { useValues, useUpdaters } from '../app_config/app_state/state_hooks';
import SettingWithSwitch, { SettingWithFonts } from '../Components/Main/SettingsComponents';


const SettingsScreen = ( ) => {
  const theme = useTheme();

  const { fontSizes, displayElements } = useValues( 'viewerModel' );
  const { updateFontSize, updateDisplayElement } = useUpdaters( 'viewerModel' );
  const { isDarkMode } = useValues( 'themeModel' );
  const { updateDarkMode } = useUpdaters( 'themeModel' );

  const toggleElement = useCallback( ( element: string ) => { updateDisplayElement( element ); }, [
    displayElements.displayEng,
    displayElements.displayTeeka,
    displayElements.displayTranslit,

  ] );
  return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }} >
          <View>
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
              </Card.Content>
            </Card>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Theme" />
              <Card.Content>
                <SettingWithSwitch text="Dark Theme" value={isDarkMode} updater={() => updateDarkMode()} />
              </Card.Content>
            </Card>
          </View>
        </View>
  );
};
export default SettingsScreen;
