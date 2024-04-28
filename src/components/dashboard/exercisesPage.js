import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getRequest } from "../../../helper";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExercisePage = ({ route, navigation }) => {
  const { category, workoutName } = route.params;
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Call the API to get exercises by workout name
        const response = await getRequest(
          `Workout/GetExercisesByWorkoutName?name=${workoutName}`
        );
        const exercisesForWorkout =
          response?.data?.exercises[workoutName] || [];
          // Initialize the checked status for each exercise as false

          //console.log(exercisesForWorkout)
        const exercisesWithCheck = exercisesForWorkout.map((exercise) => ({
          ...exercise,
          checked: false,
        }));
        // Load checked exercises from AsyncStorage
        const savedExercises = await loadCheckedExercises();
        // Merge saved checked status with exercises data
        const updatedExercises = exercisesWithCheck.map((exercise) => ({
          ...exercise,
          checked: savedExercises.includes(exercise.id),
        }));
        setExercises(updatedExercises);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching exercises:", error);
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [workoutName]);

  const goBack = () => {
    navigation.navigate("UserProfile");
  };

  // Function to toggle the checked status of an exercise
  const toggleExerciseChecked = async (index) => {
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[index].checked = !updatedExercises[index].checked;
      return updatedExercises;
    });
    // Save checked exercises to AsyncStorage
    const checkedExercisesIds = exercises
      .filter((exercise) => exercise.checked)
      .map((exercise) => exercise.id);
    await saveCheckedExercises(checkedExercisesIds);
  };

  // Function to save checked exercises to AsyncStorage
  const saveCheckedExercises = async (checkedExercisesIds) => {
    try {
      await AsyncStorage.setItem(
        "checkedExercises",
        JSON.stringify(checkedExercisesIds)
      );
    } catch (error) {
      // console.error("Error saving checked exercises:", error);
    }
  };

  // Function to load checked exercises from AsyncStorage
  const loadCheckedExercises = async () => {
    try {
      const savedExercises = await AsyncStorage.getItem("checkedExercises");
      return savedExercises ? JSON.parse(savedExercises) : [];
    } catch (error) {
      // console.error("Error loading checked exercises:", error);
      return [];
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50, padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.closeIcon}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color="black"
              onPress={goBack}
            />
          </View>
          <View>
            <Text style={styles.category}>{workoutName}</Text>
          </View>
        </View>

        <View className="mt-4">
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : exercises?.length === 0 ? (
            <Text>No exercises available for {workoutName}.</Text>
          ) : (
            <View>
              {exercises.map((exercise, index) => {
                return (
                  <View style={styles.cardBg} key={index}>
                    <Text style={styles.exerciseName}>
                      {exercise.exerciseName}
                    </Text>

                    <View style={styles.imageAndTextContainer}>
                      {exercise.reps ? (
                        <Text style={styles.exerciseDetails}>
                          No of Reps: {exercise.reps}
                        </Text>
                      ) : (
                        <Text style={styles.exerciseDetails}>No Reps</Text>
                      )}

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          checked={exercise.checked}
                          onPress={() => toggleExerciseChecked(index)}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 18,
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 15,
    color: "#0077CA",
  },
  closeIcon: {
    marginRight: 10,
  },
  cardBg: {
    backgroundColor: "#F6F7FB",
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#B8BABE",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    marginTop: -28,
    marginLeft: "auto",
  },
});

export default ExercisePage;
