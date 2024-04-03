import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable,ScrollView } from "react-native";


const MealPlans = ({ navigation }) => {
  const workoutPlanData = [
    {
      label: "Strawberry and Pineapple smoothie (300ml)",
      image: require("../../../assets/Images/strawberry.png"),
      id: 1,
      name: "Breakfast",
      cal: "2000Kcal",
    },
    {
      label: "Tuna Salad (100g) and 1 Egg",
      image: require("../../../assets/Images/tuna.png"),
      id: 2,
      name: "Lunch",
      cal: "500Kcal",
    },
    {
      label: "Roasted Salmon with 1 cup of Quinoa",
      image: require("../../../assets/Images/salmon.png"),
      id: 3,
      name: "Dinner",
      cal: "2000Kcal",
    },
  ];

  const mealType = [
    {
      name: "Breakfast",
      cal: "2000Kcal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 1,
    },
    {
      name: "Lunch",
      cal: "500cal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 2,
    },
    {
      name: "Dinner",
      cal: "2000Kcal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 3,
    },
  ];

  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Meals to My Plan</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Meals to My Plan</Text>
      </Pressable>
    ),
  });

  return (
    <View style={{ flex: 1, padding: 15, marginTop: 10 }}>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.heading2}>Meals Today</Text>

        <View style={styles.bgCard}>
          {mealType.map((item) => (
            <View key={item.id} style={styles.imageAndTextContainer}>
              <View style={styles.textContainer}>
                <Text style={{ ...styles.heading, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <View style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>{item.cal}</Text>
                </View>
                <Image source={item.image} style={{ marginTop: 25 }} />
              </View>
            </View>
          ))}
          <Text style={styles.totalHeading}>Total Calories</Text>
          <Text style={styles.totalsubHeading}>1800 CAL</Text>
        </View>
      </View>
      <View className="mt-4">
        <Text style={styles.heading2}>Meals Today</Text>
      </View>

      <View className="mt-4">
        {workoutPlanData.map((item) => (
          <View key={item.id} style={styles.imageAndTextContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={{ color: "#262626", fontSize: 12 }}>
                {item.name}
              </Text>
              <Text style={{ ...styles.heading, top: 2 }}>{item.label}</Text>
              <View style={{ ...styles.searchButton, top: 5 }}>
                <Text style={styles.searchButtonText}>{item.cal}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-4">
        <ButtonComponent />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  bgCard: {
    backgroundColor: "#0077CA66",
    marginTop: 10,
    padding: 30,
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    // width: 50,
    // height: 50,
    marginRight: 10,
  },
  totalHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E1E8F",
  },
  totalsubHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#262626",
    top: 5,
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
  searchButton: {
    backgroundColor: "#F6F7FB",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    top: 10,
  },
  searchButtonText: {
    color: "#262626",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default MealPlans;
