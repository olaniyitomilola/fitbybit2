import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/Login";
import ResetPassword from "./src/screens/ResetPassword";
import ResetConfirmation from "./src/screens/ResetConfirmation";
import RegisterScreen from "./src/screens/Register";
import WelcomeProfile from "./src/components/userProfile/welcomeProfile";
import ProfileSetup from "./src/components/userProfile/profileSetup";
import FitnessLevel from "./src/components/userProfile/fitnessLevel";
import WeightCalculator from "./src/components/userProfile/weightCalculator";
import BMRProfile from "./src/components/userProfile/BMRProfile";
import SetupCompleted from "./src/components/userProfile/setupCompleted";
import Notification from "./src/components/userProfile/notification";
import UserProfile from "./src/components/dashboard/userprofile";
import LoaderPage from "./src/screens/LoaderPage";
import ExercisePage from "./src/components/dashboard/exercisesPage";
import EditProfile from "./src/components/dashboard/editProfile";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoaderPage"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LoaderPage" component={LoaderPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen
            name="ResetConfirmation"
            component={ResetConfirmation}
          />
          <Stack.Screen name="WelcomeProfile" component={WelcomeProfile} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="FitnessLevel" component={FitnessLevel} />
          <Stack.Screen name="Calculator" component={WeightCalculator} />
          <Stack.Screen name="BMR" component={BMRProfile} />
          <Stack.Screen name="Completed" component={SetupCompleted} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ExercisePage" component={ExercisePage} />
          <Stack.Screen name="EditProfile" component={EditProfile} />



        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
