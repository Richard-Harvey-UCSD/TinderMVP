import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
//import {TailwindProvider} from 'tailwind-rn';
//import utilities from './tailwind.json';

export default function App() {
  return (
   // <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        {/* HOC - Higher Order Component */}
        <AuthProvider>
          {/* Passes down the cool auth stuff to children... */}
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
   // </TailwindProvider>
  );
}
