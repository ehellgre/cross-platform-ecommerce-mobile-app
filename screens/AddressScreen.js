import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'

const AddressScreen = () => {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");


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
                    placeholderTextColor={"black"}
                    style={{
                    padding: 10,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 5,
                    }}
                    placeholder="Example near Åbo Castle" />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

                    <TextInput
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