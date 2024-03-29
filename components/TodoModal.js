import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

const image = require("../assets/modal-screen.png");

export default class TodoModal extends Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;

    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });

      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
          renderLeftActions={(_, dragX) => this.leftActions(dragX, index)}
        >
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
              <Ionicons
                name={todo.completed ? "ios-checkmark-circle-outline" : "ios-radio-button-off"}
                size={24}
                color={colors.gray}
                style={{ width: 32 }}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: todo.completed ? "line-through" : "none",
                  color: todo.completed ? colors.darkGray : colors.white,
                },
              ]}
            >
              {todo.title}
            </Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.8, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <Animated.View style={[styles.button, styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text style={{ color: colors.white, fontWeight: "bold", transform: [{ scale }] }}>
            <AntDesign name="delete" size={20} color={colors.red} />
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  leftActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [0, 20, 100],
      outputRange: [0, 0.8, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.editTodo(index)}>
        <Animated.View style={[styles.button, styles.editButton, { opacity: opacity }]}>
          <Animated.Text style={{ color: colors.white, fontWeight: "bold", transform: [{ scale }] }}>
            {/* <AntDesign name="edit" size={20} color={colors.green} /> */}
            <FontAwesome5 name="edit" size={20} color={colors.green} />
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const tasksLeftCount = list.todos.filter((todo) => taskCount - completedCount);

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SafeAreaView style={styles.container}>
          <ImageBackground source={image} style={styles.backgroundImage}>
            <TouchableOpacity
              style={{ position: "absolute", top: 24, right: 32, zIndex: 10 }}
              onPress={this.props.closeModal}
            >
              <AntDesign name="close" size={24} color={colors.white} />
            </TouchableOpacity>

            <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
              <View>
                <Text style={styles.title}>{list.name}</Text>
                <Text style={styles.taskCount}>
                  {completedCount} of {taskCount} tasks completed
                </Text>
              </View>
            </View>

            <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
              <FlatList
                data={list.todos}
                renderItem={({ item, index }) => this.renderTodo(item, index)}
                keyExtractor={(item) => item.title}
                // contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <TouchableOpacity
              style={styles.deleteList}
              onPress={() => this.props.deleteList(list)}
              // delayLongPress={1000}
            >
              <Text style={styles.delete}>Delete This List</Text>
            </TouchableOpacity>

            <View style={[styles.section, styles.footer]}>
              <TextInput
                style={[styles.input, { borderColor: list.color }, { color: colors.white }]}
                onChangeText={(text) => this.setState({ newTodo: text })}
                value={this.state.newTodo}
              />
              <TouchableOpacity
                style={[styles.addTodo, { backgroundColor: list.color }]}
                onPress={() => this.addTodo()}
              >
                <AntDesign name="plus" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.white,
    fontWeight: "normal",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 3,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
  },
  todo: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderWidth: 0.2,
    borderRadius: 6,
    marginRight: 16,
    marginVertical: 8,
  },
  deleteButton: {
    borderColor: colors.red,
  },
  editButton: {
    borderColor: colors.green,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteList: {
    width: 100,
    borderWidth: 0.4,
    borderColor: colors.red,
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 32,
  },
  delete: {
    color: colors.red,
    fontWeight: "normal",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
