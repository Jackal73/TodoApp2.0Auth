import React from "react";
import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from "react-native";

import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";

export default function Login({ navigation }) {
  const background = require("../assets/background.jpg");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  return (
    <ImageBackground style={AppStyles.container} source={background}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#bebebe"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Password"
          placeholderTextColor="#bebebe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton text=" Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </View>
        <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Forget your password? </Text>
          <InlineTextButton text=" Reset" onPress={() => navigation.navigate("ResetPassword")} />
        </View>
        <Button title="Login" color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
