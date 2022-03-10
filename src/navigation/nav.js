import React, {useContext} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalContext } from '../context/Provider';

import HomeScreen from '../screen/HomeScreen';
import ProtectedScreen from '../screen/ProtectedScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import Experience from '../screen/Experience';
import UserScreen from '../screen/UserScreen';

export default function Nav() {

    //Permet de créer un groupe de screens
    const Stack = createNativeStackNavigator();

    //Permet de récupérer les données des states
    const state = useContext(GlobalContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  options={{ headerShown: false}} name="Home" component={HomeScreen} />
                <Stack.Screen  options={{ headerShown: false}} name="Login" component={LoginScreen} />  
                <Stack.Screen name="Register" component={RegisterScreen} />  
                <Stack.Screen  options={{ headerShown: false}} name="Protected" component={ProtectedScreen} />  
                <Stack.Screen name="Experience" component={Experience} />
                <Stack.Screen name="User" component={UserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}