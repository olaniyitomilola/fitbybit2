import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { getRequest } from "../../../helper";

const WorkoutPlans = ({ navigation }) => {
  const [workoutPlanData, setWorkoutPlan] = useState("")
  const [populateWorkouts, setPopulateWorkout] = useState(false);
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

  const getWorkouts = async ()=>{
    if(goal && level){

        try{
          const workouts = await getRequest(`workout/getAllworkouts?FitnessLevel=${level}&Category=${goal}`)
          if(workouts.success){
              setWorkoutPlan(workouts.data);
              setPopulateWorkout(true)
          }
          console.log(workouts)

        }catch(error){
          console.log(error)
        }
         
    }
  }

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
      <Pressable on onPress={getWorkouts} style={styles.buttonIOS}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable onPress={getWorkouts} style={styles.buttonIOS}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </Pressable>
    ),
  });
  const [level, setLevel] = useState("");
  const [goal,setGoal] = useState("")


  return (
    <View style={{ flex: 1, padding: 10, marginTop: 8 }}>

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
      <View>
        {populateWorkouts && workoutPlanData.map((item) => (
          <View key={item.workoutName} style={styles.imageAndTextContainer}>
            <Image source={require("../../../assets/Images/cardio.png")} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.heading}>{item.workoutName}</Text>
            </View>
            <Text style={{ ...styles.heading, marginTop: 5 }}>
              {" "}
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="white"
                onPress={()=> console.log("pressed")}
              />
            </Text>
          </View>
        ))}
      </View>

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
    paddingLeft: 10,
    color: "white"

  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 10,
    borderRadius:10,
    
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
