
import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'


const UserInfo =(props)=>{
 
  const [email,setemail]=useState("")
  const [user,setuser]=useState("")
 
useEffect(()=>{
 var emailid=firebase.auth().currentUser.email;
 var user=firebase.auth().currentUser.displayName;
setemail(emailid)
setuser(user)
const backButton = () => {
  Alert.alert(
    "Exit",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => props.navigation.pop() }
    ]
  );

  return true;
};

const backHandler = BackHandler.addEventListener(
  "hardwareBackPress",
  backButton
);

return () => backHandler.remove();
},[])

  const onLogOut=async ()=>{
try{
    await firebase.auth().signOut().then((res) => {
      console.log(res)
        props.navigation.navigate('Login')
      })
      .catch(error)
      {
          console.log("Error")
      }
    

}
catch(e)
{
    console.log("error",e)
}
  }
  
  
  return (
    <View style={styles.container}>
       <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#add8e6" translucent = {true}/>
       <View style={{marginTop:40,}}>
       <Text style={{textAlign:'center',fontSize:20}}>User Details</Text>
       <Text style={{fontSize:15,paddingHorizontal:8}}>Hello, {user}</Text>
       <Text style={{fontSize:15,paddingHorizontal:8}}>{email}</Text>
       <TouchableOpacity  onPress={()=>onLogOut(email)}  style={{backgroundColor:"#add8e6",borderRadius:30,elevation:8,marginTop:80,paddingVertical:12,paddingHorizontal: 12,justifyContent:'center',width:"70%",alignSelf:'center'}}>
   <Text style={{textAlign:'center'}}>Log Out</Text>
          </TouchableOpacity>
       </View>
      
    </View>
  );
}
export default UserInfo
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
