import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import LineBlock from './LineBlock';
import mapToArray from '../../app_config/functions';

const Viewer = ( props ) => {
  const {
    currentItems, currentMods, currentLines,
  } = props;


  const renderItem = ( { item, index } ) => {
    const lines = item.map( ( line ) => ( <LineBlock key={line.id} line={line}
    // if currentItems is not length of 0, and if the item at the index has a entryID (need to check because is null when item is deleted and state is
    // uodated). Otherwise if currentItems has length of 0, then set id to null
      entryID={ currentItems[index]?.entryID ?? null}
      mods={mapToArray( currentMods[index] )}/> ) );
    return <View key="Viewer">{lines}</View>;
  };

  return (
    <FlatList
    data={currentLines}
    extraData={currentMods}
    keyExtractor={( item, index ) => index.toString()}
    renderItem={renderItem}
/>
  );
};

export default Viewer;
