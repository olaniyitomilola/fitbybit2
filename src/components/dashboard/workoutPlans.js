import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { getRequest } from "../../../helper";
import CreateWorkoutModal from "./createWorkoutModal";

const WorkoutPlans = ({ navigation }) => {
  const [workoutPlanData, setWorkoutPlan] = useState("");
  const [populateWorkouts, setPopulateWorkout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkoutPlanId, setSelectedWorkoutPlanId] = useState(null); 


  const CreateWorkout = async () => {
    try{

      const currentDate = new Date().toISOString().split("T")[0]; 
      const requestData = {
        date: currentDate,
      };

      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await postRequest("Workout/CreateWorkoutPlan", requestData, {
        Authorization: `Bearer ${accessToken}`,
      });
      console.log(response, "sentpost");

    }catch{

    }
    setModalVisible(false);
  };

  const CancelWorkout = () => {
    setModalVisible(false);
  };
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
    },
  ];

  const getWorkouts = async () => {
    if (goal && level) {
      setIsLoading(true);
      try {
     
        const workouts = await getRequest(
          `workout/getAllworkouts?FitnessLevel=${level}&Category=${goal}`
        );
        if (workouts.success) {
          setWorkoutPlan(workouts.data);
          setPopulateWorkout(true);
      
        }
        setIsLoading(false);
        // console.log(workouts)
      } catch (error) {
        setIsLoading(false);
      }
    }
  };



  const WorkoutButton = Platform.select({
    ios: () => (
      <Pressable onPress={getWorkouts} style={styles.buttonIOS}>
      
       <Text style={styles.buttonText}>View Workouts</Text>
     
          {/* {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>View Workouts</Text>
          )} */}
    
      </Pressable>
    ),
    android: () => (
      <Pressable onPress={getWorkouts} style={styles.buttonIOS}>
          <Text style={styles.buttonText}>View Workouts</Text>
      </Pressable>
    ),
  });
  
  const handleWorkoutPress = (workoutId) => {
    console.log(workoutId, "id")
    setSelectedWorkoutPlanId(workoutId);
    setModalVisible(true);
  };
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 8 }}>
      <Text style={styles.heading2}>Select a Workout Plan </Text>
      {/* Use DropDownPicker for selecting level */}
      <RNPickerSelect
        onValueChange={(value) => setLevel(value)}
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
        onValueChange={(value) => setGoal(value)}
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
      <View className="mt-8">
        {populateWorkouts &&
          workoutPlanData.map((item) => (
            <View key={item.workoutName} style={styles.imageAndTextContainer}>
              <Image
                source={require("../../../assets/Images/cardio.png")}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.heading}>{item.workoutName}</Text>
                <Text style={styles.heading}>{item.id}</Text>
              </View>
              <Text style={{ ...styles.heading, marginTop: 5 }}>
                {" "}
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={28}
                  color="white"
                  onPress={() => handleWorkoutPress(item.id)}
                />
              </Text>
            </View>
          ))}
      </View>

      {/* <View className="mt-4">
        <ButtonComponent />
      </View> */}

      <CreateWorkoutModal
        visible={modalVisible}
        onConfirm={CreateWorkout}
        onCancel={CancelWorkout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
    color: "white",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#0077CA",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
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
