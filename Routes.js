import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Title,
  Drawer,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gutka from './Screens/Gutka';
import Shabad from './Screens/Shabad';
import SettingsScreen from './Screens/Settings';
import AddScreen from './Screens/Add';
import { Header, BackHeader } from './Components/navigation/Headers';
import { GutkaContext, GlobalContext } from './contexts/Contexts';

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
      <Stack.Screen name="ShabadViewer" component={Shabad} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{}} />
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  )
}
const CustomDrawerComponent = (props) => {
  const GutkaCtx = useContext(GutkaContext);
  const GlobalCtx = useContext(GlobalContext);
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
            <Icon name="plus-circle" size={20} />
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {GutkaCtx.gutkas.map(gutka => (
            < DrawerItem
              icon={({ focused, color, size }) => (
                <Icon name={focused ? "book-open-variant" : 'book'} color={color} size={size} />
              )}
              focused={gutka.name === GlobalCtx.currentName}
              activeTintColor="#ff9a00"
              label={
                ({ color }) => <Text style={[{ color }, styles.text]}>{gutka.name}</Text>
              }
              onPress={() => {
                GlobalCtx.updateCurrentGutka(gutka.name);
                props.navigation.closeDrawer();
              }}
            />
          ))}
        </Drawer.Section>
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
