import React from "react";
import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from "react-native";

import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";

export default function ResetPassword({ navigation }) {
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
        <Text style={[AppStyles.lightText, AppStyles.header]}>Reset Password</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#bebebe"
          value={email}
          onChangeText={setEmail}
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton text=" Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </View>
        <Button title="Reset Password" color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
