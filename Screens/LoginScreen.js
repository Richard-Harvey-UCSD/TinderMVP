import { Button, View, Text } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {

    const { signInWithGoogle } = useAuth()
    //console.log(user)

  return (
    <View>
      <Text>Login to the app</Text>
      <Button title='login' onPress={signInWithGoogle} />
    </View>
  )
  
}

export default LoginScreen