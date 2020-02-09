// eslint-disable-next-line prettier/prettier
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import Gutka from './Screens/Gutka';
import Shabad from './Screens/Shabad';
import CustomDrawerComponent from './Components/Drawer/CustomDrawer';
import SettingsScreen from './Screens/Settings';
import AddScreen from './Screens/Add';


const DrawerNav = createDrawerNavigator(
  {
    Gutka: Gutka,
    ShabadViewer: Shabad,
    Settings: SettingsScreen,
    Add: AddScreen
  },
  {
    contentComponent: CustomDrawerComponent,
  },
);

const Routes = createAppContainer(DrawerNav);
export default Routes;
