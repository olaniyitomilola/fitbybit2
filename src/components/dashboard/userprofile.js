import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Goals from "./goals";
import WorkoutPlans from "./workoutPlans";
import WorkoutLibrary from "./workoutLibrary";
import MealPlans from "./mealPlans";

const Drawer = createDrawerNavigator();

const UserProfile = ({ navigation }) => {
  // Mock data for the "Client Data" section
  const clientData = [
    { label: "Fitness level", value: "Intermediate" },
    { label: "BMI", value: "23.6" },
    { label: "Fitness goal", value: "Build muscle" },
    { label: "Focus zones", value: "Full body" },
    { label: "Starting weight", value: "68kg" },
    { label: "Target weight", value: "70kg" },
    { label: "Height", value: "169cm" },
  ];

  return (
    <View style={{ flex: 1, padding: 1, marginTop: 10 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/Images/avatar.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Name: <Text style={styles.nestedText}>  Emmanuel Abu</Text>
          </Text>
          <Text style={styles.text}>
            Email: <Text style={styles.nestedText}>  emmanuelabu@gmail.com</Text>
          </Text>
          <Text style={styles.text}>
            Phone no: <Text style={styles.nestedText}>  09087654323</Text>
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <View style={styles.dataHeader}>
          <Text style={styles.dataHeaderText}>Client Data</Text>
        </View>

        {clientData.map((item, index) => (
          <View style={styles.imageAndTextContainer} key={index}>
            <Text style={styles.dataText}>{item.label}</Text>
            <Text style={styles.dataText}>{item.value}</Text>
          </View>
        ))}
      </View>
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
    paddingLeft: 20
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
