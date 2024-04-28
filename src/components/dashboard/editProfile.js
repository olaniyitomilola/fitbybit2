import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { getRequest,postRequest, putRequest } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

const CustomTextInput = React.memo(
  ({
    iconName,
    placeholder,
    secureTextEntry,
    onChangeText,
    value,
    ...rest
  }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    

    return useMemo(
      () => (
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#1E1E1E8F"
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
        </View>
      ),
      [iconName, placeholder, isPasswordVisible, onChangeText, value, rest]
    );
  }
);
const EditProfile = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    targetWeight: "",
    startingWeight: "",
    currentFitness: "",
    fitnessGoal: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [startingWeight, setStartingWeight] = useState("");
  const [currentFitness, setCurrentFitness] = useState("");

  const goBack = () => {
    navigation.navigate("UserProfile");
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        const response = await getRequest("Auth/GetUser", null, {
          Authorization: `Bearer ${accessToken}`,
        });
        setUserDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    getUserDetails();
  }, []);

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
      name: "Build A Healthy Lifestyle",
      id: 4,
    },
  ];

  const currentFitnessData = [
    {
      name: "New to Fitness",
      id: 1,
    },
    {
      name: "Regular to Fitness",
      id: 2,
    },
 
    {
      name: "Expert in Fitness",
      id: 3,
    },
  ];

  const editProfilePost = async () => {
          setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const editData = {
        targetWeight: userDetails.targetWeight,
        startingWeight: userDetails.startingWeight,
        currentFitness: userDetails.currentFitness,
        fitnessGoal: userDetails.fitnessGoal,
      };
      const response = await putRequest("Auth/UpdateUser",editData, accessToken);
  
      if (!response.success) {
        throw new Error("Failed to update data");
      }
      console.log(response)

      console.log("Data successfully updated");
        // Optionally, you can navigate to another screen or display a success messag
      goBack();
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      // Optionally, display an error message to the user
    }
  };
  
  
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText} onPress={editProfilePost}>Edit Profile</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText} onPress={editProfilePost}>Edit Profile</Text>
      </Pressable>
    ),
  });
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
            <Text style={styles.category}>Edit Profile</Text>
          </View>
        </View>

        <View className="mt-4">
          <RNPickerSelect
            onValueChange={(value) => {
              //   console.log("Selected Value:", value);
              setFitnessGoal(value);
            }}
            items={typeData.map((data) => ({
              label: data.name,
              value: data.id,
            }))}
            style={dropdownStyles}
            value={fitnessGoal} // Set the default value to the state variable
            placeholder={{
              label: userDetails.fitnessGoal
                ? typeData.find((data) => data.id === userDetails.fitnessGoal)
                    ?.name ?? userDetails.fitnessGoal
                : "Select Fitness Goal",
            }}
          />

          <CustomTextInput
            placeholder="Your Target Weight"
            value={userDetails.targetWeight?.toString()}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, targetWeight: text })
            }
          />
          <CustomTextInput
            placeholder="Your Starting Weight"
            value={userDetails.startingWeight?.toString()}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, startingWeight: text })
            }
          />
          <RNPickerSelect
            onValueChange={(value) => {
              //   console.log("Selected Value:", value);
              setCurrentFitness(value);
            }}
            items={currentFitnessData.map((data) => ({
              label: data.name,
              value: data.id,
            }))}
            style={dropdownStyles}
            value={currentFitness} // Set the default value to the state variable
            placeholder={{
              label: userDetails.fitnessGoal
                ? currentFitnessData.find(
                    (data) => data.id === userDetails.currentFitness
                  )?.name ?? userDetails.currentFitness
                : "Select Fitness Goal",
            }}
          />

          <View className="mt-4">
            <ButtonComponent />
          </View>
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
  textInputWrapper: Platform.select({
    ios: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#B8BABE",
      paddingHorizontal: 10,
    },
    android: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#B8BABE",
      paddingHorizontal: 16,
    },
  }),

  textInput: Platform.select({
    ios: {
      color: "#262626",
      flex: 1,
      paddingVertical: 16,
      paddingLeft: 10,
    },
    android: {
      color: "#262626",
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 10,
    },
  }),
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
export default EditProfile;
