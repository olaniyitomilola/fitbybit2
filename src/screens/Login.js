import React, { useState, useMemo, useEffect } from "react";
import { postRequest, saveToken,getRequest } from "../../helper";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

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
            secureTextEntry={iconName === "lock" ? !isPasswordVisible : false}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
          {iconName === "lock" && (
            <FontAwesome5
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={13}
              color="#1E1E1E8F"
              onPress={togglePasswordVisibility}
            />
          )}
        </View>
      ),
      [iconName, placeholder, isPasswordVisible, onChangeText, value, rest]
    );
  }
);

const Login = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  /* Navigations */
  const goToRegisterPage = () => {
    navigation.navigate("Register");
  };
  const goToResetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  const goToUserprofile = () => {
    navigation.navigate("UserProfile");
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        setLoading(true); // Start loading
        const userData = { email, password };
  
        // Call the postRequest function to send login data and receive response
        const response = await postRequest("Auth/UserLogin", userData);
        // console.log(response, "login");
  
        if (response && response.success) {
          const accessToken = response.data.accessToken;
  
          // Save access token to AsyncStorage
          await saveToken(accessToken);
        
  
          // Fetch user data using access token
          const userDataResponse = await getRequest("Auth/GetUser", {
            Authorization: `Bearer ${accessToken}`,
          });
          // console.log(userDataResponse, "userData");
  
          // Check if the response is successful
          if (userDataResponse && userDataResponse.success) {
            // Set success message and navigate to user profile
            setSuccessMessage("Login Successful");
            setTimeout(() => {
              navigation.navigate("UserProfile");
            }, 2000);
          } else {
            // Set error message if user data retrieval fails
            setErrorMessage(userDataResponse.message || "Failed to retrieve user data");
          }
        } else {
          // Set error message if login fails
          setErrorMessage(response.message || "Login failed");
        }
  
        setLoading(false); // Stop loading
      } else {
        // Handle the case where email or password is missing
        setErrorMessage("Please fill out all fields.");
        setTimeout(clearMessages, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false); // Stop loading
    }
  };
  
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="small" color="white" /> : "Login"}
        </Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="small" color="white" /> : "Login"}
        </Text>
      </Pressable>
    ),
  });

  // useEffect(()=>{
  //   getRequest('auth/getallusers')
  //   .catch(error=>console.log(error))
  //   .then(d=>console.log(d))
  // },[])
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

      {/* Success message */}
      {successMessage !== "" && (
        <View style={{ ...styles.errorContainer, backgroundColor: "green" }}>
          <Text style={{ ...styles.errorText, color: "white" }}>
            {successMessage}
          </Text>
        </View>
      )}
      <View style={styles.imageAndTextContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={goToRegisterPage}
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        <Text style={styles.logoText}>Welcome back,</Text>
        <Text style={styles.textSub}>Login to your account.</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomTextInput
          iconName="envelope"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          iconName="lock"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>

        <View style={styles.imageRow}>
          <Image
            source={require("../../assets/Images/apple-icon.png")}
            style={styles.image}
          />
          <View style={styles.imageSpacer} />
          <Image
            source={require("../../assets/Images/google-icon.png")}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.divBottom}>
        <ButtonComponent />
        <View style={styles.bottomText}>
          <Text style={styles.bottomTextContent}>
            Can’t remember your Password?{" "}
            <Text style={styles.linkText} onPress={goToResetPassword}>
              Reset it
            </Text>
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
      paddingLeft: 10,
    },
    android: {
      color: "#262626",
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 10,
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
  divBottom: Platform.select({
    ios: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 20,
    },
    android: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 10,
    },
  }),
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
export default Login;
