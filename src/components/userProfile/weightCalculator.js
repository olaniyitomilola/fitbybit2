import React, { useState, useMemo } from "react";
import { retrieveData, saveData } from "../../../helper";
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
import { MaterialIcons, AntDesign } from "@expo/vector-icons";


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

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return useMemo(
      () => (
        <View style={styles.textInputWrapper}>
          
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#1E1E1E8F"
            onChangeText={onChangeText}
            {...rest}
          />
        </View>
      ),
      [iconName, placeholder, isPasswordVisible, onChangeText, value, rest]
    );
  }
);


const WeightCalculator = ({ navigation }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const clearMessages = () => {
    setErrorMessage("");
  };
  /* Navigations*/
  const goBack = () => {
    navigation.navigate("FitnessLevel");
  };
  const goToBMR = async () => {
    //validate input type, to be number

    if(weight && height && age){

          // if(!isNaN(weight) || !isNaN(height) || !isNaN(age)){
          //   console.log(weight,age,height)
          //   setErrorMessage("Only numbers required")
          //   return
          // }

          //alidate height. should be between 100cm and 220cm
          if(height < 100 || height > 220){
            setErrorMessage("height should be between 100cm and 220cm")
            return
          }
          //validate that weight is not less 30kg and height than 250kg
          if(weight < 30 || weight > 250){
            console.log(weight)
            setErrorMessage("weight should be between 30kg and 250kg")
            return
          }

           //validate that age is not less 12 and higher than 85
          if(age < 12 || age > 85){
            setErrorMessage("age should be between 12 and 85")
            return
          }
          //store data locally
          let userdata = await retrieveData('userdata');
          //add one to selected option and save
          userdata.age =  age;
          userdata.weight = weight;
          userdata.height = height;
          await saveData("userdata",userdata)
          navigation.navigate("BMR");
    }else{
      // console.log(weight,age,height)
      setErrorMessage("Please fill all the required fields")
      setTimeout(()=>{
        clearMessages();
      },2000)
    }
  };



  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToBMR}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToBMR}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    ),
  });

  return (
    

    <View style={styles.appContainer}>
       {/* Error message */}
      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Pressable onPress={clearMessages}>
            <Text style={styles.clearErrorText}>
              <AntDesign name="close" size={20} color="black" />
            </Text>
          </Pressable>
        </View>
      )}
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
        <CustomTextInput
          placeholder="How tall are you? (cm)"
          value = {height}
          onChangeText ={setHeight}
        />

        <CustomTextInput
          placeholder="How old are you?"
          value = {age}
          onChangeText={setAge} 
        />
        <CustomTextInput  
          placeholder="How much do you weigh? (Kg)"
          value = {weight}
          onChangeText={setWeight}
        />
      </View>

      

      <View style={styles.divBottom}>
        <ButtonComponent />
        
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

  errorContainer: {
    backgroundColor: "#FFCCCC",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#FF0000",
    flex: 1,
  },
  clearErrorText: {
    color: "#FF0000",
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  closeIcon: {
    fontSize: 18,
    color: "#1E1E1E8F",
    marginTop: 8,
  },
  signUpButton: {
    padding: 12,
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    marginTop: 3,
  },
  signUpButtonText: {
    color: "#0077CA",
    fontSize: 15,
    fontWeight: "700",
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
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#B8BABE",
      paddingHorizontal: 16,
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
      paddingLeft: 3,
    },
    android: {
      color: "#262626",
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 3,
    },
  }),
  icon: {
    marginRight: 5,
  },
  orContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  orText: {
    fontSize: 18,
    color: "#1E1E1E8F",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  image: {
    width: 60,
    resizeMode: "contain",
    height: 30,
  },
  imageSpacer: {
    width: 10,
  },
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
  divBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 80 : 40,
  },
  bottomTextContent: {
    color: "#1E1E1E8F",
    fontSize: 14,
  },
  bottomText: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#3498db",
    fontWeight: "700",
  },
});

export default WeightCalculator;
