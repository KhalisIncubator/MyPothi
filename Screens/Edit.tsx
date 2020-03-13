import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar, Card, IconButton, Snackbar,
} from 'react-native-paper';
import { useUpdaters, useValues } from '../config/app_state/hooks';

const Edit = ( { route } ) => {
  const [ showSnack, updateShow ] = useState( false );
  const [ showError, updateErr ] = useState( false );

  const { currentItems } = useValues( 'currentModel' );
  const { removeEntry, updateCurrentName } = useUpdaters( 'currentModel' );
  const { gutkaNames } = useValues( 'gutkaModel' );
  const { deleteAGutka } = useUpdaters( 'gutkaModel' );

  const { type } = route.params;

  const snack = `${type} Removed!`;
  const handleRemoveShabad = ( entryID ) => {
    removeEntry( entryID );
    updateShow( true );
  };
  const handleRemoveGutka = ( name, gutkaID, index ) => {
    const position = index !== 0 ? index - 1 : index + 1;
    updateCurrentName(
      [ gutkaNames[position][0],
        gutkaNames[position][1] ],
    );
    deleteAGutka( [ name, gutkaID ] );
    updateShow( true );
  };
  return (
        <View style={style.View}>
            {type === 'Shabad'
                && currentItems.map( ( item, index ) => (
                    <Card.Title
                        style={style.Card}
                        key={`${item.shabadId}/${item.entryID}`}
                        titleStyle={style.CardTitleG}
                        title={`${item.mainLine}`}
                        subtitle={`Shaabd ID: ${item.shabadId}`}
                        left={( props ) => (
                            <Avatar.Icon {...props} icon="book" />
                        )}
                        right={( props ) => (
                            <IconButton
                                {...props}
                                color="red"
                                icon="minus-circle"
                                onPress={() => {
                                  handleRemoveShabad(
                                    item.entryID,
                                  );
                                }}
                            />
                        )}
                            /> ) )}
            {type === 'Gutka'
                && gutkaNames.map( ( data, index ) => (
                        <Card.Title
                            style={style.Card}
                            key={data[0]}
                            title={`${data[0]}`}
                            left={( props ) => (
                                <Avatar.Icon {...props} icon="book" />
                            )}
                            right={( props ) => (
                                <IconButton
                                    {...props}
                                    color="red"
                                    icon="minus-circle"
                                    onPress={() => {
                                      if ( gutkaNames.length === 1 ) {
                                        updateErr( true );
                                      } else {
                                        handleRemoveGutka(
                                          data[0],
                                          data[1],
                                          index,
                                        );
                                      }
                                    }}
                                />
                            )}
                        />
                ) )}
            <Snackbar
                visible={showSnack}
                onDismiss={() => updateShow( false )}
                style={style.Snack}>
                {snack}
            </Snackbar>
            <Snackbar
                visible={showError}
                onDismiss={() => updateErr( false )}
                style={style.Snack}>
                You cannot have less than one gutka!
            </Snackbar>
        </View>
  );
};

const style = StyleSheet.create( {
  Card: {
    backgroundColor: 'white',
    margin: 5,
  },
  CardTitleG: {
    fontFamily: 'AnmolLipiTrue',
  },
  Snack: {
    alignSelf: 'flex-end',
  },
  View: {
    flex: 1,
    flexDirection: 'column',
  },

} );
export default Edit;
