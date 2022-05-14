import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const paasswordRef = useRef();
  const onCompleted = (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      loginMutation({ variables: { ...data } });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        autoCapitalize="none"
        onSubmitEditing={onNext(paasswordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        text="Log In"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
