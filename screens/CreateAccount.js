import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      const { username, password } = getValues();
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: { ...data },
      });
    }
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("username"), { required: true };
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        autoCorrect={false}
        placeholder="First Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={lastNameRef}
        autoCorrect={false}
        placeholder="Last Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        ref={usernameRef}
        autoCorrect={false}
        placeholder="Username"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        loading={loading}
        disabled={
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
