import React, { useState, useContext } from 'react';

import { TouchableHighlight, Text } from 'react-native';
import { Menu } from 'react-native-paper';
import { useMPTheme, useLine } from '../../../Hooks';
import { LineContext } from '../LineBlock';

const withContextMenu = ( children ) => ( menu ) => {
  const theme = useMPTheme();
  // const line = useLine();
  const LineCtx = useContext( LineContext );
  const [ isVisible, updateVisible ] = useState( false );
  console.log( children, LineCtx );

  const toggleVis = () => {
    updateVisible( ( prev ) => !prev );
  };
  return (
    <Menu
      visible={isVisible}
      onDismiss={toggleVis}
      anchor={(
        <TouchableHighlight onLongPress={toggleVis} underlayColor={theme.customTypes?.lineHighlight}>
          <Text>Hi</Text>
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

export { withContextMenu };
