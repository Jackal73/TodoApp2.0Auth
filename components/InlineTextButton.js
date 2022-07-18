import { Text, Pressable } from "react-native";

import AppStyles from "../styles/AppStyles";

export default function InlineTextButton(props) {
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text style={[pressed ? AppStyles.pressedInlineTextButton : AppStyles.inlineTextButton]}>{props.text}</Text>
      )}
    </Pressable>
  );
}
