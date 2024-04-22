import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

const WorkoutPlans = ({ navigation }) => {
  const workoutPlanData = [
    {
      label: "Full Body Burn Workout",
      image: require("../../../assets/Images/Image1.png"),
      id: 1,
    },
    {
      label: "Toned Arms and Shoulder Workout",
      image: require("../../../assets/Images/Image2.png"),
      id: 2,
    },
    {
      label: "Abs and Legs Workout",
      image: require("../../../assets/Images/Image3.png"),
      id: 3,
    },
  ];
  const LevelData = [
    {
      name: "Beginner",
      id: 1,
    },
    {
      name: "Intermidate",
      id: 2,
    },
    {
      name: "Expert",
      id: 3,
    },
  ];
  const typeData = [
    {
      name: "Lose Weight",
      id: 1,
    },
    {
      name: "Maintain Current Weight",
      id: 2,
    },
    {
      name: "Gain Muscle And Strenght",
      id: 3,
    },
    {
      name: "Build A Healthy Lifstyle",
      id: 4,
    }
  ];

  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Workout to My Calendar</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Workout to My Calendar</Text>
      </Pressable>
    ),
  });

  const WorkoutButton = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </Pressable>
    ),
  });

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 8 }}>

        {/* Use DropDownPicker for selecting level */}
        <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={LevelData.map((lev) => ({
          label: lev.name,
          value: lev.id,
        }))}
        style={dropdownStyles}
        placeholder={{
          label: "Select Level",
          value: null,
        }}
      />
      {/* Use DropDownPicker for selecting type */}
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={typeData.map((data) => ({
          label: data.name,
          value: data.id,
        }))}
        style={dropdownStyles}
        placeholder={{
          label: "Select Category",
          value: null,
        }}
      />
      {/* Use DropDownPicker for selecting type */}
      <View className="mt-4">
        <WorkoutButton />
      </View>
      {/* <View>
        {workoutPlanData.map((item) => (
          <View key={item.id} style={styles.imageAndTextContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.heading}>{item.label}</Text>
            </View>
            <Text style={{ ...styles.heading, marginTop: 5 }}>
              {" "}
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="#1E1E1E8F"
              />
            </Text>
          </View>
        ))}
      </View> */}

      {/* <View className="mt-4">
        <ButtonComponent />
      </View> */}


    
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
});

const dropdownStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#B8BABE",
    borderRadius: 8,
    marginTop: 20,
    ...Platform.select({
      android: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#B8BABE",
        borderRadius: 8,
        marginTop: 20,
      },
    }),
  },
  placeholder: {
    color: "#1E1E1E8F",
  },
};

export default WorkoutPlans;
