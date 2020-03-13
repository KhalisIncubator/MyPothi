import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { Title, Drawer, Text, Button, TextInput } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useValues, useUpdaters } from '../../config/app_state/hooks';

const CustomDrawerComponent = props => {
    const { gutkaNames } = useValues('gutkaModel');
    const { currentName } = useValues('currentModel');

    const { updateCurrentName } = useUpdaters('currentModel');
    const { createGutka } = useUpdaters('gutkaModel');

    const [isCreating, toggleCreateMode] = useState(false);
    const [newGutkaName, changeText] = useState('');
    const { navigation } = props;
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.titleSection}>
                    <View style={styles.row}>
                        <Title style={styles.title}>Gutkas</Title>
                        <Icon
                            name="plus-circle"
                            size={20}
                            onPress={() => {
                                toggleCreateMode(true);
                            }}
                        />
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    {gutkaNames.map(data => (
                        <>
                            <DrawerItem
                                icon={({ focused, color, size }) => (
                                    <Icon
                                        name={
                                            focused
                                                ? 'book-open-variant'
                                                : 'book'
                                        }
                                        color={color}
                                        size={size}
                                    />
                                )}
                                key={data[0]}
                                focused={data[0] === currentName[0]}
                                activeTintColor="#ff9a00"
                                label={({ color }) => (
                                    <Text style={[{ color }, styles.text]}>
                                        {data[0]}
                                    </Text>
                                )}
                                onPress={() => {
                                    updateCurrentName([data[0], data[1]]);
                                    props.navigation.closeDrawer();
                                }}
                            />
                        </>
                    ))}
                    {isCreating && (
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="pencil-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={() => null}
                            activeTintColor="#ff9a00"
                            label={() => (
                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    placeholder="Enter Gutka Name"
                                    onChangeText={text => {
                                        changeText(text);
                                    }}
                                />
                            )}
                        />
                    )}
                </Drawer.Section>
                {isCreating && (
                    <View>
                        <Drawer.Section>
                            <Button
                                icon="plus"
                                style={styles.button}
                                color="green"
                                onPress={() => {
                                    createGutka(newGutkaName);
                                    toggleCreateMode(false);
                                }}>
                                Create Gutka!
                            </Button>
                            <Button
                                color="red"
                                icon="x"
                                style={styles.button}
                                onPress={() => {
                                    toggleCreateMode(false);
                                }}>
                                Cancel
                            </Button>
                        </Drawer.Section>
                    </View>
                )}
                <Drawer.Section>
                    <Button
                        icon="list"
                        style={styles.button}
                        color="black"
                        onPress={() =>
                            navigation.navigate('Stack', {
                                screen: 'Edit',
                                params: { type: 'Gutka' },
                            })
                        }>
                        Edit Gutkas
                    </Button>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 5,
    },
    drawerContent: {
        flex: 1,
    },

    drawerSection: {
        marginTop: 15,
    },
    input: {
        height: 25,
    },

    row: {
        alignItems: 'baseline',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5,
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        lineHeight: 14,
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
    },
    titleSection: {
        paddingLeft: 20,
    },
});

export default CustomDrawerComponent;
