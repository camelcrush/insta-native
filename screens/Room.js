import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { FlatList, View, KeyboardAvoidingView } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          id
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "reverse-row" : "row")};
  align-items: flex-end;
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
  width: 90%;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1000px;
  color: white;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          id: meData.me.id,
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        data: messageObj,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              id
              username
              avatar
            }
            read
          }
        `,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [messageFragment, ...prev];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    register("message", {
      required: true,
    });
  }, [register]);
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
          style={{ width: "100%", marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => message.id + ""}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Writing a message..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            returnKeyLabel="Send"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              size={22}
              color={
                !Boolean(watch("message")) ? "rgba(255,255,255,0.3)" : "white"
              }
            />
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
