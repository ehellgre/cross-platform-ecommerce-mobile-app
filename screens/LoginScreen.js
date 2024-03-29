import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { IP_ADDRESS } from '@env'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("auth")

                if (token) {
                    navigation.replace("Main")
                }
            } catch (error) {
                console.log("error", err)
            }
        }

        checkLoginStatus();
    }, [])
    

    // login func
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }

        axios.post(`${IP_ADDRESS}:8000/login`, user, { timeout: 60000 })
        .then((response) => {
            console.log(response)
            const token = response.data.token
            AsyncStorage.setItem("auth", token)
            navigation.replace("Main")
        }).catch((error) => {
            Alert.alert("Login Error", "Invalid Email or Password")
            console.log(error)
        })
    }


  return (
    <SafeAreaView style={{ flex:1,backgroundColor:"white",alignItems:"center" }}>

        <View>
             {/* AMAZON LOGO */}
            <Image style={{ width: 150, height: 100 }} source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }} />
        </View>

        <KeyboardAvoidingView>

            {/* LOGIN TEXT */}
            <View style={{ alignItems:"center" }}>
                <Text style={{ fontSize:17,fontWeight:"bold",marginTop:12,color:"#041E42" }}>Login</Text>
            </View>

            {/* EMAIL */}
            <View style={{ marginTop:70 }}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5,backgroundColor:"#D0D0D0",paddingVertical:5,borderRadius:5,marginTop:30 }}>
                    <MaterialIcons style={{ marginLeft:8 }} name="email" size={24} color="gray" />

                    <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color:"black",marginVertical:10,width:300,fontSize:email ? 16 : 16 }}placeholder="Enter Email" />
                </View>
            </View>

            {/* PASSWORD */}
            <View style={{ marginTop:10 }}>
                <View style={{ flexDirection:"row",alignItems:"center",gap:5,backgroundColor:"#D0D0D0",paddingVertical:5,borderRadius:5,marginTop:30 }}>
                    <AntDesign style={{ marginLeft:8 }} name="lock1" size={24} color="gray" />

                      <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ color: "black", marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter Password" />
                </View>
            </View>

            {/* KEEP ME LOGGED IN + FORGOT PASSWORD */}
            <View style={{marginTop:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text>Keep me logged in</Text>

                <Text style={{color:"#007FFF", fontWeight:"500"}}>Forgot Password?</Text>
            </View>

            <View style={{marginTop:80}} />

            {/* LOGIN BUTTON */}
            <Pressable onPress={handleLogin} style={{ width:200, backgroundColor:"#FEBE10", borderRadius:6, marginLeft:"auto", marginRight:"auto", padding:15 }}>
                <Text style={{ textAlign:"center", color:"white", fontSize:16, fontWeight:"bold" }}>Login</Text>
            </Pressable>

            {/* SIGNUP BUTTON */}
            <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop:15}}>
                <Text style={{textAlign:"center",color:"gray",fontSize:16}}>Don't have an account? Signup</Text>
            </Pressable>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})