import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "rgba(255,255,255,0.3)",
          },
          presentation: "card",
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="Messages"
        options={{
          headerShown: false,
          presentation: "card",
          headerBackTitle: false,
        }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
}
