import { View, Text } from 'react-native';
import React, { useEffect, useState, createContext, useContext } from 'react';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from '@firebase/auth';
import { auth } from '../firebase';
//import { useEffect } from 'react/cjs/react.production.min';
//import { useState } from 'react/cjs/react.production.min';
//import { useContext } from 'react/cjs/react.production.min';
//import { createContext } from 'react/cjs/react.production.min';

const AuthContext = createContext({});

const config = {
  androidClientId: '331806672983-mrkc86ondq067jshkm0m0urnfo4e28db.apps.googleusercontent.com',
  iosClientId: '331806672983-vv1ughu95qs32ckes8it5k87mg3pfrg0.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => 
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // logged in...
          setUser(user);
        } else {
          // Not logged in...
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const signInWithGoogle = async() => {
    setLoading(true);

    await Google.logInAsync(config).then(async (logInResult) => {
      if(logInResult.type === 'success') {
        // login...
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
      
        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
  }

  return (
    <AuthContext.Provider 
        value={{
            user,
            loading,
            error,
            signInWithGoogle,
            logout,
        }}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}