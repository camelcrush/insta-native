import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Profile({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route?.params?.username,
      });
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Profile</Text>
    </View>
  );
}
