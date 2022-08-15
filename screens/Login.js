import React from "react";
import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from "react-native";
import { auth } from "../firebase";
import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {
  const background = require("../assets/background.jpg");

  if (auth.currentUser) {
    navigation.navigate("ToDo");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("ToDo");
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("**Please enter your email and password.");
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={[AppStyles.errorText, AppStyles.topMargin1]}>{errorMessage}</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.darkTextInput, AppStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#bebebe"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[AppStyles.textInput, AppStyles.darkTextInput, AppStyles.lightText]}
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
        <Button title="Login" onPress={login} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
