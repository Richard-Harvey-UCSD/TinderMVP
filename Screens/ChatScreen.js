import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import tw from "twrnc";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView style={[tw``, Platform.OS === "android" ? tw`mt-10` : tw`mt-0`]}>
      <Header title="Chat" callEnabled />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;