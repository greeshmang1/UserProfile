

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './source/screens/Home';
import Login from './source/screens/Login';
import Signup from './source/screens/Signup';
import Profilepic from './source/screens/Profilepic';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profilepic" component={Profilepic} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;