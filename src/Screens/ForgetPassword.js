import { firebase } from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert ,Keyboard} from 'react-native';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';



const ForgetPassword =(props)=>{

  const [email, setemail] = useState("");
 
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const onForget= async(email)=>{
    Keyboard.dismiss()
    if(!email)
    {
      Alert.alert("Email can't be empty")
    }
    else if(!emailRegex.test(email))
    {
  Alert.alert("Email is not in correct form")
   }
   else{
     try{
  await firebase.auth().sendPasswordResetEmail(email)
  setemail("")
  Alert.alert("Email is sent to your registerd email id")
  props.navigation.navigate('Login') 
     }
     catch(error)
     {
       switch(error.code)
       {
         case "auth/user-not-found":
           Alert.alert("User not found!!")
           break;
           default:
             Alert.alert("Error")
       }
      
     }
  
  }
}
  
   
  return (
    <View style={styles.container}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "white" translucent = {true}/>

          <View style={styles.view}>
          <Text style={styles.bigtext}>Forget Password</Text>
          <Text style={[styles.smalltext],{paddingTop:5}}>Enter your email to reset the password</Text>
     
     <TextInput
     placeholder="Email"
     keyboardType="email-address"
     value={email}
     onChangeText={(text)=>setemail(text)}
     style={styles.txtinputstyle}
     />
         <View style={{alignSelf:'center',marginTop:100,width:"70%"}}>
          <TouchableOpacity  onPress={()=>onForget(email)}  style={{backgroundColor:"#add8e6",borderRadius:30,flexDirection:'row',elevation:8,paddingVertical: 10, paddingHorizontal: 12,justifyContent:'center'}}>
   <Text>Send Link</Text>
          </TouchableOpacity>
        </View>
  
     
</View>
    </View>
  );
}

export default ForgetPassword
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
    
  },
 bigtext:{
     fontSize:20,
     
 },txtinputstyle:{width:"90%",borderBottomWidth:1,paddingBottom:0},
 smalltext:{
     fontSize:13,
     
 },
 view:{marginTop:100,paddingHorizontal:30,},
 iconstyle:{
     backgroundColor:"#add8e6",
     borderRadius:50,
     width: 70,
     height: 70,
     margin:5
    
     
 }
});
