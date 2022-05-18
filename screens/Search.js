import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

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

const Input = styled.TextInput`
  background-color: "rgba(255,255,255,1)";
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width, height } = useWindowDimensions();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(
    SEARCH_PHOTOS,
    {
      fetchPolicy: "network-only",
    }
  );
  const { register, setValue, watch, handleSubmit } = useForm();
  const onValid = ({ keyword }) => {
    startQueryFn({ variables: { keyword } });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search Photos"
      placeholderTextColor="rgba(0,0,0,0.8)"
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
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: height / 6 }}
      />
    </TouchableOpacity>
  );
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
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not found.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(item) => item.id + ""}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
