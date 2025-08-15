import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from '../../constants/colors';


//props: label, textInputConfig{},
const Input = (props) => {
 const inputStyles = [styles.input];

  if (props.textInputConfig && props.textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }


  return (
    <View style={[styles.InputContainer, props.style]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props.textInputConfig} style={inputStyles} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  InputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
})