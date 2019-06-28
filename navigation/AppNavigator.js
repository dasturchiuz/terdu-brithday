import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
}));