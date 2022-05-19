import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 1;
`;

export default function SelectPhoto({ navigation }) {
  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  );
}
