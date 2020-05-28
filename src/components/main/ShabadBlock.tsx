import React from 'react';
import { FlatList } from 'react-native';

import { Element } from '../../../types/types';
import {
  useSelectionInfo,
  useValues,
} from '../../store/StateHooks';
import LineBlock from './LineBlock';

const ShabadBlock = ( {
  item, index,
} ) => {
  const [ selectionInfo, updateSelectedInfo ] = useSelectionInfo();
  const [ selectedLineID, selectedElement ] = selectionInfo;

  const { currentItems } = useValues( 'currentModel' );

  return (
    <FlatList
      data={item}
      initialNumToRender={index === 0 ? ( item.length < 20 ? item.length : 20 ) : 0}
      keyExtractor={( useless, itemIndex ) => itemIndex.toString()}
      extraData={selectionInfo}
      renderItem={( { index: lineIndex, item: line } ) => {
        const isSelected = selectedLineID === line.id;
        const onClick = ( element: Element ) => {
          if ( isSelected && selectedElement === element ) updateSelectedInfo( [ null, null, null ] );
          else updateSelectedInfo( [ line.id, element, currentItems[index]?.entryID ] );
        };

        return (
          <LineBlock
            key={`${line.id}-${lineIndex}=${isSelected}`}
            line={line}
            selectedElement={isSelected ? selectedElement : null}
            isMainLine={currentItems[index]?.mainLine === line.Gurbani.ascii}
            onClick={onClick}
        // if currentItems is not length of 0, and if the item
        // at the index has a entryID (need to check because is null when item is deleted and state is
        // uodated). Otherwise if currentItems has length of 0, then set id to null
            entryID={currentItems[index]?.entryID ?? null}
            lineMods={currentItems[index]?.mods?.filtered( `lineID == ${line.id}` )}
          />
        );
      }}
    />
  );
};
export default ShabadBlock;
