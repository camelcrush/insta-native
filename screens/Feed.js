import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
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
  const { data, error, loading, refetch } = useQuery(FEED_QUERY);
  const [refreshing, setRefreshing] = useState(false);
  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
