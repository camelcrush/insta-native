import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AsyncStorageWrapper,
  persistCache,
  CachePersistor,
} from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    // await persistCache({
    //   cache,
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    // });
    const persistor = new CachePersistor({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    await persistor.purge();
    await persistor.restore();
    return preloadAssets();
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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
