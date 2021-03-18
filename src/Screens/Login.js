import { firebase } from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert ,Keyboard} from 'react-native';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';



const Login =(props)=>{

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [eye,seteye]=useState("visibility-off")
  const [showpsswd,setshowpsswd]=useState(true)
 
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const onForgot=()=>{
  props.navigation.navigate('ForgetPassword')
  setemail("")
  setpassword("")
}
  const onDone= ()=>{
   
      props.navigation.navigate('SignUp')
      setemail("")
      setpassword("")
  }
  changePwdType=()=>{
  
    let eyenew;
    if (showpsswd) {
        eyenew = {
            eye: 'visibility',
            showpsswd: false,
            password: password
        }
    } else {
        eyenew = {
            eye: 'visibility-off',
            showpsswd: true,
            password: password
        }
    }
  
    setpassword(eyenew.password)
    seteye(eyenew.eye)
    setshowpsswd(eyenew.showpsswd)

  }

  
  
  
  const onLogin= async(email,password)=>{
    Keyboard.dismiss()
      if(!email)
      {
          Alert.alert("Email cannot be empty")
      }

      else if(!emailRegex.test(email))
      {
    Alert.alert("Email is not in correct form")
     }

       else if(!password && password.length<6)
    {
     Alert.alert("Enter password with min 6 characters")
    }
  else{
    try{
             const authuser=await firebase.auth().signInWithEmailAndPassword(email,password)
             console.log(authuser)
           
             props.navigation.navigate('User')
             setemail("")
             setpassword("")
    }
    catch(error)
    {
        console.log("error",error)
        switch(error.code)
        {
          case "auth/user-not-found":
            Alert.alert("User not found!!")
        }
       
    }
    }
            }
   
  return (
    <View style={styles.container}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "white" translucent = {true}/>

          <View style={styles.view}>
          <Text style={styles.bigtext}>Log In</Text>
          <Text style={[styles.smalltext],{paddingTop:5}}>Enter your email and password</Text>
     <Text style={[styles.smalltext],{paddingTop:10}}>Email</Text>
     <TextInput
     placeholder="Email"
     keyboardType="email-address"
     value={email}
     onChangeText={(text)=>setemail(text)}
     style={styles.txtinputstyle}
     />
       <Text style={[styles.smalltext],{marginTop:15}}>Password</Text>
       <View style={{flexDirection:'row'}}>
       <TextInput
     placeholder="Password"
     secureTextEntry={showpsswd}
     value={password}
     onChangeText={(text)=>setpassword(text)}
     style={styles.txtinputstyle}
     />
      <Icon style={styles.icon}
                        name={eye}
                        size={30}
                        color="black"
                        onPress={changePwdType}
                    />
                    </View>
                   
          </View>

          <View style={{alignSelf:'center',marginTop:100,width:"70%"}}>
          <TouchableOpacity  onPress={()=>onLogin(email,password)}  style={{backgroundColor:"#add8e6",borderRadius:30,flexDirection:'row',elevation:8,paddingVertical: 10, paddingHorizontal: 12,justifyContent:'center'}}>
             <Text>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
        <Text style={[styles.smalltext],{paddingTop:5}}>Don't have and account?</Text>
             <TouchableOpacity onPress={onDone}>
               <Text style={[styles.smalltext],{paddingTop:5,color:"#add8e6",marginLeft:6}}>Sign Up</Text>
             </TouchableOpacity>
        </View>


        <TouchableOpacity  onPress={onForgot} style={{marginTop:20,borderRadius:30,paddingVertical: 12, paddingHorizontal: 12,justifyContent:'center'}}>
            <Text style={{textAlign:'right'}}>Forgot Password?</Text>
        </TouchableOpacity>


     

    </View>
  );
}

export default Login
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
