import React from 'react';
import {
  FlatList, SafeAreaView, View,
} from 'react-native';
import ShabadBlock from './ShabadBlock';
import LineBlock from './LineBlock';
import mapToArray from '../../Functions';

const Viewer = ( props ) => {
  const {
    currentItems, currentMods, currentLines,
  } = props;

  const renderItem = ( { item, index } ) => (
    <ShabadBlock item={item} index={index} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={currentLines}
        extraData={currentMods}
        initialNumToRender={currentLines[0]?.length < 101 ? 1 : undefined}
        keyExtractor={( item, index ) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{
            width: '100%',
            backgroundColor: '#3498db',
            height: 3,
          }}
          />
        )}
      />
    </SafeAreaView>
  );
};


export default Viewer;
