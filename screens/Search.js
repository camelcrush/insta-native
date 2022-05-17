import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, TextInput, Text, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const { register, setValue, watch } = useForm();
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholder="Search Photos"
      placeholderTextColor="black"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);
  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: "white" }}>Photo</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
}
