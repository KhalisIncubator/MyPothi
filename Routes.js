import React, { useContext, useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Title,
  Drawer,
  Text,
  TextInput,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gutka from './Screens/Gutka';
import SettingsScreen from './Screens/Settings';
import Edit from './Screens/Edit';
import { Header, BackHeader } from './Components/navigation/Headers';
import { GutkaContext } from './contexts/Contexts';
import Search from './Screens/Search';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Gutka"
      headerMode="screen"
      screenOptions={{
        header: ({ previous, navigation }) => (
          <Header previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen name="Gutka" component={Gutka} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  )
}
const CustomDrawerComponent = (props) => {
  const GutkaCtx = useContext(GutkaContext);
  const [isCreating, toggleCreateMode] = useState(false);
  const [newGutkaName, changeText] = useState('');
  useEffect(() => console.log(GutkaCtx.gutkaNames), [GutkaCtx.gutkaNames]);
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
          {GutkaCtx.gutkaNames.map(name => (
            < DrawerItem
              icon={({ focused, color, size }) => (
                <Icon name={focused ? "book-open-variant" : 'book'} color={color} size={size} />
              )}
              key={name}
              focused={name === GutkaCtx.currentName}
              activeTintColor="#ff9a00"
              label={
                ({ color }) => <Text style={[{ color }, styles.text]}>{name}</Text>
              }
              onPress={() => {
                GutkaCtx.updateCurrentName(name);
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
                  <TextInput mode="flat" style={styles.input} placeholder="Enter Gutka Name" onChangeText={(text) => { changeText(text) }} />
              }
            >
            </DrawerItem>}
        </Drawer.Section>
        {isCreating &&
          <View>
            <Button onPress={() => {
              GutkaCtx.createGutka(newGutkaName);
              toggleCreateMode(false);
            }} mode="outlined" style={styles.button}>Create Gutka!</Button>
            <Button onPress={() => {
              toggleCreateMode(false);
            }} mode="outlined" style={styles.button}>Cancel</Button>
          </View>}
      </View>
    </DrawerContentScrollView>
  );
}
const DrawerNav = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={props => <CustomDrawerComponent {...props} />}>
      <AppDrawer.Screen name="Stack" component={ScreenStack} />
    </AppDrawer.Navigator>
  )
}


const Routes = () => {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
export default Routes;

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
