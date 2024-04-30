import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from "react-native";
import Calendar from "../calendar";
import { getFormattedDate } from "../../../helper";
import SimpleLineChart from "../LineChart";
import { getRequest, postRequest } from "../../../helper";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Goals = ({ navigation }) => {
  const [getDailyWorkout, setDailyWorkout] = useState();
  const [getDailyMeal, setDailyMeal] = useState({})
  const [date, setDate] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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
        console.log(response.data)
        setDailyWorkout(response.data);
      } catch (error) {}
    };

    getDailyWorkouts();
  }, []);

  useEffect(() => {
    const getDailyMeals = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const currentDate = new Date().toISOString().split("T")[0];

        const response = await getRequest(
          `Meal/GetMealPlans?date=${currentDate}`,
          {
            Authorization: `Bearer ${accessToken}`,
          }
        );
        console.log(response.data[0].mealPlans[0].meals.Breakfast)

        if(response.data[0].mealPlans){
          setDailyMeal(response.data[0].mealPlans[0].meals)
        //  console.log(response.data[0].mealPlans[0].meals)

         // console.log(getDailyMeal)



        }
       // setDailyWorkout(response.data);
      } catch (error) {}
    };

    getDailyMeals();
  }, [getDailyWorkout]);

  const handleComplete = async (workoutId) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const requestData = {
        workoutPlanId: workoutId,
      };
      const response = await postRequest(
        "Workout/UpdateDailyWorkout",
        requestData,
        accessToken
      );

      Alert.alert("Message", response.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getDailyWorkouts();
    setRefreshing(false);
  };

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

      setDailyWorkout(response.data);
    } catch (error) {
      console.error("Error fetching daily workouts:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 15, marginTop: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Calendar />
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
                      <Text style={{ ...styles.heading }}>
                        {item.workoutName}
                      </Text>
                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          checked={item.status}
                          onPress={() => {
                            const updatedWorkouts = getDailyWorkout.map(
                              (workout) =>
                                workout.id === item.id
                                  ? { ...workout, checked: !workout.checked }
                                  : workout
                            );
                            setDailyWorkout(updatedWorkouts);
                            handleComplete(item.id);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text style={styles.heading3} className="text-center">
                  No workouts selected
                </Text>
              </View>
            )}
          </View>

          <View className="mt-4">
            <Text style={styles.heading3}>Nutrition</Text>
            {getDailyMeal.Breakfast ? (
              <View>
                <Text style={styles.subHeading2}>Breakfast</Text>

                 <View style={styles.mealCont}>
                     {getDailyMeal.Breakfast.map((item) => (
                        <View key={item} style={styles.cardBg}>
                          <Text>{item}</Text>
                        </View>
                      ))}
                     

                 </View>
              <Text style={styles.subHeading2}>Lunch</Text>

               <View style={styles.mealCont}>
                     {getDailyMeal.Lunch.map((item) => (
                        <View key={item} style={styles.cardBg}>
                          <Text>{item}</Text>
                        </View>
                      ))}
                     

                 </View>

                 <Text style={styles.subHeading2}>Dinner</Text>

                 <View style={styles.cardBg}>

                     {getDailyMeal.Dinner.map((item) => (
                        <View key={item} style={styles.cardBg}>
                          <Text>{item}</Text>
                        </View>
                      ))}
                     

                 </View>

               
              </View>
            ) : (
              <View>
                <Text style={styles.heading3} className="text-center">
                  No meals added yet
                </Text>
              </View>
            )}
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
  heading3: {
    fontSize: 15,
    fontWeight: "600",
  },
  subHeading: {
    marginTop: 2,
    fontSize: 13,
    color: "#1E1E1E8F",
  },
  subHeading2: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
    color: "#1E1E1E8F",
  },
  cardBg: {
    backgroundColor: "#F6F7FB",
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#B8BABE",
  },
  checkboxContainer: {
    marginLeft: "auto",
    marginTop: -20,
  },
});

export default Goals;
