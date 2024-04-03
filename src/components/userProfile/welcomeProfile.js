import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { retrieveData } from "../../../helper";
//fetch the session data



const WelcomeProfile = ({ navigation }) => {
  /* Navigations*/
  const goToProfileSetup = () => {
    navigation.navigate("ProfileSetup");
  };
  const goToLoginPage = () => {
    navigation.navigate("Login");
  };
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToProfileSetup}>
        <Text style={styles.buttonText}>Let’s go!</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToProfileSetup}>
        <Text style={styles.buttonText}>Let’s go!</Text>
      </Pressable>
    ),
  });
  const [user, setUser] = useState("");

  useEffect(()=>{
    retrieveData('userdata')
    .then((data)=>setUser(data.firstName))

  },[])
  return (
    <View style={styles.appContainer}>
      <View className="mt-4 items-center">
        <Text style={styles.logoText}>Hi, {user}</Text>
        <Text className="text-black leading-6" style={styles.textBrand}>
          Ready to get started? We’ll help {"\n"} you tailor your experience
        </Text>
      </View>

      <View style={styles.imageStyle}>
        <View className="items-center">
          <Image source={require("../../../assets/Images/welcome-img.png")} />
        </View>
      </View>

      <View style={styles.divBottom}>
        <View style={{ alignItems: "center" }}>
          <Text className="text-black leading-6" style={styles.textBottom}>
            We just need to ask you {"\n"}a couple of questions
          </Text>
        </View>

        <View>
          <ButtonComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  imageStyle: {
    marginTop: Platform.OS === "ios" ? 80 : 35,
  },

  textBrand: {
    fontSize: 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    top: 5,
  },
  textBottom:{
    fontSize:Platform.OS === "ios" ? 20 : 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
   bottom: Platform.OS === "ios" ? 25 : 10,
  },
  logoText: {
    fontSize: 25,
    color: "#262626",
    fontWeight: "700",
  },

  buttonIOS: {
    backgroundColor: "#0077CA",
    padding: 18,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  divBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 80 : 40,
  },
 


});

export default WelcomeProfile;
