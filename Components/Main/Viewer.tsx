import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import LineBlock from './LineBlock';
import mapToArray from '../../app_config/functions';

const Viewer = ( props ) => {
  const [ itemsMounted, updateNumberMounted ] = useState( 0 );
  const [ finishedMounting, updateMounting ] = useState( false );
  const {
    currentItems, currentMods, currentLines, updateLoading, isLoading,
  } = props;

  useEffect( () => { updateNumberMounted( 0 ); }, [ currentItems ] );
  // using as flag to see if the component has actually mounted or is updating
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
    if ( isLoading && currentItems.length ) {
      if ( itemsMounted + 1 < currentItems.length ) {
        updateNumberMounted( ( prev ) => prev + 1 );
      } else if ( itemsMounted + 1 === currentItems.length ) {
        updateMounting( true );
        updateNumberMounted( 0 );
      }
    } else if ( !isLoading ) {
      updateMounting( false );
    } else {
      updateMounting( true );
    }
  } );

  useEffect( () => {
    if ( finishedMounting ) {
      updateLoading();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ finishedMounting ] );

  const renderItem = ( { item, index } ) => {
    const lines = item.map( ( line ) => ( <LineBlock key={line.id} line={line}
    // if currentItems is not length of 0, and if the item at the index has a entryID (need to check because is null when item is deleted and state is
    // uodated). Otherwise if currentItems has length of 0, then set id to null
      entryID={ currentItems[index]?.entryID ?? null}
      mods={mapToArray( currentItems[index]?.mods )}/> ) );
    return <View key="Viewer">{lines}</View>;
  };

  return (
    <FlatList
    data={currentLines}
    extraData={currentMods}
    initialNumToRender={currentLines[0]?.length < 101 ? 1 : undefined ?? undefined}
    keyExtractor={( item, index ) => index.toString()}
    renderItem={renderItem}
/>
  );
};

export default Viewer;
