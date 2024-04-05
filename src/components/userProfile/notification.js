import React, { useEffect, useState } from "react";

import {
  getRequest,
  postRequest,
  retrieveData,
  saveData,
  saveToken,
} from "../../../helper";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  /* Navigations*/
  const goToDashboard = async () => {
    //complete set up
    //send details to backend
    //get back token and save locally on device
    //delete the user data

    try {
      //confirm the data has nbeen loaded first
      if (userData) {
        // console.log(userData, "userDataNotifi");
        const response = await postRequest(
          "Auth/CreateUser",
          userData,
          accessToken
        );
        // console.log(response.data, "response");
        const accessToken = response.data.accessToken;
        await saveToken(accessToken);
        // console.log(accessToken, "tokenRegister")

        if (response.success) {
          setSuccessMessage(response.message);

          // Navigate to the user profile screen
          setTimeout(() => {
            navigation.navigate("UserProfile");
          }, 2000);
        } else {
          if (response.errors) {
            const errors = Object.values(response.errors);
            setErrorMessage(errors.flat());
          }
        }
      }
   
    } catch (error) {
      console.error(error);
    }

    // navigation.navigate("UserProfile");
  };
  useEffect(() => {
    retrieveData("userdata").then((data) => setUserData(data));
  }, []);
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToDashboard}>
        <Text style={styles.buttonText}>Allow Notifications</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToDashboard}>
        <Text style={styles.buttonText}>Allow Notifications</Text>
      </Pressable>
    ),
  });

  return (
    <View style={styles.appContainer}>
      {/* Error message */}
      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Pressable onPress={clearMessages}>
            <Text style={styles.clearErrorText}>
              <AntDesign name="close" size={20} color="black" />
            </Text>
          </Pressable>
        </View>
      )}
      {/* Success message */}
      {successMessage !== "" && (
        <View style={{ ...styles.errorContainer, backgroundColor: "green" }}>
          <Text style={{ ...styles.errorText, color: "white" }}>
            {successMessage}
          </Text>
        </View>
      )}
      <View style={styles.bgDiv} className="mt-4">
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../../assets/Images/notification.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.heading}>Instant Notifications</Text>
        <Text style={styles.subHeading} className="leading-6 mt-2">
          Get timely updates to keep you on{"\n"} track, monitor your
          progress,and{"\n"} be aware of important changes to{"\n"} the Fit by
          Bit app
        </Text>
      </View>

      <View style={styles.divBottom}>
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
  errorContainer: {
    backgroundColor: "#FFCCCC",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#FF0000",
    flex: 1,
  },
  clearErrorText: {
    color: "#FF0000",
  },
  bgDiv: {
    backgroundColor: "#0077CA",
    paddingHorizontal: 20, // Adjust padding as needed
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageWrapper: {
    alignItems: "center",
  },
  image: {
    marginTop: 8,
    // Add other image styles as needed
  },
  textContent: {
    marginTop: 28,
    alignItems: "center",
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
  heading: {
    fontSize: Platform.OS === "ios" ? 34 : 30,
    fontWeight: "700",
    textAlign: "center",
  },
  subHeading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "500",
    color: "#1E1E1E8F",
    textAlign: "center",
  },
  textBottom: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    bottom: Platform.OS === "ios" ? 25 : 10,
  },
  logoText: {
    fontSize: Platform.OS === "ios" ? 30 : 30,
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

export default Notification;
