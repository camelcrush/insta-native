import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { KeyboardAvoidingView } from "react-native";

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        read
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;

const MessageContainer = styled.View`
  width: 100%;
`;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;

const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1000px;
  color: white;
`;

export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo.username}`,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  return (
    <ScreenLayout loading={loading}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom.messages}
          keyExtractor={(message) => message.id + ""}
          renderItem={renderItem}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Writing a message..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          returnKeyLabel="Send"
          returnKeyType="send"
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
