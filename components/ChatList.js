import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatches", "array-contains", user.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, []);

  return (
    <View>
      <Text>ChatList...</Text>
    </View>
  );
};

export default ChatList;