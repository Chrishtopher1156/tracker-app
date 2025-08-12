import { Pressable, View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles";

const Button = (props) => {
  return (
    <View style={props.style}>
      <Pressable onPress={props.onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, props.mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, props.mode === 'flat' && styles.flatText]}>{props.children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.Colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.Colors.primary200,
  },
  pressed: {
    opacity: .75,
    backgroundColor: GlobalStyles.Colors.primary100,
    borderRadius: 4,
  }
})