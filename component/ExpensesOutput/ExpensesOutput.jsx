import { View, StyleSheet, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constants/styles";


const ExpensesOutput = ( props ) => {

  let content = <Text style={styles.infoText}>{props.fallbackText}</Text>

  if (props.expenses.length > 0 ){
    content = <ExpensesList expenses={props.expenses} />
  }

  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary 
        periodName={props.expensePeriod}
        expenses={props.expenses}
      />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.Colors.primary700,
  }, 
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 32,
  }
})