import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import Calendar from "../calendar";
import { getFormattedDate } from "../../../helper";
import SimpleLineChart from "../LineChart";
import { getRequest, postRequest } from "../../../helper";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Goals = ({ navigation }) => {
  const [getDailyWorkout, setDailyWorkout] = useState();
  const [getDailyMeal, setDailyMeal] = useState({});
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
        console.log(response.data);
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

        // console.log(response.data[0].mealPlans[0].meals.Breakfast, "malePlan")

        if (response.data[0].mealPlans) {
          setDailyMeal(response.data[0].mealPlans[0].meals);
        }
      } catch (error) {}
    };

    getDailyMeals();
  }, [getDailyWorkout]);
  // Calculate total calories for each meals
  const getTotalCalories = (mealItems) => {
    return mealItems?.reduce(
      (totalCalories, item) => totalCalories + parseInt(item.calories),
      0
    );
  };
  // Calculate total calories for all meals
  const totalCalories =
    getTotalCalories(getDailyMeal?.Breakfast) +
    getTotalCalories(getDailyMeal?.Lunch) +
    getTotalCalories(getDailyMeal?.Dinner);

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
            {Object.keys(getDailyMeal).length !== 0 ? (
              <View className="mt-2">
                <View style={styles.totalCaloriesContainer}>
                  <Text style={styles.subHeading2}>Breakfast</Text>
                  <View style={styles.totalCalories}>
                    <Text style={styles.totalCaloriesText}>
                      {getTotalCalories(getDailyMeal.Breakfast)} CAL
                    </Text>
                  </View>
                </View>
                <View style={styles.mealCont}>
                  {getDailyMeal.Breakfast.map((item, index) => (
                    <View
                      key={index}
                      style={{ ...styles.cardBg, ...styles.selectedFoodsList }}
                    >
                      <View style={styles.selectedFoodItem}>
                        <Text style={styles.selectedFoodName}>{item.name}</Text>
                        <Text className="px-1" style={styles.exerciseDetails}>
                          {item.calories}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.totalCaloriesContainer}>
                  <Text style={styles.subHeading2}>Lunch</Text>
                  <View style={styles.totalCalories}>
                    <Text style={styles.totalCaloriesText}>
                      {getTotalCalories(getDailyMeal.Lunch)} CAL
                    </Text>
                  </View>
                </View>
                <View style={styles.mealCont}>
                  {getDailyMeal.Lunch.map((item, index) => (
                    <View
                      key={index}
                      style={{ ...styles.cardBg, ...styles.selectedFoodsList }}
                    >
                      <View style={styles.selectedFoodItem}>
                        <Text style={styles.selectedFoodName}>{item.name}</Text>
                        <Text className="px-1" style={styles.exerciseDetails}>
                          {item.calories}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.totalCaloriesContainer}>
                  <Text style={styles.subHeading2}>Dinner</Text>
                  <View style={styles.totalCalories}>
                    <Text style={styles.totalCaloriesText}>
                      {getTotalCalories(getDailyMeal.Dinner)} CAL
                    </Text>
                  </View>
                </View>

                <View style={styles.mealCont}>
                  {getDailyMeal.Dinner.map((item, index) => (
                    <View
                      key={index}
                      style={{ ...styles.cardBg, ...styles.selectedFoodsList }}
                    >
                      <View style={styles.selectedFoodItem}>
                        <Text style={styles.selectedFoodName}>{item.name}</Text>
                        <Text className="px-1" style={styles.exerciseDetails}>
                          {item.calories}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View>
                  <View style={styles.totalCaloriesContainer}>
                    <Text style={{...styles.subHeading2, fontSize: 15}}>Total Calories:</Text>
                    <View>
                      <Text
                        style={{
                          ...styles.totalCaloriesText,
                          ...styles.exerciseDetails,
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
                        {totalCalories} CAL
                      </Text>
                    </View>
                  </View>
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
    fontSize: 18,
    fontWeight: "600",
  },
  subHeading: {
    marginTop: 2,
    fontSize: 13,
    color: "#1E1E1E8F",
  },
  subHeading2: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
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
  exerciseDetails: {
    fontSize: 13,
    color: "#0077CA",
  },
  selectedFoodsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedFoodItem: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedFoodName: {
    fontSize: 15,
  },
  totalCaloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  totalCalories: {
    backgroundColor: "#0077CA",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  totalCaloriesText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
  },
});

export default Goals;
