import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  const { register, handleSubmit, setValue } = useForm();
  const usernameRef = useRef();
  const paasswordRef = useRef();
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        autoCapitalize="none"
        onSubmitEditing={onNext(paasswordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        disabled={false}
        text="Log In"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
