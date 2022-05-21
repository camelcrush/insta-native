import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
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
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "reverse-row" : "row")};
  align-items: flex-end;
  margin: 10px 10px;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 20px;
`;
const Message = styled.Text`
  color: white;
  font-size: 16px;
  background-color: ${(props) =>
    props.outGoing ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.3)"};
  border: 1px solid
    ${(props) =>
      props.outGoing ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"};
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0px 10px;
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
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      {message.user.username == route?.params?.talkingTo?.username ? (
        <Author>
          <Avatar source={{ uri: message.user.avatar }} />
        </Author>
      ) : null}
      <Message
        outGoing={message.user.username !== route?.params?.talkingTo?.username}
      >
        {message.payload}
      </Message>
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
