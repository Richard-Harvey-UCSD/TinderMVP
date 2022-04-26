import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const DUMMY_DATA = [
  {
    firstName: "Richard",
    lastName: "Harvey",
    occupation: "Software Engineer",
    photoURL: "https://avatars.githubusercontent.com/u/18176462?v=4",
    age: 36,
    id: 123,
  },
  {
    firstName: "Elizabitch",
    lastName: "Harvey",
    occupation: "Software Engineer",
    photoURL: "https://upload.wikimedia.org/wikipedia/en/9/95/Queen_Elizabitch_album_cover.png",
    age: 16,
    id: 456,
  },
  {
    firstName: "Kassandra",
    lastName: "Harvey",
    occupation: "Real Estate Agent",
    photoURL: "https://ik.imagekit.io/emoxie/2021/12/Jeanna-M.-Harvey-Barnes-MD_RIMI.png",
    age: 36,
    id: 789,
  },
];

const HomeScreen = () => {

  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); */

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = async() => {

  }

  const swipeRight = async() => {
    
  }

  const swipeTop = async() => {
    
  }

  //console.log(profiles)

  return (
    <SafeAreaView style={[tw`flex-1`, Platform.OS === "android" ? tw`pt-10` : tw`pt-0`]}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image style={tw`h-14 w-14`} source={require("../logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={40} color="#FF5864" />
        </TouchableOpacity>
      </View>


      {/* End of Header */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles} //DUMMY_DATA
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          backgroundColor={"#4FD0E9"}
          disableBottomSwipe={true}
          //verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe NOPE");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe LIKE");
            swipeRight(cardIndex);
          }}
          onSwipedTop={(cardIndex) => {
            console.log("Swipe SUPER LIKE");
            swipeTop(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  textAlign: "left",
                  color: "lightgreen", //"#4DED30"
                },
              },
            },
            top: {
              title: "SUPER LIKE",
              style: {
                label: {
                  textAlign: "center",
                  color: "black",
                },
              },
            },
          }}
          renderCard={(card) => card ? (
            <View
              key={card.id}
              style={tw`relative bg-white h-3/4 rounded-xl`}
            >
              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              />

              <View
                style={tw
                  `absolute bottom-0 bg-white w-full flex-row justify-between 
                  items-center h-20 px-6 py-2 rounded-b-xl shadow-xl`
                }
              >
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.displayName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>
                  {card.age}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={tw`relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl`}>
              <Text style={tw`font-bold pb-5`}>
                No more profiles
              </Text>
              <Image
                style={tw`h-20 w-20`}
                height={100}
                width={100}
                source={{ uri: "https://links.papareact.com/6gb" }}
              />
            </View>
          )}
        />
      </View>

      <View style={[tw`flex flex-row justify-evenly`, Platform.OS === "android" ? tw`mb-8` : tw`mb-0`]}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});