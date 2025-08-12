import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import {Ionicons } from '@expo/vector-icons';


import AllExpense from "../screen/AllExpenses";
import ManageExpense from "../screen/ManageExpense";
import RecentExpenses from "../screen/RecentExpenses";

import { GlobalStyles } from '../constants/styles';
import IconButton from "../component/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

//bottomTab navigator
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle: { backgroundColor: GlobalStyles.Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.Colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.Colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton 
            icon='add' 
            size={24} 
            color={tintColor} 
            onPress={()=>{
              navigation.navigate('ManageExpense')
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
          tabBarIcon: ({color, size }) => (
            <Ionicons 
              name='hourglass' 
              color={color} 
              size={size}
            />
          )
        }}
      />
      <BottomTabs.Screen 
        name="AllExpenses" 
        component={AllExpense} 
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Expenses',
          tabBarIcon: ({color, size }) => (
            <Ionicons 
              name='calendar' 
              color={color} 
              size={size}
            />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.Colors.primary500},
        headerTintColor: 'white'
      }}>
        <Stack.Screen 
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={
            {headerShown: false}
          }
        />
        <Stack.Screen  
          name="ManageExpense" 
          component={ManageExpense} 
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;