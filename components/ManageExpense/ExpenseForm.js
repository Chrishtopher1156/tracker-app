import { useState } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from "../../util/date";

//props: onCancel, onSubmit, submitButtonLabel, defaultValues
const ExpenseForm = (props) => {
  const[inputValues, setInputalues]=useState({
    amount: props.defaultValues ? props.defaultValues.amount.toString() : '',
    date: props.defaultValues ? getFormattedDate(props.defaultValues.date) : '',
    description: props.defaultValues ? props.defaultValues.description : '',
  });

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() === 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values')
      return;
    }

    props.onSubmit(expenseData)
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputalues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    });
  }

  
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style = {styles.rowInput}
          label='Amount' 
          textInputConfig={{
            keyboardType: Platform.OS === 'ios' ? 'decimal-pad': 'numeric',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input 
          style = {styles.rowInput}
          label='Date' 
          textInputConfig={{
            placeholder: 'YYYY-MM-DD', 
            keyboardType: Platform.OS === 'ios'? 'decimal-pad' : 'numeric',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input 
        label= 'Description'
        textInputConfig = {{
          multiline: true,
          // autoCorrect: false / default is true
          // autoCapitalize: 'characters' default is sentences
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={props.onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>
          {props.submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },  
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1,
  },
    buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
})