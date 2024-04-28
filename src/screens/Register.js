import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { getRequest, postRequest, saveData} from "../../helper";
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

const Register = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  /* Navigations*/
  const goToSplashScreen = () => {
    navigation.navigate("Splash");
  };
  const goToProfile = async () => {
    if (firstName && lastName && email && phoneNumber&& password && confirm) {
      if (firstName.length < 3 || lastName.length < 3) {
        setErrorMessage("Name cannot be less than three characters");
      } else {
        //validate email pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
          setErrorMessage("Invalid Email format");
          return;
        }
        //check if email already exists
        try {
          setLoading(true); // Start loading
          let response = await getRequest(`auth/validateemail?email=${email}`);
          if (response.success) {
            setErrorMessage("You already have an account, try to log in");
          } else {
            //check password
            if (password.length < 8) {
              setErrorMessage("password must be atleast 8 characters");
            } else {
              //check if passwords are same
              if (password !== confirm) {
                setErrorMessage("Password should be the same");
              } else {
                // store details locally, for usage in other pages

                const data = {
                  firstName,
                  lastName,
                  email,
                  password,
                  phoneNumber
                };
                await saveData("userdata", data);
                // console.log(data, "userdata")
             
                setTimeout(() => {
                  navigation.navigate("WelcomeProfile");
                }, 2000);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setLoading(true);
      setErrorMessage("Please fill out all fields.");
    }

    setTimeout(() => {
      setLoading(false); //stop loading
    }, 1000);
  };

  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToProfile}>
        <Text style={styles.buttonText}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Register"
          )}
        </Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToProfile}>
        <Text style={styles.buttonText}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Register"
          )}
        </Text>
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
      {/* Success message */}
      {successMessage !== "" && (
        <View style={{ ...styles.errorContainer, backgroundColor: "green" }}>
          <Text style={{ ...styles.errorText, color: "white" }}>
            {successMessage}
          </Text>
        </View>
      )}
      <View style={styles.imageAndTextContainer}>
        <View style={styles.closeIcon}>
          <AntDesign
            name="close"
            size={32}
            color="black"
            onPress={goToSplashScreen}
          />
        </View>
      </View>
      <View className="mt-2">
        <Text style={styles.logoText}>Welcome back,</Text>
        <Text style={styles.textSub}>Create an account.</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomTextInput
          iconName="user"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomTextInput
          iconName="user"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <CustomTextInput
          iconName="envelope"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          iconName="phone"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <CustomTextInput
          iconName="lock"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomTextInput
          iconName="lock"
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
        />
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
  subTerms: {
    textAlign: "center",
    color: "#0077CA",
    // color: Platform.OS === "ios" ? "#0077CA" : "red",
  },
  icon: {
    marginRight: 5,
  },
  orText: Platform.select({
    ios: {
      fontSize: 18,
      color: "#1E1E1E8F",
      marginBottom: 25,
    },
    android: {
      fontSize: 12,
      color: "#1E1E1E8F",
      marginBottom: 0,
    },
  }),

  imageRow: Platform.select({
    ios: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    android: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
  }),

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
    marginTop: 10,
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
  termsText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#1E1E1E8F",
    lineHeight: 20,
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

export default Register;
