import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { LogBox } from 'react-native';
//LogBox.ignoreAllLogs();
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        {/* Passes down the cool auth stuff to children... */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
