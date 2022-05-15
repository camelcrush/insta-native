import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { logUserOut } from "../apollo";

export default function Feed({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={logUserOut}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
