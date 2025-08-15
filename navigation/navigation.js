import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';

import RecentExpenses from "../Screens/RecentExpenses";
import AllExpenses from "../Screens/AllExpenses";
import ManageExpense from "../Screens/ManageExpense";

import { GlobalStyles } from '../constants/colors';
import IconButton from '../components/UI/IconButton';

const StackNavigate = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTabs.Navigator 
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor:  GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor}) => (
          <IconButton 
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen 
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="hourglass" size={size} color={color}/>
          ),
        }}
      />
      <BottomTabs.Screen 
        name="Allexpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="calendar" size={size} color={color}/>
          )
        }}
      />
    </BottomTabs.Navigator>
  )
}
const Navigation = () => {

  return (
    <NavigationContainer>
      <StackNavigate.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}
      >
        <StackNavigate.Screen 
          name="ExpensesOverview"
          component={ExpenseOverview}
          options={{ headerShown: false }}
        />
        <StackNavigate.Screen 
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: 'modal',
          }}
        />
      </StackNavigate.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;