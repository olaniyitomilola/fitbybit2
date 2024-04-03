import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { calculateBMI, retrieveData } from "../../../helper";



const CustomTextInput = React.memo(
  ({
    iconName,
    placeholder,
    secureTextEntry,
    onChangeText,
    value,
    editable = true,
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
            editable={editable}
            {...rest}
          />
        </View>
      ),
      [placeholder, value, rest, editable]
    );
  }
);

const BMRProfile = ({ navigation }) => {
const [bmiDescriptor, setBmiDescriptor]= useState("");


  useEffect(()=>{
    retrieveData('userdata').then((data)=> setBmiDescriptor(calculateBMI(data.height, data.weight)))
  },[])

  /* Navigations*/
  const goBack = () => {
    navigation.navigate("Calculator");
  };

  const goToCompleteSetup = () => {
    navigation.navigate("Completed");
  };
  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCompleteSetup}>
        <Text style={styles.buttonText}>Finish Setup</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToCompleteSetup}>
        <Text style={styles.buttonText}>Finish Setup</Text>
      </Pressable>
    ),
  });

  return (
    <View style={styles.appContainer}>
      <View style={styles.overlayContainer}>
        <View style={styles.curveBackground}>
          <View style={styles.imageStyle} className="mt-2">
            <View className="items-center">
              <Image source={require("../../../assets/Images/clip.png")} />
            </View>

            <View className="mt-4">
              {/* <Text style={styles.heading}>BMR : 18.4</Text> */}
              <Text className="leading-6 mt-2" style={styles.textBottom}>
                {bmiDescriptor}
                {/* You’re slightly underweight but{"\n"}don’t worry, we are here to{" "}
                {"\n"}help you!{"\n"} */}
              </Text>
            </View>
          </View>
         

          <View>
            <ButtonComponent />
          </View>
        </View>
      </View>

      <View style={styles.closeIcon}>
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color="black"
          onPress={goBack}
        />
      </View>

      <View className="mt-8">
        <Text style={styles.logoText}>Calculate</Text>
        <Text style={styles.textSub}>your weight class.</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomTextInput placeholder="How tall are you? (m)" editable={false} />
        <CustomTextInput placeholder="How old are you?" editable={false} />
        <CustomTextInput
          placeholder="How much do you weigh? (Kg)"
          editable={false}
        />
      </View>

      {/* <View style={styles.divBottom}>
        <ButtonComponent />
        
      </View> */}
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
  overlayContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
  },
  curveBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
    // paddingTop: 189,
    width: "100%",
  },

  heading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "700",
    textAlign: "center",
  },
  textBottom: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    color: "#1E1E1E8F",
    fontWeight: "500",
    textAlign: "center",
  },
  imageStyle: {
    marginBottom: Platform.OS === "ios" ? 95 : 0,
  },

  closeIcon: {
    fontSize: 18,
    color: "#1E1E1E8F",
    marginTop: 8,
  },

  logoText: {
    fontSize: 29,
    color: "#262626",
    fontWeight: "700",
  },
  textSub: {
    fontSize: 29,
    color: "#262626",
    fontWeight: "700",
    top: 5,
  },
  textInputWrapper: Platform.select({
    ios: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      //   backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.5)",
      paddingHorizontal: 16,
    },
    android: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.5)",
      paddingHorizontal: 16,
    },
  }),

  textInput: Platform.select({
    ios: {
      color: "#262626",
      flex: 1,
      paddingVertical: 16,
      paddingLeft: 3,
    },
    android: {
      color: "#262626",
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 3,
    },
  }),

  buttonIOS: {
    backgroundColor: "#0077CA",
    padding: 18,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default BMRProfile;
