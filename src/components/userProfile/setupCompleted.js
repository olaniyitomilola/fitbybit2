import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const SetupCompleted = ({ navigation }) => {
  /* Navigations*/
  const goBack = () => {
    navigation.navigate("BMR");
  };
  const goToCalculator = () => {
    navigation.navigate("Calculator");
  };
  const goToNotification = () => {
    navigation.navigate("Notification");
  };

   // Timeout duration in milliseconds
   const timeoutDuration = 2000; // 2 seconds

   // useEffect to trigger navigation after the specified timeout
   useEffect(() => {
     const timeout = setTimeout(() => {
      goToNotification();
     }, timeoutDuration);
 
     // Clear the timeout if the component unmounts or if navigation occurs
     return () => clearTimeout(timeout);
   }, [goToNotification]);
   
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCalculator}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCalculator}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
  });

  return (
    <View style={styles.appContainer}>
      <View style={styles.closeIcon}>
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color="black"
          onPress={goBack}
        />
      </View>

      <View className="mt-8 items-center">
        <Image source={require("../../../assets/Images/loading.png")} />
        <Text style={styles.logoText}>
          Hold on while we{"\n"}customize your{"\n"}experience
        </Text>
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

  option: {
    padding: 24,
    marginVertical: 5,
    borderRadius: 28,
    alignItems: "center",
  },
  textBrand: {
    fontSize: 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    top: 5,
  },
  textBottom: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    bottom: Platform.OS === "ios" ? 25 : 10,
  },
  logoText: {
    fontSize: Platform.OS === "ios" ? 40 : 30,
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

export default SetupCompleted;
