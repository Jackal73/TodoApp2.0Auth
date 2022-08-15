import { Button, View, ImageBackground, FlatList, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import AppStyles from "../styles/AppStyles";
import { auth, db } from "../firebase";
import { signOut, updatePassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";

export default function ManageAccount({ navigation }) {
  const background = require("../assets/background.jpg");

  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  let updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        updatePassword(user, newPassword)
          .then(() => {
            setNewPassword("");
            setErrorMessage("");
            setCurrentPassword("");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("**Please enter current password to delete account.");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          // Get all todos for user and delete
          let batch = writeBatch(db);
          const q = query(collection(db, "todos"), where("userId", "==", user.uid));
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user)
              .then(() => {
                navigation.popToTop();
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      {/* <View style={styles.container}> */}
      <View style={[{ flexDirection: "row" }]}>
        <View style={[styles.divider]} />
        <Text style={[styles.title]}>
          Listit <Text style={{ fontWeight: "bold", color: colors.darkGray }}>2.0</Text>
        </Text>
        <View style={[styles.divider]} />
      </View>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.darkTextInput,
          AppStyles.lightText,
          AppStyles.margin1,
          AppStyles.topMargin3,
        ]}
        placeholder="Current Password"
        placeholderTextColor="#bebebe"
        value={currentPassword}
        secureTextEntry={true}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.darkTextInput,
          AppStyles.lightText,
          AppStyles.bottomMargin2,
          AppStyles.margin1,
        ]}
        placeholder="New Password"
        placeholderTextColor="#bebebe"
        value={newPassword}
        secureTextEntry={true}
        onChangeText={setNewPassword}
      />
      <Button title="Update Password" onPress={updateUserPassword} color="transparent" />
      <Button title="Delete User" onPress={deleteUserAndToDos} color="transparent" />
      <Button title="Logout" onPress={logout} color="transparent" />
      <Button title="Back to Lists" onPress={() => navigation.pop()} color="transparent" />
      <View style={{ height: 170, paddingLeft: 32 }}>
        <FlatList
          // data={this.state.lists}
          // keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // renderItem={({ item }) => this.renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
      {/* </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.darkGray,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.lightGray,
    paddingHorizontal: 48,
  },
  addList: {
    width: 100,
    borderWidth: 3,
    borderColor: colors.darkGray,
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
