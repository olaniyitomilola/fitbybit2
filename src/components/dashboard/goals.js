import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Calendar from "../calendar";
import { getFormattedDate } from "../../../helper";
import SimpleLineChart from "../LineChart";
import { getRequest, postRequest } from "../../../helper";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Goals = ({ navigation }) => {
  const [getDailyWorkout, setDailyWorkout] = useState();

  const workoutData = [
    {
      value: "Beginner At Home Workout",
      date: "Completed",
      id: 1,
    },
    {
      value: "20 Minute HIIT Workout",
      date: "Not Completed",
      id: 2,
    },
    {
      value: "30 Minute HIIT Workout",
      date: "Not Completed",
      id: 3,
    },
  ];

  const nutritionData = [
    {
      label: "Total Calories",
      value: "801 CAL",
      id: 2,
    },
    {
      label: "5 a day (Fruits)",
      value: "1 of 5",
      id: 3,
    },
  ];

  const [date, setDate] = useState("");

  useEffect(() => {
    const date = getFormattedDate();
    setDate(date);
  }, []);
  useEffect(() => {
    const getDailyWorkouts = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const currentDate = new Date().toISOString().split("T")[0];

        const response = await getRequest(
          `WorkOut/GetDailyWorkout?date=${currentDate}`,
          {
            Authorization: `Bearer ${accessToken}`,
          }
        );
        console.log(response)

        setDailyWorkout(response.data);
      } catch (error) {}
    };

    getDailyWorkouts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 15, marginTop: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Calendar />
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

            {getDailyWorkout ? (
              <View>
                {getDailyWorkout.map((item) => (
                  <View key={item.workoutId} style={styles.cardBg}>
                    <View style={styles.imageAndTextContainer}>
                      <Text style={{ ...styles.heading, marginTop: 5 }}>
                        {item.workoutName}
                      </Text>
                      <View style={styles.checkboxContainer}>
                        <Text>ola</Text>
                        </View>
                      {/* <Text style={styles.subHeading}>{item.workoutId}</Text> */}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text style={styles.heading3} className="text-center">No workouts selected</Text>
              </View>
            )}
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
              <View style={styles.container}>
                <SimpleLineChart />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  checkboxContainer: {
    marginTop: -28,
    marginLeft: "auto",
  },
});

export default Goals;
