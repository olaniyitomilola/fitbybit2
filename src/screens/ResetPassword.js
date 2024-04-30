import React, { useState,  useMemo} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { removeData, saveData } from "../../helper";

const CustomTextInput = React.memo(
  ({
    iconName,
    placeholder,
    secureTextEntry,
    onChangeText,
    value,
    ...rest
  }) => {
    const handleTextChange = (text) => {
     // console.log("email:", text); 
      onChangeText(text);
    };
 
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
            onChangeText={handleTextChange}
            {...rest}
          />
        </View>
      ),
      [iconName, placeholder,onChangeText, value, rest]
    );
  }
);

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
    // navigation link
  
  
  const goBack = () => {
    if(email){
      removeData("email")
    }
    navigation.navigate("Login");
  };

  const resetLink = () =>{
    // console.log(email)
    if(email){
      saveData("email",email)
      navigation.navigate("ResetConfirmation");

    }
  }
    /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={resetLink}>
        <Text style={styles.buttonText} >Request Reset Link</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={resetLink}>
        <Text style={styles.buttonText}>Request Reset Link</Text>
      </Pressable>
    ),
  });

  return (
    <View style={styles.appContainer}>
      <View style={styles.imageAndTextContainer}>
        <View style={styles.closeIcon}>
        <MaterialIcons name="arrow-back-ios" size={32} color="black" onPress={goBack}/>
        </View>
      
      </View>
      <View className="mt-4">
        <Text style={styles.logoText}>Reset your Password.</Text>
        <Text style={styles.textSub}>Enter your email address </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomTextInput iconName="envelope" placeholder="Email Address" 
        value={email}
        onChangeText={setEmail}
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
    color: "#262626",
    fontWeight: "700",
  },
  textSub: {
    fontSize: 17,
    color: "#1E1E1E8F",
    fontWeight: "500",
    top: 5,
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
  divBottom: Platform.select({
    ios: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 40,
    },
    android: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 20,
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

export default ResetPassword;
