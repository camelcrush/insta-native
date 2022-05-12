import React from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container>
        <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}
