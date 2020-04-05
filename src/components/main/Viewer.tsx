import React from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import LineBlock from './blocks/LineBlock';
import mapToArray from '../../Functions';

const Viewer = ( props ) => {
  const {
    currentItems, currentMods, currentLines,
  } = props;


  const renderItem = ( { item, index } ) => <FlatList
    data={item}
    keyExtractor={( useless, itemIndex ) => itemIndex.toString()}
    renderItem={( { index: lineIndex, item: line } ) => <LineBlock key={`${line.id} ${lineIndex}` } line={line}
      // if currentItems is not length of 0, and if the item
      // at the index has a entryID (need to check because is null when item is deleted and state is
      // uodated). Otherwise if currentItems has length of 0, then set id to null
        entryID={ currentItems[index]?.entryID ?? null}
        mods={mapToArray( currentItems[index]?.mods )}/>} />;

  return (
    <FlatList
    data={currentLines}
    extraData={currentMods}
    initialNumToRender={currentLines[0]?.length < 101 ? 1 : undefined}
    keyExtractor={( item, index ) => index.toString()}
    renderItem={renderItem}
/>
  );
};

export default Viewer;
