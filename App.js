// import React,{useState} from 'react';
// import {View, TextInput,Button} from 'react-native'
// import database from '@react-native-firebase/database'
// import auth from '@react-native-firebase/auth'
// let adddition = (t1,t2,t3,t4)=>{
//   database().ref('/users').push({
//     uname:t1,
//     uemail:t2,
//     uid:t3,
//     ppic:t4

//   })
// }
// const App = () => {
//   const [uid,setUid] = useState()
//   const [name,setName] = useState()
//   const [age,SetAge] = useState()
//   const [email,setEmail] = useState()
//   const [password,setPassword] = useState()
//   const [pic,setPic] = useState()

//   function add(){
//     adddition(name,age)

//   }
//   function reg(){

// auth().createUserWithEmailAndPassword(email,password).then((res) => {
//   console.log('User account created & signed in!');
//   database().ref('users/' + res.user.uid).set({
//     Name: name,
//     Email: email,
//     Pic:pic,
//     age:age
// })

  
// })
// .catch(error => {
//   if (error.code === 'auth/email-already-in-use') {
//     console.log('That email address is already in use!');
//   }

//   if (error.code === 'auth/invalid-email') {
//     console.log('That email address is invalid!');
//   }

//   console.error(error);
// });

// adddition(name,email,uid,pic)
//   }

 
//   return (
//     <View>
//         <TextInput  placeholder='name' onChangeText={text=>setName(text)} value={name}/>
//         <TextInput placeholder='age' onChangeText={text=>SetAge(text)} value={age} />
//         <Button title='submit' onPress={()=>add()}/>
//         <TextInput  placeholder='email' onChangeText={text=>setEmail(text)} value={email}/>
//         <TextInput placeholder='password' onChangeText={text=>setPassword(text)} value={password} />
//         <Button title='submit' onPress={()=>reg()}/>
//     </View>
    
//   );
// }

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './source/screens/Home';
import Login from './source/screens/Login';
import Signup from './source/screens/Signup';
import Profilepic from './source/screens/Profilepic';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profilepic" component={Profilepic} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;