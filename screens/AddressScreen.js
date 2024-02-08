import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import jwt_decode from "jwt-decode"
import { UserType } from '../UserContext';
import { decode } from "base-64";

global.atob = decode;


const AddressScreen = () => {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId, setUserId} = useContext(UserType)

    useEffect(() => {
        const fetchUser = async() => {
            const token = await AsyncStorage.getItem("auth");
            if (token) {
                try {
                    //const decodedToken = jwt_decode(token);
                    //const userId = decodedToken.userId;
                    //setUserId(userId);

                    setUserId(jwtDecode(token).userId)
                } catch (error) {
                    // handle decoding error
                    console.error("Token decoding failed:", error);
                }
            }
        };
        fetchUser()
    }, [])
    
    console.log(userId)

    


  return (
    <ScrollView>
        <View style={{ height: 50, backgroundColor: "#00CED1" }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}> Add a new Address </Text>

                <TextInput
                placeholderTextColor={"black"}
                placeholder="Finland"
                style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name (first and last name)</Text>

                    <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="Enter your name"/>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone Number</Text>

                    <TextInput
                    value={mobileNo}
                    onChangeText={(text) => setMobileNo(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="Enter your number"/>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>House No.</Text>

                    <TextInput
                    value={houseNo}
                    onChangeText={(text) => setHouseNo(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="" />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Street</Text>

                    <TextInput
                    value={street}
                    onChangeText={(text) => setStreet(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="Enter street address" />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>

                    <TextInput
                    value={landmark}
                    onChangeText={(text) => setLandmark(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="near Åbo Castle" />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Postal Code</Text>

                    <TextInput
                    value={postalCode}
                    onChangeText={(text) => setPostalCode(text)}
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="" />
                </View>

                <Pressable style={{ backgroundColor:"#FFC72C", padding: 19, borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{fontWeight: "bold", }}>Add address</Text>
                </Pressable>


            </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})