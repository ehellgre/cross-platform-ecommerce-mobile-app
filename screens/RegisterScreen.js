import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { IP_ADDRESS } from '@env'
import axios from 'axios'


const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigation = useNavigation()

    const handleRegister = () => {

        const user = {
            name: name,
            email: email,
            password: password
        }

        // send POST req to backend /register
        axios.post(`${IP_ADDRESS}:8000/register`, user, { timeout: 60000 }) // 60 sec timeout
        .then((response) => {
            console.log(response)
            Alert.alert("Registration succesful!", "You have registered succesfully.") // 1st argument = title, 2nd body part
            setName("")
            setPassword("")
            setEmail("")
        }).catch((error) => {
            Alert.alert("Registration error", "An error occurred during registration")
            console.log("Registration failed", error)
        })

    }


  return (
    <SafeAreaView style={{ flex:1,backgroundColor:"white",alignItems:"center" }}>

        <View>
             {/* AMAZON LOGO */}
            <Image style={{ width: 150, height: 100 }} source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }} />
        </View>

        <KeyboardAvoidingView>

            {/* REGISTER TEXT */}
            <View style={{ alignItems:"center" }}>
                <Text style={{ fontSize:17,fontWeight:"bold",marginTop:12,color:"#041E42" }}>Register</Text>
            </View>

            {/* EMAIL */}
            <View style={{ marginTop:70 }}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5,backgroundColor:"#D0D0D0",paddingVertical:5,borderRadius:5,marginTop:30 }}>
                    <MaterialIcons style={{ marginLeft:8 }} name="email" size={24} color="gray" />

                    <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color:"black",marginVertical:10,width:300,fontSize:email ? 16 : 16 }}placeholder="Enter Email" />
                </View>
            </View>

            {/* NAME */}
            <View style={{ marginTop:10 }}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5,backgroundColor:"#D0D0D0",paddingVertical:5,borderRadius:5,marginTop:30 }}>
                    <Ionicons style={{ marginLeft:8 }} name="person" size={24} color="gray" />

                      <TextInput value={name} onChangeText={(text) => setName(text)} style={{ color: "black", marginVertical: 10, width: 300, fontSize: name ? 16 : 16 }} placeholder="Enter your name" />
                </View>
            </View>

            {/* PASSWORD */}
            <View style={{ marginTop:10 }}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5,backgroundColor:"#D0D0D0",paddingVertical:5,borderRadius:5,marginTop:30 }}>
                    <AntDesign style={{ marginLeft:8 }} name="lock1" size={24} color="grey" />

                      <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ color: "black", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter Password" />
                </View>
            </View>

            {/* KEEP ME LOGGED IN + FORGOT PASSWORD */}
            <View style={{marginTop:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text>Keep me logged in</Text>

                <Text style={{color:"#007FFF", fontWeight:"500"}}>Forgot Password?</Text>
            </View>

            <View style={{marginTop:80}} />

            {/* REGISTER BUTTON */}
            <Pressable onPress={handleRegister} style={{ width:200, backgroundColor:"#FEBE10", borderRadius:6, marginLeft:"auto", marginRight:"auto", padding:15 }}>
                <Text style={{ textAlign:"center", color:"white", fontSize:16, fontWeight:"bold" }}>Create account</Text>
            </Pressable>

            {/* SIGN IN BTN */}
            <Pressable onPress={() => navigation.navigate("Login")} style={{marginTop:15}}>
                <Text style={{textAlign:"center",color:"gray",fontSize:16}}>Already have an account? Sign In</Text>
            </Pressable>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})