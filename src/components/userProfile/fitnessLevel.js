import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { saveData, retrieveData } from "../../../helper";

const FitnessLevel = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    "New to Fitness",
    "Regular to Fitness",
    "Advanced in Fitness",
    "Expert in Fitness",
  ];

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };
  /* Navigations*/
  const goBack = () => {
    navigation.navigate("ProfileSetup");
  };
  const goToCalculator = async () => {
    let userdata = await retrieveData('userdata');
    //add one to selected option and save
    userdata.currentFitness = selectedOption + 1;
    await saveData("userdata",userdata)
    navigation.navigate("Calculator");
  };
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCalculator}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCalculator}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
  });

  return (
    <View style={styles.appContainer}>
      <View style={styles.closeIcon}>
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color="black"
          onPress={goBack}
        />
      </View>
      <View className="mt-8 items-center">
        <Text style={styles.logoText}>What is your current fitness level?</Text>
        <Text className="text-black leading-6" style={styles.textBrand}>
          Choose the one that applies best to you
        </Text>
      </View>

      <View style={styles.imageStyle}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              {
                backgroundColor: selectedOption === index ? "black" : "#F6F7FB",
              },
            ]}
            onPress={() => handleOptionPress(index)}
          >
            <Text
              style={{
                color: selectedOption === index ? "white" : "black",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divBottom}>
        <View>
          <ButtonComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  imageStyle: {
    marginTop: Platform.OS === "ios" ? 50 : 35,
  },
  option: {
    padding: 24,
    marginVertical: 5,
    borderRadius: 28,
    alignItems: "center",
  },
  textBrand: {
    fontSize: 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    top: 5,
  },
  textBottom: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
    bottom: Platform.OS === "ios" ? 25 : 10,
  },
  logoText: {
    fontSize: 28,
    color: "#262626",
    fontWeight: "700",
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
  divBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 80 : 40,
  },
});

export default FitnessLevel;
