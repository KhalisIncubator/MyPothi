import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import {
  Avatar, Card, IconButton, Snackbar, useTheme,
} from 'react-native-paper';
import { useUpdaters, useValues } from '../app_config/app_state/state_hooks';

const Edit = ( { route } ) => {
  const theme = useTheme();

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
        <ScrollView style={[ style.View, { backgroundColor: theme.colors.background } ]}>
            {type === 'Shabad'
                && currentItems.map( ( item, index ) => (
                  <Card theme={theme} style={[ style.Card, { backgroundColor: theme.colors.surface } ]}>
                    <Card.Title
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
                            />
                            </Card> ) )}
            {type === 'Pothi'
                && gutkaNames.map( ( data, index ) => (
                  <Card theme={theme} style={[ style.Card, { backgroundColor: theme.colors.surface } ]}>
                        <Card.Title
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
                        </Card>
                ) )}
        </ScrollView>

            <Snackbar
                visible={showSnack}
                onDismiss={() => updateShow( false )}
                style={[ style.Snack, { backgroundColor: theme.colors.surface } ]}>
                <Text style={{ color: theme.colors.text }}>{snack}</Text>
            </Snackbar>
            <Snackbar
                visible={showError}
                onDismiss={() => updateErr( false )}
                style={[ style.Snack, { backgroundColor: theme.colors.surface } ]}>
                <Text style={{ color: theme.colors.text }}>You cannot have less than one pothi!</Text>
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
