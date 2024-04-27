import React from "react";
import { View, Text, Modal, Button } from "react-native";

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 40,
            borderRadius: 20,
            alignItems: "center",
           
          }}
        >
          <Text className="text-xl">Are you sure you want to logout?</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button title="Yes" onPress={onConfirm}/>
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
