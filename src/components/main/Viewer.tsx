import React from 'react';
import {
  FlatList, SafeAreaView, View,
} from 'react-native';
import LineBlock from './blocks/LineBlock';
import mapToArray from '../../Functions';

const Viewer = ( props ) => {
  const {
    currentItems, currentMods, currentLines,
  } = props;


  const renderItem = ( { item, index } ) => (
    <FlatList
      data={item}
      keyExtractor={( useless, itemIndex ) => itemIndex.toString()}
      renderItem={( { index: lineIndex, item: line } ) => (
        <LineBlock
          key={`${line.id}-${lineIndex}`}
          line={line}
          isMainLine={currentItems[index]?.mainLine === line.Gurbani.ascii}
      // if currentItems is not length of 0, and if the item
      // at the index has a entryID (need to check because is null when item is deleted and state is
      // uodated). Otherwise if currentItems has length of 0, then set id to null
          entryID={currentItems[index]?.entryID ?? null}
          mods={mapToArray( currentItems[index]?.mods )}
        />
      )}
      initialNumToRender={index === 0 ? ( item.length < 20 ? item.length : 20 ) : 0}
    />
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
