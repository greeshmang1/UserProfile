import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, TextInput,Button} from 'react-native'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import Login from './Login';
// let adddition = (t1,t2,t3,t4)=>{
//   database().ref('/users').push({
//     uname:t1,
//     uemail:t2,
//     uid:t3,
//     ppic:t4

//   })
// }
const Signup = () => {
//   const [uid,setUid] = useState()
const navigation= useNavigation()
  const [mobile,setMobile] = useState()
  const [name,setName] = useState()
  const [conformPassword,setConformPassword] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [pic,setPic] = useState()

  function add(){
    adddition(name,age)

  }
  function reg(){

auth().createUserWithEmailAndPassword(email,password).then((res) => {
  console.log('User account created & signed in!');
  database().ref('users/' + res.user.uid).set({
    Name: name,
    Email: email,
    Pic:pic,
    mobile:mobile
})

  
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    console.log('That email address is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    console.log('That email address is invalid!');
  }

  console.error(error);
});

// adddition(name,email,uid,pic)
  }

 
  return (
    <View>
        <TextInput  placeholder='name' onChangeText={text=>setName(text)} value={name}/>
        {/* <TextInput placeholder='age' onChangeText={text=>SetAge(text)} value={age} /> */}
        {/* <Button title='submit' onPress={()=>add()}/> */}
        <TextInput  placeholder='Mobile' onChangeText={text=>setMobile(text)} value={mobile}/>
        <TextInput  placeholder='email' onChangeText={text=>setEmail(text)} value={email}/>
        <TextInput placeholder='password' onChangeText={text=>setPassword(text)} value={password} />
        <TextInput placeholder='conformpassword' onChangeText={text=>setConformPassword(text)} value={conformPassword} />
        <Button title='submit' onPress={()=>reg()}/>
        <Button title='login' onPress={()=>navigation.navigate(Login)}/>
    </View>
    
  );
}

export default Signup;