import React from "react";
import { Text, View } from "react-native";

export default function Likes() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Likes</Text>
    </View>
  );
}
