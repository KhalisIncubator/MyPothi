import {
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import LineBlock from './LineBlock';
import { EditCtx } from '../../store/context_stores/Contexts';
import { useValues } from '../../store/StateHooks';

const ShabadBlock = ( { item, currentItems, index } ) => {
  const { fontSizes, displayElements, sources } = useValues( 'viewerModel' );
  const { isEditMode, selectedInfo } = EditCtx.useStoreState( ( store ) => ( { ...store } ) );
  const updatedSelectedInfo = EditCtx.useStoreActions( ( actions ) => actions.updatedSelectedInfo );

  return (
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
          mods={[]}
        />
      )}
      initialNumToRender={index === 0 ? ( item.length < 20 ? item.length : 20 ) : 0}
    />
  );
};
export default ShabadBlock;
