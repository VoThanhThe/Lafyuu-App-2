import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Explore from '../screens/Explore';
import Cart from '../screens/Cart';
import OfferScreen from '../screens/OfferScreen';
import {AppContext} from './AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Offer from '../screens/Offer';
import ProductDetail from '../screens/ProductDetail';
import Notification from '../screens/Notification';
import FavoriteProduct from '../screens/FavoriteProduct';
import Order_Detail from '../screens/Order_Detail';
import Profile from '../screens/Profile';
import Change_Name from '../screens/Change_Name';
import Gender from '../screens/Gender';
import BirthDay from '../screens/BirthDay';
import Email from '../screens/Email';
import Phone_Number from '../screens/Phone_Number';
import Change_Password from '../screens/Change_Password';
import Order from '../screens/Order';
import Address from '../screens/Address';
import Add_Address from '../screens/Add_Address';
import PaymentMethod from '../screens/PaymentMethod';
import Add_Card from '../screens/Add_Card';
import CreaditCardAndDebit from '../screens/CreaditCardAndDebit';

import Notification_Offer from '../screens/Notification_Offer';
import Notification_Feed from '../screens/Notification_Feed';
import Notification_Activity from '../screens/Notification_Activity';
import { useSelector } from 'react-redux';
import Search from '../screens/Search';
import ListCategory from '../screens/ListCategory';
import SearchResult from '../screens/SearchResult';
import ShipTo from '../screens/ShipTo';
import Edit_Address from '../screens/Edit_Address';
import SeeAllProduct from '../screens/SeeAllProduct';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const data = useSelector(state => state);

const User = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Offer" component={Offer} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="NotificationStack" component={NotificationStack} />
      <Stack.Screen name="FavoriteProduct" component={FavoriteProduct} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="ListCategory" component={ListCategory} />
      <Stack.Screen name="SeeAllProduct" component={SeeAllProduct} />
    </Stack.Navigator>
  );
};

const ExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExploreStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ExploreStack" component={Explore} />
      <Stack.Screen name="NotificationStack" component={NotificationStack} />
      <Stack.Screen name="FavoriteProduct" component={FavoriteProduct} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="ListCategory" component={ListCategory} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartStack" component={Cart} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Add_Card" component={Add_Card} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Order_Detail" component={Order_Detail} />
      <Stack.Screen name="Add_Address" component={Add_Address} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Edit_Address" component={Edit_Address} />
      <Stack.Screen name="ShipTo" component={ShipTo} />
    </Stack.Navigator>
  );
};

const NotificationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="Notification_Activity"
        component={Notification_Activity}
      />
      <Stack.Screen name="Notification_Feed" component={Notification_Feed} />
      <Stack.Screen name="Notification_Offer" component={Notification_Offer} />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccountStack" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Change_Name" component={Change_Name} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="BirthDay" component={BirthDay} />
      <Stack.Screen name="Phone_Number" component={Phone_Number} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Change_Password" component={Change_Password} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Order_Detail" component={Order_Detail} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Add_Address" component={Add_Address} />
      <Stack.Screen name="Edit_Address" component={Edit_Address} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Add_Card" component={Add_Card} />
      <Stack.Screen
        name="CreaditCardAndDebit"
        component={CreaditCardAndDebit}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  const cartData = useSelector(state => state.Reducers.cartItems);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'OfferScreen') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#40BFFF',
        tabBarInactiveTintColor: '#4E4B66',
        // tabBarLabelStyle: {
        //   fontSize: 14,
        //   color: '#4E4B66',
        // },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} title='Home' />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Cart" component={CartStack} options={{tabBarBadge: cartData.length}} />
      <Tab.Screen
        name="OfferScreen"
        component={OfferScreen}
        options={{title: 'Offer'}}
      />
      <Tab.Screen name="Account" component={AccountStack}/>
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  const {isLogin} = useContext(AppContext);
  return <>{isLogin == true ? <BottomTab /> : <User />}</>;
};

export default AppNavigator;

const styles = StyleSheet.create({});
