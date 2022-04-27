import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from "../components/Header";
import tw from "twrnc";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessageScreen = (props) => {
  const { user } = useAuth();
  const { params } = useRoute();
  //console.log(props.matchDetails);

  const { matchDetails } = params;

  return (
    <SafeAreaView style={[tw``, Platform.OS === "android" ? tw`mt-10` : tw`mt-0`]}>
      <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  );
};

export default MessageScreen;