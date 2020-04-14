import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import {
  Avatar, Card, IconButton, Snackbar, useTheme, Title,
} from 'react-native-paper';
import { useUpdaters, useValues } from '../store/StateHooks';
import ShabadCard, { SourceColors, generateTags } from '../components/main/Results';

const Edit = ( { route } ) => {
  const theme = useTheme();

  const [ showSnack, updateShow ] = useState( false );
  const [ showError, updateErr ] = useState( false );
  const [ editing, updateEditing ] = useState( {
    name: null,
    id: null,
  } );
  const [ editedText, updateText ] = useState( '' );

  const { currentItems } = useValues( 'currentModel' );
  const { removeEntry, updateCurrentName } = useUpdaters( 'currentModel' );
  const { pothiNames } = useValues( 'pothiModel' );
  const { deletePothi, renamePothi } = useUpdaters( 'pothiModel' );

  const { type } = route.params;

  const snack = `${type} Removed!`;
  const handleRemoveShabad = ( [ entryID, shabadId ] ) => {
    removeEntry( [ entryID, shabadId ] );
    updateShow( true );
  };
  const handleRemoveGutka = ( name, gutkaID, index ) => {
    const position = index !== 0 ? index - 1 : index + 1;
    updateCurrentName(
      [ pothiNames[position][0],
        pothiNames[position][1] ],
    );
    deletePothi( [ name, gutkaID ] );
    updateShow( true );
  };
  return (
    <KeyboardAvoidingView style={style.View} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50}>
      <ScrollView style={[ style.View, { backgroundColor: theme.colors.background } ]}>
        {type === 'Shabad'
                && currentItems.map( ( item ) => {
                  const {
                    source, writer, raag, entryID, mainLine, shabadId,
                  } = item;
                  return (
                    <ShabadCard
                      iconColor={SourceColors[source] || theme.colors.primary}
                      key={`${shabadId}/${entryID}`}
                      title={`${mainLine}`}
                      roundness={theme.roundness}
                      icon="book"
                      subheading={generateTags( source, raag, writer, theme )}
                      backgroundCondition={null}
                      surfaceColor={theme.colors.surface}
                      itemsRight={(
                        <IconButton
                          color="red"
                          icon="minus-circle"
                          onPress={() => {
                            handleRemoveShabad(
                              [ entryID, shabadId ],
                            );
                          }}
                        />
                      )}
                    />
                  );
                } )}
        {type === 'Pothi'
                && (
                <>
                  {pothiNames.map( ( data, index ) => (
                    <Card theme={theme} style={[ style.Card, { backgroundColor: theme.colors.surface } ]} key={data[1]}>
                      <Card.Title
                        key={data[1]} //
                        title={`${data[0]}`}
                        left={( props ) => (
                          <Avatar.Icon {...props} icon="book" />
                        )}
                        right={( props ) => (
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                          >
                            {
                                  editing.name === data[0] && editing.id === data[1]
                                    ? (
                                      <>
                                        <IconButton
                                          {...props}
                                          color="green"
                                          icon="check"
                                          onPress={() => {
                                            renamePothi( [ editing.name, editing.id, editedText ] );
                                            updateText( '' );
                                            updateEditing( {
                                              name: null,
                                              id: null,
                                            } );
                                          }}
                                        />
                                        <IconButton
                                          {...props}
                                          color="red"
                                          icon="x"
                                          onPress={() => {
                                            updateText( '' );
                                            updateEditing( {
                                              name: null,
                                              id: null,
                                            } );
                                          }}
                                        />
                                      </>
                                    )
                                    : (
                                      <>
                                        <IconButton
                                          {...props}
                                          color={theme.colors.primary}
                                          icon="edit"
                                          onPress={() => {
                                            updateEditing( ( prev ) => ( {
                                              ...prev,
                                              name: data[0],
                                              id: data[1],
                                            } ) );
                                          }}
                                        />
                                        <IconButton
                                          {...props}
                                          color="red"
                                          icon="minus-circle"
                                          onPress={() => {
                                            if ( pothiNames.length === 1 ) {
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
                                      </>
                                    )
                                }
                          </View>
                        )}
                      />
                      {

                            editing.id === data[1]
                            && (
                            <Card.Content style={{
                              alignItems: 'center',
                              justifyContent: 'space-evenly',
                            }}
                            >
                              <Title style={{ padding: 3 }}>New Name</Title>
                              <TextInput
                                style={{
                                  color: theme.colors.text,
                                  borderBottomWidth: 1,
                                  borderBottomColor: theme.colors.accent,
                                  fontSize: 20,
                                }}
                                autoCorrect={false}
                                placeholderTextColor="gray"
                                autoCompleteType="off"
                                placeholder="Enter Pothi Name"
                                underlineColorAndroid="transparent"
                                onChangeText={( text ) => {
                                  updateText( text );
                                }}
                              />
                            </Card.Content>
                            )

                        }
                    </Card>
                  ) )}

                </>
                )}
      </ScrollView>

      <Snackbar
        visible={showSnack}
        onDismiss={() => updateShow( false )}
        style={[ style.Snack, { backgroundColor: theme.colors.surface } ]}
      >
        <Text style={{ color: theme.colors.text }}>{snack}</Text>
      </Snackbar>
      <Snackbar
        visible={showError}
        onDismiss={() => updateErr( false )}
        style={[ style.Snack, { backgroundColor: theme.colors.surface } ]}
      >
        <Text style={{ color: theme.colors.text }}>You cannot have less than one pothi!</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create( {
  Card: {
    backgroundColor: 'white',
    margin: 5,
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
