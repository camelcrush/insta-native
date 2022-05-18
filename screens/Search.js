import React, { useEffect } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TouchableOpacity, TextInput, Text, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { ActivityIndicator } from "react-native";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 15px;
`;

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  const { register, setValue, watch, handleSubmit } = useForm();
  const onValid = ({ keyword }) => {
    startQueryFn({ variables: { keyword } });
  };
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
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
    });
  }, []);
  console.log(data);
  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined &&
        data?.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not found.</MessageText>
          </MessageContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
