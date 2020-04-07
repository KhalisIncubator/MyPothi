/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ScrollView } from 'react-native';
import {
  useTheme, Card, Divider,
} from 'react-native-paper';

import { useValues, useUpdaters } from '../store/StateHooks';

import SettingsCard, { SettingSection, SwitchModifier } from '../components/main/SettingsComponents';

import mapToComponent, {
  ViewerSettings, TextConsts, MenuItems, Dividers, Subheading,
} from '../SettingsConsts';

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
                 <SettingSection text="Dark Theme" subheading={null}>
                   <SwitchModifier value={isDarkMode} updater={updateDarkMode} theme={theme} objKey={null}/>
                 </SettingSection>
              </Card.Content>
            </Card>
          {
            ViewerSettings.map( ( section, index ) => {
              const {
                title, values, updater, type,
              } = section;
              const sections = viewerValues[values];
              const modifier = viewerUpdaters[updater];
              return (
                <SettingsCard theme={theme} title={title}>
                  {
                    Object.entries( sections ).map( ( [ name, value ] ) => {
                      const label = TextConsts[values][name];
                      const menuList = MenuItems[name];
                      const subhead = Subheading[name];
                      const props = {
                        title: label,
                        updater: modifier,
                        objKey: name,
                        list: menuList || null,
                        theme,
                        value,
                      };
                      const component = mapToComponent( type )(
                        props,
                      );
                      return (
                        <>
                        { Dividers.indexOf( name ) !== -1 && <Divider style={{ height: 3 }}/>}
                      <SettingSection text={label} subheading={subhead} >
                        {component}
                    </SettingSection>
                    </>
                      );
                    } )}
                </SettingsCard>
              );
            } )
          }
        </ScrollView>
  );
};
export default SettingsScreen;
