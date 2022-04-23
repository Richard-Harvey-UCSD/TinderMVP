import { Button, View, Text, SafeAreaView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';

const HomeScreen = () => {

  const navigation = useNavigation();
  const { logout } = useAuth();

  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); */

  return (
    <SafeAreaView style={tw`py-90`}>
      <Text>I am the HomeScreen</Text>
      <Button 
        title='Go to Chat Screen' 
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title='Logout'
        onPress={logout}
      />
    </SafeAreaView>
  )
}

export default HomeScreen;