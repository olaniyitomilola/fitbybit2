import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput,ScrollView } from "react-native";
import { Entypo,AntDesign } from "@expo/vector-icons";


const WorkoutLibrary = ({ navigation }) => {
  const WorkoutLibraryData = [
    {
      label: "Fitness at Home",
      image: require("../../../assets/Images/fitnessathome.png"),
      number: "85 workouts",
      id: 1,
    },
    {
      label: "Jamba Dance",
      image: require("../../../assets/Images/jamba.png"),
      number: "85 workouts",
      id: 2,
    },
    {
      label: "Boxing",
      image: require("../../../assets/Images/boxing.png"),
      number: "85 workouts",
      id: 3,
    },
    {
      label: "Cardio",
      image: require("../../../assets/Images/cardio.png"),
      number: "85 workouts",
      id: 4,
    },
    {
      label: "HIIT",
      image: require("../../../assets/Images/hiit.png"),
      number: "85 workouts",
      id: 5,
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
        <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search workout plans"
          placeholderTextColor="#1E1E1E8F"
        />
      </View>
      <View className="mt-2">
        {WorkoutLibraryData.map((item) => (
          <View key={item.id} style={styles.imageAndTextContainer}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>{item.label}</Text>
              <Text style={styles.heading2}>
                <Entypo name="dot-single" size={14} color="white" />
                {item.number}
              </Text>
            </View>
            
          </View>
        ))}
      </View>
      <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>
              <AntDesign name="plus" size={18} color="white" />
              </Text>
            </View>
            </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  heading2: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
  imageContainer: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: 70,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey overlay color
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F6F7FB",
    borderColor: "#F6F7FB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "80%",
  },
  searchButton: {
    backgroundColor: "#0077CA",
    padding: 10,
    borderRadius: 50, 
    marginLeft: 10,
    width: 50, 
    height: 50,
    justifyContent: "center", 
    alignItems: "center",
    bottom: "38%",
    left: "75%"
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WorkoutLibrary;