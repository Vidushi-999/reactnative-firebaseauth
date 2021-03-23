
import { firebase } from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert ,Keyboard} from 'react-native';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const Signup =(props)=>{
 
  const [username,setusername]=useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [eye,seteye]=useState("visibility-off")
  const [showpsswd,setshowpsswd]=useState(true)

  const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const OnDone=async ()=>{
    props.navigation.navigate('Login')
  }
  const OnSignUp=async(email,password)=>{
    Keyboard.dismiss()
      if(!email)
      {
          Alert.alert("Email can't be empty");
      }
      else if(!EmailRegex.test(email))
      {
          Alert.alert("Email is not in the right format")
      }
      else if(!password && password.trim() && password.length<5)
      {
          Alert.alert("Password is too weak and required min 6 characters")
      }
      else{
      try{
          const Email=await firebase.auth().createUserWithEmailAndPassword(email,password)
          Email.user.updateProfile({displayName:username})
          Email.user.reload()
          
          setusername("")
          setemail("")
          setpassword("")
         props.navigation.navigate('Login')
    }
      catch(error)
      {
          console.log("error",error.message,error.code)
          switch (error.code)
          {
            
          case "auth/weak-password":
         Alert.alert("Password is invalid,requires min 6 char")
         break;
         case "auth/email-already-in-use":
           Alert.alert("Email is already registered")
           break;
           default:
             Alert.alert("Error")
          }
      }
    }
      
  }
ChangePwdType=()=>{
  let EyeNew;
  if (showpsswd) {
      EyeNew = {
          eye: 'visibility',
          showpsswd: false,
          password: password
      }
  } else {
      EyeNew = {
          eye: 'visibility-off',
          showpsswd: true,
          password: password
      }
  }
  // set new state value
  setpassword(EyeNew.password)
  seteye(EyeNew.eye)
  setshowpsswd(EyeNew.showpsswd)

}

  return (
    <View style={styles.container}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#add8e6" translucent = {true}/>

    
          <View style={styles.view}>
          <Text style={styles.bigtext}>Sign Up</Text>
          <Text style={[styles.smalltext],{paddingTop:5}}>Enter your credentials to continue the SignUp</Text>
          <Text style={[styles.smalltext],{marginTop:15}}>Name</Text>
     <TextInput
     placeholder="Name"
     keyboardType="default"
     value={username}
     onChangeText={(text)=>setusername(text)}
     style={styles.textinputstyle}
     />
        <Text style={[styles.smalltext],{marginTop:15}}>Email</Text>
     <TextInput
     placeholder="Email"
     keyboardType="email-address"
     value={email}
     onChangeText={(text)=>setemail(text)}
     style={styles.textinputstyle}
     />
     
        <Text style={[styles.smalltext],{marginTop:15}}>Password</Text>
        <View style={{flexDirection:'row'}}>
        <TextInput
     placeholder="Password"
     secureTextEntry={showpsswd}
     value={password}
     onChangeText={(text)=>setpassword(text)}
     style={styles.textinputstyle}
     />
      <Icon style={styles.icon}
                        name={eye}
                        size={30}
                        color="black"
                        onPress={ChangePwdType}
                    />
                    </View>
  
          </View>
 
          <View style={styles.buttonview}>
          <TouchableOpacity  onPress={()=>OnSignUp(email,password)}  style={{backgroundColor:"#add8e6",borderRadius:30,flexDirection:'row',elevation:8,paddingVertical: 10, paddingHorizontal: 12,justifyContent:'center'}}>
              <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomview}>
        <Text style={[styles.smalltext],{paddingTop:5}}>Already have an account?</Text>
        <TouchableOpacity onPress={OnDone}>
            <Text style={[styles.smalltext],{paddingTop:5,color:"#add8e6",marginLeft:6}}>Log In</Text>
        </TouchableOpacity>
        </View>
   

    </View>
  );
}
export default Signup
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  view:{marginTop:100,paddingHorizontal:30},
 bigtext:{
     fontSize:20,
     
 },
 smalltext:{
     fontSize:13,
     
 },
 buttonview:{alignSelf:'center',marginTop:100,width:"70%"},
 textinputstyle:{width:"90%",borderBottomWidth:1,paddingBottom:0},
 iconstyle:{
     backgroundColor:"#add8e6",
     borderRadius:50,
     width: 70,
     height: 70,
     margin:5
    
     
 },
 bottomview:{flexDirection:'row',justifyContent:'center'},
});
