import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Goals from "./goals";
import WorkoutPlans from "./workoutPlans";
import WorkoutLibrary from "./workoutLibrary";
import MealPlans from "./mealPlans";
import Logout from "./logout";
import { getRequest, saveData } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const UserProfile = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for the "Client Data" section
  const clientData = [
    { label: "Fitness level", value: "" },

    { label: "Fitness goal", value: "" },
    // { label: "Focus zones", value: "" },
    { label: "Starting weight", value: "" },
    { label: "Target weight", value: "" },
    { label: "Height", value: "" },
    // { label: "BMI", value: "" },
  ];

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token not found.");
          return;
        }

        const response = await getRequest("Auth/GetUser", null, {
          Authorization: `Bearer ${accessToken}`,
        });

        setUserData(response.data);

        // Save user data in AsyncStorage under the key "userdata"
        await saveData("userdata", response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, []);
  return (
    <View style={{ flex: 1, padding: 1, marginTop: 10 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/Images/avatar.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Name:{" "}
                <Text style={styles.nestedText}>
                  {userData.firstName} {userData.lastName}
                </Text>
              </Text>
              <Text style={styles.text}>
                Email: <Text style={styles.nestedText}>{userData.email}</Text>
              </Text>
              <Text style={styles.text}>
                Phone no:{" "}
                <Text style={styles.nestedText}>{userData.phoneNumber}</Text>
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.dataHeader}>
              <Text style={styles.dataHeaderText}>Client Data</Text>
            </View>

            {clientData.map((item, index) => {
              let value = "";
              switch (item.label) {
                case "Fitness level":
                  switch (userData.currentFitness) {
                    case 0:
                      value = "New to Fitness";
                      break;
                    case 1:
                      value = "Regular to Fitness";
                      break;
                    case 2:
                      value = "Advanced in Fitness";
                      break;
                    case 3:
                      value = "Expert in Fitness";
                    default:
                      value = "";
                      break;
                  }
                  break;
                // case "BMI":
                //   value =
                //     userHeight && userWeight
                //       ? calculateBMI(userHeight, userWeight)
                //       : "";
                //   break;
                case "Fitness goal":
                  switch (userData.fitnessGoal) {
                    case 0:
                      value = "Lose Weight";
                      break;
                    case 1:
                      value = "Maintain Current Weight";
                      break;
                    case 2:
                      value = "Gain Muscle and Strength";
                      break;
                    case 3:
                      value = "Build a Healthy Lifestyle";
                    default:
                      value = "";
                      break;
                  }
                  break;
                // case "Focus zones":
                //   value = userData ? userData.focusZones : "";
                //   break;
                case "Starting weight":
                  value = userData ? userData.startingWeight + " kg" : "";
                  break;
                case "Target weight":
                  value = userData ? userData.targetWeight + " kg" : "";
                  break;
                case "Height":
                  value = "" + " cm" || "";
                  break;
                default:
                  value = "";
                  break;
              }

              return (
                <View style={styles.imageAndTextContainer} key={index}>
                  <Text style={styles.dataText}>{item.label}</Text>
                  <Text style={styles.dataText}>{value}</Text>
                </View>
              );
            })}
            {/* Calculate and display BMI */}
            <View>
              <Text
                style={{ ...styles.dataText, marginTop: 8, padding: 10 }}
                className="leading-7"
              >
                BMI
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="UserProfile"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      <Drawer.Screen name="My Profile" component={UserProfile} />
      <Drawer.Screen name="My Goals" component={Goals} />
      <Drawer.Screen name="Workout Plans" component={WorkoutPlans} />
      <Drawer.Screen name="Workout Library" component={WorkoutLibrary} />
      <Drawer.Screen name="Nutrition" component={MealPlans} />
      <Drawer.Screen name="Settings" component={Logout} />


    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: Platform.OS === "ios" ? 20 : 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  imageContainer: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    marginBottom: 5,
    paddingLeft: 20,
  },
  nestedText: {
    fontWeight: "bold",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    padding: 10,
  },
  dataText: {
    fontSize: 16,
    color: "#262626",
    marginTop: 8,
    fontWeight: "700",
  },
  dataHeader: {
    backgroundColor: "#F6F7FB",
    padding: 12,
  },
  dataHeaderText: {
    fontSize: 20,
    color: "#262626",
    fontWeight: "bold",
  },
});

export default App;
