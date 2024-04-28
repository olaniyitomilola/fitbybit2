import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import LogoutModal from "./logoutModal";

const Logout = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const confirmLogout = () => {
    // Perform logout action here
    // For example, clear user data, navigate to login screen, etc.
    // After logout, navigate to the login screen
    navigation.navigate("Login");
    setModalVisible(false);
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View className="px-2 py-8" >
        <Text className="mb-2 text-2xl font-bold" style={{ color: "#0077CA"}}>Edit Profile</Text>
        <Text
          className="mb-2 text-2xl font-bold" style={{ color: "#0077CA"}}
          onPress={() => setModalVisible(true)}
        >
          Log out
        </Text>
        <Text className="mb-2 text-2xl font-bold" style={{ color: "#0077CA"}}>Delete Account </Text>
      </View>
      <Button title="Yes" onPress={() => setModalVisible(true)} />
      <LogoutModal
        visible={modalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </View>
  );
};

export default Logout;
