import React, { useState } from 'react';

import { TouchableHighlight } from 'react-native';
import { Menu } from 'react-native-paper';
import { useMPTheme, useLine } from '../../../Hooks';

const withContextMenu = ( children ) => ( menu ) => {
  const theme = useMPTheme();
  // const line = useLine();
  const [ isVisible, updateVisible ] = useState( false );

  const toggleVis = () => {
    updateVisible( ( prev ) => !prev );
  };
  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVis}
      anchor={(
        <TouchableHighlight onLongPress={toggleVis} underlayColor={theme.customTypes?.lineHighlight}>
          {children}
        </TouchableHighlight>
      )}
    >
      {menu.map( ( { title, action } ) => (
        <Menu.Item
          title={title}
          onPress={() => {
            action( 'line' );
            toggleVis();
          }}
          key={title}
        />
      ) )}
    </Menu>
  );
};


const ContextMenu = ( { menu, children } ) => {
  const theme = useMPTheme();
  const line = useLine();
  const [ isVisible, updateVisible ] = useState( false );

  const toggleVis = () => {
    updateVisible( ( prev ) => !prev );
  };
  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVis}
      anchor={(
        <TouchableHighlight onLongPress={toggleVis} underlayColor={theme.customTypes?.lineHighlight}>
          {children}
        </TouchableHighlight>
      )}
    >
      {menu.map( ( { title, action } ) => (
        <Menu.Item
          title={title}
          onPress={() => {
            action( line );
            toggleVis();
          }}
          key={title}
        />
      ) )}
    </Menu>
  );
};
export { withContextMenu, ContextMenu };
