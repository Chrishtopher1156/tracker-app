import { useContext, useLayoutEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';

import IconButton from '../component/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../component/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() =>{
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  },[navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  } 

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense(
        editedExpenseId,
        {
          description: 'updateTesting', 
          amount: 19.89, 
          date: new Date('2025-05-12'),
        }
      );
    } else {
      expenseCtx.addExpense(
        { 
          description: 'addTesting', 
          amount: 20.99, 
          date: new Date('2025-08-12'),
        }
      )
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContianer}>
          <IconButton 
            icon='trash'
            color ={GlobalStyles.Colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )
      }
    </View>
  ); 
} 

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.Colors.primary800,
  },
  deleteContianer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.Colors.primary200,
  }, 
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
})