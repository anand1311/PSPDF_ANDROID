import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNavigator from './StackNavigators/MainStackNavigator';

function Router() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default Router;
