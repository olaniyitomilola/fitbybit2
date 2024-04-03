import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Platform,
} from "react-native";

const SplashScreen = ({ navigation }) => {
      /* Navigation*/
  const goToLoginPage = () => {
    navigation.navigate("Login");
  };
  const goToRegisterPage =() =>{
    navigation.navigate("Register");
  }
  {
    /* Button Component*/
  }
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={goToRegisterPage}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={goToRegisterPage}>
        <Text style={{ ...styles.buttonText, fontSize:15 }}>Get Started</Text>
      </Pressable>
    ),
  });
  return (
    <View className="flex-1">
      {/* Background Image */}
      <Image
        source={require("../../assets/Images/splash-screen.png")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      <View className="flex-1 mt-36">
        {/* Brand Logo */}
        <View className="items-center">
          <Image source={require("../../assets/Images/logo.png")} />
        </View>

        {/* Additional content */}

        <View className="bg-primaryColor mt-16 p-5 items-center justify-center">
          <Text className="text-white leading-7" style={styles.textBrand}>
            Fit by Bit is a holistic, interactive and personalized platform that
            makes it easy for you to live your healthiest life! {"\n"}
            Our platform allows you to monitor progress, set adaptive goals, and
            track meals for a well-rounded fitness experience. {"\n"}
          </Text>

          <Text className="text-white leading-7" style={styles.textBrand}>
            Keeping you fit... bit by bit
          </Text>
        </View>
        <View style={styles.divBottom}>
          <ButtonComponent />
          <View style={styles.bottomText}>
            <Text style={styles.bottomTextContent}>
              Already a member?{" "}
              <Text
                className="text-primaryColor"
                style={{ fontWeight: "700" }}
                onPress={goToLoginPage}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textBrand: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonIOS: {
    backgroundColor: "#0077CA",
    padding: 18,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  divBottom: Platform.select({
    ios: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 20, 
    },
    android: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 0,
    },
  }),

  bottomTextContent: {
    color: "#1E1E1E8F",
    fontSize: 14,
  },
  bottomText: {
    padding: 5,
    alignItems: "center",
  },
});
