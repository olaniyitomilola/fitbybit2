import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { removeData, retrieveData } from "../../helper";

const CustomTextInput = React.memo(
  ({
    iconName,
    placeholder,
    secureTextEntry,
    onChangeText,
    value,
    ...rest
  }) => {
    return useMemo(
      () => (
        <View style={styles.textInputWrapper}>
          <FontAwesome5
            name={iconName}
            size={13}
            color="#1E1E1E8F"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#1E1E1E8F"
            {...rest}
          />
        </View>
      ),
      [iconName, placeholder, onChangeText, value, rest]
    );
  }
);

const ResetConfirmation = ({ navigation }) => {
  // navigation link
  const goBack = () => {
    removeData("email")
    navigation.navigate("Login");
  };
  const [email,setEmail] = useState("");

  useEffect(()=>{
    retrieveData("email").then((data)=>setEmail(data))
  },[])

  return (
    <View style={styles.appContainer}>
             <View style={styles.closeIcon}>
        <MaterialIcons name="arrow-back-ios" size={32} color="black" onPress={goBack}/>
        </View>
      <View className="mt-20 items-center">
        <View>
          <Image source={require("../../assets/Images/email-icon.png")} />
        </View>
        <View className="mt-8"> 
          <Text style={styles.logoText} className="leading-7">
            Check your email
          </Text>
          <Text style={styles.textSub} className="leading-7">
            We sent an email to{"\n"} <Text style={{fontWeight:"600", color: "#262626"}}>{email}</Text>{"\n"} with a reset
            code{" "}
          </Text>

         
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
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 8,
  },

  logoText: {
    fontSize: 29,
    color: "#1E1E1E8F",
    fontWeight: "700",
  },
  textSub: {
    fontSize: 19,
    color: "#1E1E1E8F",
    fontWeight: "500",
    top: 5,
    textAlign: "center",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B8BABE",
    paddingHorizontal: 16,
  },
  textInput: {
    color: "#262626",
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
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
    marginTop: 486,
  },
});

export default ResetConfirmation;
