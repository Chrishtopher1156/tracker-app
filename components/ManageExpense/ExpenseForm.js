import { useState } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/colors";

//props: onCancel, onSubmit, submitButtonLabel, defaultValues
const ExpenseForm = (props) => {
  const[inputs, setInputs]=useState({
    amount: {
      value: props.defaultValues ? props.defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: props.defaultValues ? getFormattedDate(props.defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: props.defaultValues ? props.defaultValues.description : '',
      isValid: true,

    }
  });

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = !isNaN(expenseData.date.getTime());
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert('Invalid input', 'Please check your input values');
      setInputs((currentInput) => {
        return {
          amount: { 
            value: currentInput.amount.value, 
            isValid: amountIsValid 
          },
          date: { 
            value: currentInput.date.value, 
            isValid: dateIsValid 
          },
          description: { 
            value: currentInput.description.value, 
            isValid: descriptionIsValid 
          },
        }
      })
      return;
    }

    props.onSubmit(expenseData)
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    });
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style = {styles.rowInput}
          label='Amount' 
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: Platform.OS === 'ios' ? 'decimal-pad': 'numeric',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input 
          style = {styles.rowInput}
          label='Date' 
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD', 
            keyboardType: Platform.OS === 'ios'? 'decimal-pad' : 'numeric',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input 
        label= 'Description'
        invalid={!inputs.description.isValid}
        textInputConfig = {{
          multiline: true,
          // autoCorrect: false / default is true
          // autoCapitalize: 'characters' default is sentences
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
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

  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.accent500,
    margin: 8,
  }
})