import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRequest } from "../../helper";

const LoaderPage = ({ navigation }) => {
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          // Token exists, verify its validity
          const response = await getRequest("Auth/ValidateToken", null, {
            Authorization: `Bearer ${accessToken}`,
          });

          if (response.success) {
            // Token is valid, navigate to the main app after 2 seconds
            setTimeout(() => {
              navigation.navigate("UserProfile");
            }, 2000);
          } else {
            // Token is invalid, navigate to the login screen after 2 seconds
            setTimeout(() => {
              navigation.navigate("Splash");
            }, 2000);
          }
        } else {
          // No token found, navigate to the login screen after 2 seconds
          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
        // Navigate to the login screen in case of any errors after 2 seconds
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10, backgroundColor:"#0077CA"}}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoaderPage;
