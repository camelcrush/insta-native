import React, { useRef } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount() {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (onNext) => {
    onNext?.current?.focus();
  };
  const onDone = () => {
    alert("Done");
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      >
        <TextInput
          autoFocus
          placeholder="First Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(lastNameRef)}
        />
        <TextInput
          ref={lastNameRef}
          placeholder="Last Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(usernameRef)}
        />
        <TextInput
          ref={usernameRef}
          placeholder="Username"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          placeholderTextColor="gray"
          returnKeyType="next"
          keyboardType="email-address"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          returnKeyType="done"
          style={{ backgroundColor: "white", width: "100%" }}
          onSubmitEditing={onDone}
        />
        <AuthButton
          text="Create Account"
          disabled={true}
          onPress={() => null}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
