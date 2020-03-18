import React from 'react';
import { View } from 'react-native';
import {
  useTheme, Switch, Text, Card, Subheading, Button, Paragraph,
} from 'react-native-paper';
import { useValues, useUpdaters } from '../app_config/app_state/state_hooks';


const SettingsScreen = ( { navigation } ) => {
  const theme = useTheme();

  const { fontSizes, displayElements } = useValues( 'viewerModel' );
  const { updateFontSize, updateDisplayElement } = useUpdaters( 'viewerModel' );

  const { isDarkMode } = useValues( 'themeModel' );
  const { updateDarkMode } = useUpdaters( 'themeModel' );
  return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }} >
          <View>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Font Size" />
              <Card.Content>
                  <View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                       <View style={{
                         alignSelf: 'flex-start',
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                       }}>
                        <Subheading style={{ paddingRight: 10 }}>Gurmukhi Font</Subheading>
                        <Paragraph>{fontSizes.gurmukhi}</Paragraph>
                      </View>
                      <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                            mode="contained"
                            icon="plus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'gurmukhi', fontSizes.gurmukhi + 1 ] ); }} compact>
                              {}
                              </Button>
                            <Button
                            mode="contained"
                            icon="minus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'gurmukhi', fontSizes.gurmukhi - 1 ] ); }}
                            compact>
                              {}</Button>
                            </View>
                      </View>
                    </View>

                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                       <View style={{
                         alignSelf: 'flex-start',
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                       }}>
                        <Subheading style={{ paddingRight: 10 }}>English Font</Subheading>
                        <Paragraph>{fontSizes.eng}</Paragraph>
                      </View>
                      <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                            mode="contained"
                            icon="plus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'eng', fontSizes.eng + 1 ] ); }} compact>
                              {}
                              </Button>
                            <Button
                            mode="contained"
                            icon="minus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'eng', fontSizes.eng - 1 ] ); }}
                            compact>
                              {}</Button>
                            </View>
                      </View>
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                       <View style={{
                         alignSelf: 'flex-start',
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                       }}>
                        <Subheading style={{ paddingRight: 10 }}>Teeka Font</Subheading>
                        <Paragraph>{fontSizes.teeka}</Paragraph>
                      </View>
                      <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                            mode="contained"
                            icon="plus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'teeka', fontSizes.teeka + 1 ] ); }} compact>
                              {}
                              </Button>
                            <Button
                            mode="contained"
                            icon="minus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'teeka', fontSizes.teeka - 1 ] ); }}
                            compact>
                              {}</Button>
                            </View>
                      </View>
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                       <View style={{
                         alignSelf: 'flex-start',
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                       }}>
                        <Subheading style={{ paddingRight: 10 }}>Transliteration Font</Subheading>
                        <Paragraph>{fontSizes.translit}</Paragraph>
                      </View>
                      <View style={{ alignSelf: 'flex-end' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                            mode="contained"
                            icon="plus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'translit', fontSizes.translit + 1 ] ); }} compact>
                              {}
                              </Button>
                            <Button
                            mode="contained"
                            icon="minus"
                            color={theme.colors.backdrop}
                            theme={{ roundness: 0 }}
                            onPress={() => { updateFontSize( [ 'translit', fontSizes.translit - 1 ] ); }}
                            compact>
                              {}</Button>
                            </View>
                      </View>
                    </View>
                    </View>
              </Card.Content>
            </Card>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Display" />
              <Card.Content>
                <View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                          <Subheading>English</Subheading>
                          <Switch
                          value={displayElements.displayEng}
                          onValueChange={() => updateDisplayElement( 'displayEng' )}
                          color="lightgreen" />
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                            <Subheading>Teeka</Subheading>
                            <Switch
                            value={displayElements.displayTeeka}
                            onValueChange={() => updateDisplayElement( 'displayTeeka' )}
                            color="lightgreen" />
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 3,
                    }}>
                            <Subheading>Transliteration</Subheading>
                            <Switch
                            value={displayElements.displayTranslit}
                            onValueChange={() => updateDisplayElement( 'displayTranslit' )}
                            color="lightgreen" />
                    </View>
                </View>
              </Card.Content>
            </Card>
            <Card theme={theme} style={{ margin: 5 }}>
              <Card.Title title="Theme" />
              <Card.Content>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
              }}>
                      <Subheading>Dark Theme</Subheading>
                      <Switch
                            value={isDarkMode}
                            onValueChange={() => { updateDarkMode(); } }
                            color="lightgreen" />
                    </View>
              </Card.Content>
            </Card>
          </View>
        </View>
  );
};

export default SettingsScreen;
