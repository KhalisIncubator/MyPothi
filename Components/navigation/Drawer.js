import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Title,
  Drawer,
  Text,
  Button,
  TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GutkaContext } from '../../contexts/Contexts';

const CustomDrawerComponent = (props) => {
  const GutkaCtx = useContext(GutkaContext);
  const [isCreating, toggleCreateMode] = useState(false);
  const [newGutkaName, changeText] = useState('');

  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.TitleSection}>
          <View style={styles.row}>
            <Title style={styles.title}>Gutkas</Title>
            <Icon name="plus-circle" size={20} onPress={() => { toggleCreateMode(true) }} />
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {GutkaCtx.gutkaNames.map(data => (
            < DrawerItem
              icon={({ focused, color, size }) => (
                <Icon name={focused ? "book-open-variant" : 'book'} color={color} size={size} />
              )}
              key={data[0]}
              focused={data[0] === GutkaCtx.currentName[0]}
              activeTintColor="#ff9a00"
              label={
                ({ color }) => <Text style={[{ color }, styles.text]}>{data[0]}</Text>
              }
              onPress={() => {
                GutkaCtx.updateCurrentName(data[0], data[1]);
                props.navigation.closeDrawer();
              }}
            />
          ))}
          {isCreating &&
            < DrawerItem
              icon={({ color, size }) => (
                <Icon name='pencil-outline' color={color} size={size} />
              )}
              activeTintColor="#ff9a00"
              label={
                ({ color }) =>
                  <TextInput mode="outlined" style={styles.input} placeholder="Enter Gutka Name" onChangeText={(text) => { changeText(text) }} />
              }
            >
            </DrawerItem>}
        </Drawer.Section>
        {isCreating &&
          <View>
            <Drawer.Section>
              <Button
                icon="plus"
                style={styles.button}
                color="green"
                onPress={() => {
                  GutkaCtx.createGutka(newGutkaName);
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
          </View>}
        <Drawer.Section>
          <Button icon="list" style={styles.button} color="black" onPress={() => navigation.navigate('Stack', { screen: 'Edit', params: { type: 'Gutka' } })}>
            Edit Gutkas
         </Button>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  button: {
    margin: 5,

  },
  input: {
    height: 25,
  },
  TitleSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 14,
    padding: 5,
  },
  row: {
    marginTop: 15,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  drawerSection: {
    marginTop: 15,
  },
});


export default CustomDrawerComponent;