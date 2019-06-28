import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import TomorrowScreen from "../screens/TomorrowScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailsScreen from "../screens/DetailsScreen";

import Icon from 'react-native-vector-icons/Ionicons';


/**start */


const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});
 


HomeStack.navigationOptions = {
  tabBarLabel: 'Bugun',
  tabBarIcon: ({ focused }) =><Icon name={"md-star"} size={30} color={focused ? '#2A7800' : '#a1aab8'} />,
  tabBarOptions:{
    inactiveTintColor:'#a1aab8',
    activeTintColor:'#2A7800'
  } 
};
/***end */ 


const TomorrowStack = createStackNavigator({
  Tomorrow: {screen:TomorrowScreen},
  Details: { screen: DetailsScreen },
});

TomorrowStack.navigationOptions = {
  tabBarLabel: 'Ertaga',
  tabBarIcon: ({ focused }) =><Icon name={"md-gift"} size={30} color={focused ? '#2A7800' : '#a1aab8'} />,
  tabBarOptions:{
    inactiveTintColor:'#a1aab8',
    activeTintColor:'#2A7800'
  } 
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Biz haqimizda',
  tabBarIcon: ({ focused }) =><Icon name={"md-information-circle-outline"} size={30} color={focused ? '#2A7800' : '#a1aab8'} />,
  tabBarOptions:{
    inactiveTintColor:'#a1aab8',
    activeTintColor:'#2A7800'
  } 
}; 

export default createBottomTabNavigator({
  HomeStack,
  TomorrowStack,
  SettingsStack,
});
