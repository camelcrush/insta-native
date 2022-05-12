import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  margin: 0 auto;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
