import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },

  topMargin: {
    marginTop: 16,
  },

  bottomMargin: {
    marginBottom: 16,
  },

  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.75,
    padding: 16,
  },

  lightText: {
    color: "#fff",
  },

  errorText: {
    color: "#ff0000",
  },

  header: {
    fontSize: 32,
  },

  textInput: {
    fontSize: 20,
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8,
  },

  lightTextInput: {
    borderBottomColor: "#ffffff",
  },

  darkTextInput: {
    borderBottomColor: "#000000",
  },

  inlineTextButton: {
    color: "#87F1FF",
  },
  pressedInlineTextButton: {
    color: "#87F1FF",
    opacity: 0.6,
  },
});
