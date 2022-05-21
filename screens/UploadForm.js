import React from "react";
import { StatusBar } from "react-native";
import { Text, View } from "react-native";

export default function UploadForm({ route }) {
  console.log(route);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text>UploadForm</Text>
    </View>
  );
}
