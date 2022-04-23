import { Button, View, Text, ImageBackground } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import tw from "twrnc";

const LoginScreen = () => {

  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();
    
  useLayoutEffect(() => {
    navigation.setOptions({ 
      headerShown: false,
    });
  }, []);  

  return (
    <View>
      
      <ImageBackground
        resizeMode="cover"
        style={tw`justify-center items-center`}
        sources={{ uri: "https://tinder.com/static/tinder.png" }}
        >
          <Text>Sign in & get swiping</Text>
        </ImageBackground>
      
    </View>
  )
  
}

export default LoginScreen;