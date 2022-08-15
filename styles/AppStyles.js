import { StyleSheet } from "react-native";

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },

  noPadding: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },

  fillSpace: {
    flex: 1,
  },

  rightAligned: {
    justifyContent: "flex-end",
  },

  topMargin: {
    marginTop: 16,
  },

  topMargin1: {
    marginTop: 8,
  },

  topMargin3: {
    marginTop: 32,
  },

  topMargin0: {
    marginTop: -32,
  },

  bottomMargin: {
    marginBottom: 16,
  },

  bottomMargin1: {
    marginBottom: 32,
  },

  bottomMargin2: {
    marginBottom: 48,
  },

  rightMargin: {
    marginRight: 16,
  },

  leftMargin: {
    marginLeft: 16,
  },

  margin: {
    marginRight: 16,
    marginLeft: 16,
  },

  margin1: {
    marginRight: 32,
    marginLeft: 32,
  },

  paddingBottom2: {
    paddingBottom: 32,
  },

  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.8,
    padding: 16,
  },

  lightText: {
    color: "#fff",
  },

  bluGraText: {
    color: "#258ea6",
  },

  gray: {
    color: "#a4a4a4",
  },

  darkGray: {
    color: "#515151",
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
    borderBottomWidth: 1,
    marginVertical: 8,
  },

  lightTextInput: {
    borderBottomColor: "#ffffff",
  },

  darkTextInput: {
    borderBottomColor: "#515151",
  },

  darkTextInput: {
    borderBottomColor: "#515151",
  },

  inlineTextButton: {
    color: "#87F1FF",
  },
  pressedInlineTextButton: {
    color: "#87F1FF",
    opacity: 0.6,
  },
});
