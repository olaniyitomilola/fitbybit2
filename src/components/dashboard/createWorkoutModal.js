import React from "react";
import { View, Text, Modal, Button, Alert, } from "react-native";
import { postRequest } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateWorkoutModal = ({ visible, workoutId, onCancel }) => {
  const handleConfirm = async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const requestData = {
        date: currentDate,
        workoutId: workoutId,
      };

      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await postRequest(
        "Workout/AddDailyWorkout",
        requestData,
        accessToken
      );
      Alert.alert("Message", response.message);
    } catch (error) {
      console.error("Error while adding daily workout:", error);
    }
    
    onCancel(); // Close the modal after request is completed
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 40,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text className="text-xl">Add to your workout plan?</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button title="Yes" onPress={handleConfirm} />
            <Button title="Cancel" onPress={onCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateWorkoutModal;
