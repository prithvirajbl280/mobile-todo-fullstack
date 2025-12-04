import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskFormScreen from '../screens/TaskFormScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="TaskList" component={TaskListScreen} />
                <Stack.Screen name="TaskForm" component={TaskFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
