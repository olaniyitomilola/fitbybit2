import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Calendar from "../calendar";
import { getFormattedDate } from "../../../helper";

const Goals = ({ navigation }) => {
  const workoutData = [
    {
      label: "Functional Strength training",
      value: "100kg, 10reps, 637cal",
      date: "24 August",
      id: 1,
    },
    {
      label: "Chest press",
      value: "100kg, 10reps, 637cal",
      date: "24 August",
      id: 2,
    },
  ];

  const nutritionData = [
    {
      label: "Water Intake",
      value: "1:52:38",
      id: 1,
    },
    {
      label: "Total Calories",
      value: "801 CAL",
      id: 2,
    },
    {
      label: "5 a day",
      value: "127 KCAL",
      id: 3,
    },
  ];

  const [date,setDate] = useState("");

  useEffect(()=>{
    const date = getFormattedDate();
    setDate(date)
  },[])
  return (


<View style={{ flex: 1, padding: 15, marginTop: 10 }}>
  <ScrollView  showsVerticalScrollIndicator={false}>
    <View>
      <Calendar/>
      {/* <Image
        source={require("../../../assets/Images/calendar.png")}
        style={styles.image}
      /> */}
    </View>

    <View className="mt-6">
      <View style={styles.imageAndTextContainer}>
        <View>
          <Text style={styles.heading}>Summary</Text>
        </View>
        <Text style={styles.subHeading}>{date}</Text>
      </View>

      <View className="mt-4">
        <Text style={styles.heading3}>Workouts</Text> 

        {workoutData.map((item) => (
          <View key={item.id} style={styles.cardBg}>
            <Text style={styles.subHeading}>{item.label}</Text>

            <View style={styles.imageAndTextContainer}>
              <Text style={{ ...styles.heading, marginTop: 5 }}>
                {item.value}
              </Text>
              <Text style={styles.subHeading}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-4">
        <Text style={styles.heading3}>Nutrition</Text>
        <View style={styles.cardBg}>
          {nutritionData.map((item) => (
            <View key={item.id} className="p-1" style={styles.centeredCard}>
              <Text style={styles.subHeading}>{item.label}</Text>
              <Text style={styles.heading} className="mt-2">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-4">
        <Text style={styles.heading3}>Progress</Text>
        <View style={styles.cardBg}>
          <Image
            source={require("../../../assets/Images/graph.png")}
            className="mt-4"
            style={styles.image}
          />
        </View>
      </View>
    </View>
  </ScrollView>
</View>

  );
};

const styles = StyleSheet.create({
  container: {},
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  heading2: {
    color: "#0077CA",
    fontSize: 13,
  },
  heading3: {
    fontSize: 15,
    fontWeight: "600",
  },
  subHeading: {
    marginTop: 2,
    fontSize: 13,
    color: "#1E1E1E8F",
  },
  cardBg: {
    backgroundColor: "#F6F7FB",
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#B8BABE",
  },
  centeredCard: {
    alignItems: "center",
  },
  image: {
    width: "auto",
  },
});

export default Goals;
