import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data, error, loading } = useQuery(FEED_QUERY);
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
