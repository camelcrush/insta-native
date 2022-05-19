import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { top: 0, backgroundColor: "white" },
      }}
    >
      <Tab.Screen name="TabSelect">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerStyle: { backgroundColor: "black", shadowOpacity: 0.3 },
              headerBackImage: ({ tintColor }) => (
                <Ionicons name="close" color={tintColor} size={26} />
              ),
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a Photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
