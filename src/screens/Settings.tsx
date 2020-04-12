/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ScrollView } from 'react-native';
import {
  useTheme, Divider,
} from 'react-native-paper';

import { useValues, useUpdaters } from '../store/StateHooks';

import SettingsCard, { SettingSection } from '../components/main/SettingsComponents';

import mapToComponent, { Settings, GlobalConsts } from '../SettingsConsts';

const SettingsScreen = ( ) => {
  const theme = useTheme();

  const viewerValues = useValues( 'viewerModel' );
  const viewerUpdaters = useUpdaters( 'viewerModel' );
  const themeValues = useValues( 'themeModel' );
  const themeUpdaters = useUpdaters( 'themeModel' );
  const vals = {
    viewerValues,
    themeValues,
  };
  const modifiers = {
    viewerUpdaters,
    themeUpdaters,
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {Settings.map( ( { setting, values: valueObj, updaters } ) => setting.map( ( settingSection, index ) => {
        const {
          title, values, updater, type,
        } = settingSection;
        const sections = vals[valueObj][values];
        const modifier = modifiers[updaters][updater];
        return (
          <SettingsCard theme={theme} title={title} key={title}>
            {
                    Object.entries( sections ).map( ( [ settingName, settingValue ] ) => {
                      const configureObject = GlobalConsts[values][settingName];
                      const {
                        title: settingTitle, menu, subheading, separator, parent, parentValue,
                      } = configureObject;
                      const isVisibile = sections[parent] !== undefined ? sections[parent] === parentValue : true;
                      const props = {
                        title: settingTitle,
                        updater: modifier,
                        objKey: settingName,
                        list: menu || null,
                        theme,
                        value: settingValue,
                      };
                      const component = mapToComponent( type )( props );
                      return isVisibile ? (
                        <>
                          { separator && <Divider style={{ height: 3 }} />}
                          <SettingSection text={settingTitle} subheading={subheading}>
                            {component}
                          </SettingSection>
                        </>
                      ) : null;
                    } )
}
          </SettingsCard>
        );
      } ) )}
    </ScrollView>
  );
};
export default SettingsScreen;
