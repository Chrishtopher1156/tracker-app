import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = (props) => {
  const navigation = useNavigation();
  function expensePressedHandler () {
    navigation.navigate('ManageExpense', {
      expenseId: props.id
    });
  }

  return (
    <Pressable onPress={expensePressedHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
       <View>
          <Text style={[styles.textBase, styles.description]}>{props.description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(props.date)}</Text>
       </View>
       <View style={styles.amountContainer}>
        <Text style={styles.amout}>{props.amount.toFixed(2)}</Text>
       </View>  
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.Colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1},
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.Colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    minWidth: 90,
  },
  amout: {
    color: GlobalStyles.Colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  }
});