import React from 'react';
import LoginScreen from 'src/Screens/Login/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from 'src/Screens/Register/RegisterScreen';
import {Platform} from 'react-native';
import useAuthValue from 'src/Modules/AuthModule/Hooks/useAuthValue';
import {POST} from 'src/Modules/PostModule/Types/ResponseTypes';
import DetailScreen from 'src/Screens/Detail/DetailScreen';
import HomeScreen from 'src/Screens/Home/HomeScreen';
import PostScreen from 'src/Screens/Post/PostScreen';

export type MainStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Post: {mode: 'add' | 'edit'; post?: POST};
  Detail: {id: number};
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  const {loggedIn} = useAuthValue();

  return (
    <MainStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
        headerShown: false,
      }}>
      {loggedIn ? (
        <MainStack.Group>
          <MainStack.Screen name={'Home'} component={HomeScreen} />
          <MainStack.Screen name={'Post'} component={PostScreen} />
          <MainStack.Screen name={'Detail'} component={DetailScreen} />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen name={'Login'} component={LoginScreen} />
          <MainStack.Screen name={'Register'} component={RegisterScreen} />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
