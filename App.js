import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
