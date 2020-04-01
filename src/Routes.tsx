/* eslint-disable import/extensions */
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from './components/nav/Drawer';
import Gutka from './screens/Pothi';
import SettingsScreen from './screens/Settings';
import Edit from './screens/Edit';
import { Header } from './components/nav/Header';
import Search from './screens/Search';

const Stack = createStackNavigator();
const ScreenStack = () => (
        <Stack.Navigator
            initialRouteName="Gutka"
            headerMode="screen"
            screenOptions={{
              header: ( { previous, navigation } ) => (
                    <Header previous={previous} navigation={navigation} />
              ),
            }}>
            <Stack.Screen name="Gutka" component={Gutka} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
);

const AppDrawer = createDrawerNavigator();

const DrawerNav = () => {
  const dimensions = useWindowDimensions();
  return (
       <AppDrawer.Navigator drawerContent={( props ) => <Drawer {...props} />} drawerType={dimensions.width > 900 ? 'permanent' : 'slide'}>
            <AppDrawer.Screen name="Stack" component={ScreenStack} />
        </AppDrawer.Navigator>
  );
};

const Routes = () => (
        <NavigationContainer>
            <DrawerNav />
        </NavigationContainer>
);
export default Routes;