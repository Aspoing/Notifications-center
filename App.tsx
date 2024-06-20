import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BeforeTrajectScreen from './BeforeTrajectScreen';
import AfterTrajectScreen from './AfterTrajectScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BeforeTraject" component={BeforeTrajectScreen} />
        <Stack.Screen name="AfterTraject" component={AfterTrajectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
