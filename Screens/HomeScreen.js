import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';

const HomeScreen = () => {

  const navigation = useNavigation();
  const { user, logout } = useAuth();

  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); */

  return (
    <SafeAreaView style={tw`flex-1 pt-10`}>
      {/* Header */}
      <View>
        <TouchableOpacity>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
      </View>

      {/* End of Header */}

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