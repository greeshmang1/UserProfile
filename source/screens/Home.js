import React,{useState} from 'react';
import {View,Text, TextInput,Button} from 'react-native'
const Home = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    return (
        <View>
           <Text> Home</Text>
        </View>
    );
}

export default Home;