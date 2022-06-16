import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { init, dropTable } from './util/database';

import TitlePage from './screen/TitlePage';
import RulesScreen from './screen/RulesScreen';
import { Colors } from './constants/colors';
import PlayScreen from './screen/PlayScreen';
import PastGameScreen from './screen/PastGameScreen';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();
const navTheme = DefaultTheme;
navTheme.colors.background = Colors.background;

export default function App() {
  const [initDb, setInitDb] = useState(false);

  useEffect(() => {
    init().then(() => {
      setInitDb(true);
    }).catch((err) => {
      console.log(err);
    });
    // dropTable().then(() => {
    //   console.log('table dropped');
    // }).catch((err) => {
    //   console.log(err);
    // });
  }, []);

  if (!initDb) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen name='TitlePage' component={TitlePage}
            options={{ title: '', headerShown: false }} />
          <Stack.Screen name='RulesPage' component={RulesScreen}
            options={{ title: '', headerShown: false }} />
          <Stack.Screen name='PlayPage' component={PlayScreen}
            options={{ title: '', headerShown: false }} />
          <Stack.Screen name='PastGamePage' component={PastGameScreen}
            options={{ title: '', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
});
