import {View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Game from '../Screens/Game/Game';
import EnterServerId from '../Screens/EnterServerId/EnterServerId';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName="EnterServerId"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="EnterServerId" component={EnterServerId} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
