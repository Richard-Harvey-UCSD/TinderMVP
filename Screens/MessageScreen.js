import { View, Text, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from "../components/Header";
import tw from "twrnc";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessageScreen = (props) => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //console.log(props.matchDetails);
  const { matchDetails } = params;

  const sendMessage = () => {

  };

  return (
    <SafeAreaView style={[tw`flex-1`, Platform.OS === "android" ? tw`mt-10` : tw`mt-0`]}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw`pl-4`}
            keyExtractor
          />
        </TouchableWithoutFeedback>

        <View
          style={tw`flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2`}
        >
          <TextInput
            style={tw`h-10 text-lg`}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button
            title="Send"
            onPress={sendMessage}
            color="#FF5864"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default MessageScreen;
