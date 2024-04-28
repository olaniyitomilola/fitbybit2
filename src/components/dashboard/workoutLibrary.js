import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { getRequest, saveData } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";


const WorkoutLibrary = ({ navigation }) => {
  const [workoutData, setWorkoutData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        const response = await getRequest("Workout/GetAllWorkOuts", null, {
          Authorization: `Bearer ${accessToken}`,
        });
  
        setWorkoutData(response.data);

        // Save workout data in AsyncStorage under the key "userdata"
        await saveData("workoutdata", response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    getAllWorkouts();
  }, []);
 

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search workout plans"
              placeholderTextColor="#1E1E1E8F"
            />
          </View>
          <View className="mt-2">

            {workoutData?.map((workout, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  // Navigate to the new page and pass category and exercises data
                  navigation.navigate("ExercisePage", {
                    workoutName: workout.workoutName,
                    
                  });
                }}
              >
                <View style={styles.imageAndTextContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("../../../assets/Images/cardio.png")}
                      style={styles.image}
                    />
                    <View style={styles.overlay} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.heading}>{workout.workoutName}</Text>
                   
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
          {/* // <Text style={styles.heading2}>
                  //   <Entypo name="dot-single" size={14} color="white" />
                  //   {item.number}
                  // </Text> */}
          {/* <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              <AntDesign name="plus" size={18} color="white" />
            </Text>
          </View> */}
        </ScrollView>
      )}
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
    left: "75%",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WorkoutLibrary;
