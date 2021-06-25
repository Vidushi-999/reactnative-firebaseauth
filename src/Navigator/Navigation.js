import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Signup from '../Screens/SignUp';
import Login from '../Screens/Login';
import UserInfo from '../Screens/UserInfo';
import ForgetPassword from '../Screens/ForgetPassword';
const AuthStack=createStackNavigator();
const StackScreens=({navigation})=>(
    <AuthStack.Navigator screenOptions={{headerShown:false}} initialRouteName="SignUp">
        <AuthStack.Screen name="SignUp" component={Signup} options={{headerShown:false}}/>
        <AuthStack.Screen name="Login" component={Login} options={{headerShown:false}}/> 
        <AuthStack.Screen name="User" component={UserInfo} options={{headerShown:false}}/>   
        <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown:false}}/>   
   
    </AuthStack.Navigator>
)


export default ()=>{
  

return(
  
    <NavigationContainer>
       <StackScreens/>
    </NavigationContainer>
    
  
)
}
