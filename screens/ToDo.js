import {
  View,
  Button,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import InlineTextButton from "../components/InlineTextButton";
import AppStyles from "../styles/AppStyles";
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import React, { Component } from "react";
import App from "../App";
import colors from "../Colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AddToDoModal from "../components/AddToDoModal5";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AddListModal from "../components/AddListModal";
import tempData from "../tempData";

import TodoList from "../components/TodoList";

const image = require("../assets/backimg.png");

export default function ToDo({ navigation, route }) {
  // state = {
  //   addTodoVisible: false,
  // };

  let [modalVisible, setModalVisible] = React.useState(false);
  let [addTodoVisible, setAddTodoVisible] = React.useState(false);
  // let [isLoading, setIsLoading] = React.useState(true);
  // let [isRefreshing, setIsRefreshing] = React.useState(false);
  // let [toDos, setToDos] = React.useState([]);

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text style={[AppStyles.bottomMargin, AppStyles.gray]}>Please verify your email to use ListIt2.0</Text>
        <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    );
  };

  let toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
    // this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };

  let renderList = (list) => {
    return <TodoList list={list} />;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View
          style={[
            AppStyles.rowContainer,
            AppStyles.rightAligned,
            AppStyles.rightMargin,
            AppStyles.bottomMargin,
            AppStyles.topMargin0,
          ]}
        >
          <InlineTextButton
            text="Manage Account"
            color="#258ea6"
            onPress={() => navigation.navigate("ManageAccount")}
          />
        </View>
        <Modal animationType="slide" visible={addTodoVisible} onRequestClose={() => toggleAddTodoModal()}>
          <AddListModal closeModal={() => toggleAddTodoModal()} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Listit <Text style={{ fontWeight: "bold", color: colors.darkGray }}>2.0</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 72, alignItems: "center" }}>
          <TouchableOpacity style={styles.addList} onPress={() => toggleAddTodoModal()} color="#fff">
            <AntDesign name="plus" size={16} color={colors.white} />
            <Text style={styles.add}>Add a list</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 300, paddingLeft: 32 }}>
          <FlatList
            // data={this.state.lists}
            data={tempData}
            // keyExtractor={(item) => item.id.toString()}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderList(item)}
            // renderItem={({ item }) => item}
            keyboardShouldPersistTaps="always"
          />
        </View>

        {/* {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()} */}
        {/* <Button title="Logout" onPress={logout} color="#f7b267" /> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.darkGray,
    height: 2,
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
