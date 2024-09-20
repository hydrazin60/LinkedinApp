// import {
//   View,
//   SafeAreaView,
//   Image,
//   Text,
//   KeyboardAvoidingView,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
//   Alert,
// } from "react-native";
// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Link, useNavigation } from "expo-router";
// import axios from "axios";
// const Register = () => {
//   const [PasswordSee, setPasswordSee] = React.useState(true);
//   const [formData, setFormData] = React.useState({});
// const navigate = useNavigation();
//   const handleResister = () => {
//     console.log(formData);
//     axios
//       .post("http://192.168.1.2:4000/linkdinapp/api/v1/user/register", formData)
//       .then((res) => {
//         console.log(res.data);
//         navigate.push("/login");
//         Alert.alert("Registered successfully");
//         formData.name = "";
//         formData.email = "";
//         formData.password = "";
//       })
//       .catch((err) => {
//         console.log(`Resister failed: ${err.message}`);
//         Alert.alert(`Resister failed: ${err.message}`);
//       });
//   };

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
//     >
//       <View>
//         <Image
//           style={{ width: 150, height: 100, resizeMode: "contain" }}
//           source={{
//             uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
//           }}
//         />
//       </View>
//       <ScrollView>
//         <KeyboardAvoidingView behavior="padding">
//           <View style={{ alignItems: "center" }}>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "#0077b5",
//               }}
//             >
//               Create an account
//             </Text>
//           </View>
//           <View style={{ marginTop: 60 }}>
//             <View style={styles.inputSectionContainner}>
//               <TextInput
//                 placeholder="Enter your name"
//                 placeholderTextColor={"gray"}
//                 style={{ paddingHorizontal: 10 }}
//                 value={formData.name}
//                 onChangeText={(text) =>
//                   setFormData({ ...formData, name: text })
//                 }
//               />
//             </View>
//             <View style={styles.inputSectionContainner}>
//               <TextInput
//                 placeholder="Enter your email"
//                 placeholderTextColor={"gray"}
//                 style={{ paddingHorizontal: 10 }}
//                 value={formData.email}
//                 onChangeText={(text) =>
//                   setFormData({ ...formData, email: text })
//                 }
//               />
//             </View>
//           </View>
//           <View
//             style={[
//               styles.inputSectionContainner,
//               { flexDirection: "row", alignItems: "center" },
//             ]}
//           >
//             <TextInput
//               placeholder="Enter your password"
//               placeholderTextColor={"gray"}
//               secureTextEntry={PasswordSee}
//               style={{ flex: 1, paddingHorizontal: 10 }}
//               value={formData.password}
//               onChangeText={(text) => {
//                 setFormData({ ...formData, password: text });
//               }}
//             />
//             <TouchableOpacity onPress={() => setPasswordSee(!PasswordSee)}>
//               <Ionicons
//                 name={PasswordSee ? "eye-off" : "eye"}
//                 size={24}
//                 color="black"
//               />
//             </TouchableOpacity>
//           </View>
//           {/* <View
//             style={{
//               marginTop: 12,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Text> Keep me Logged in</Text>
//             <Text style={{ color: "#007fff", fontWeight: "500" }}>
//               Forgot Password
//             </Text>
//           </View> */}
//           <View style={{ marginTop: 40 }}>
//             <TouchableOpacity
//               style={{
//                 width: 300,
//                 backgroundColor: "#0077b5",
//                 borderRadius: 5,
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 padding: 15,
//               }}
//               onPress={handleResister}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                   textAlign: "center",
//                   fontSize: 16,
//                   fontWeight: "600",
//                 }}
//               >
//                 Register
//               </Text>
//             </TouchableOpacity>
//             <Pressable style={{ marginTop: 15 }}>
//               <Text
//                 style={{ textAlign: "center", fontSize: 16, color: "gray" }}
//               >
//                 Already have an account?
//                 <Link href="/login" style={{ color: "#0077b5" }}>
//                   Login
//                 </Link>
//               </Text>
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default Register;

// const styles = StyleSheet.create({
//   inputSectionContainner: {
//     padding: 10,
//     height: 50,
//     width: 300,
//     borderColor: "#0077b5",
//     backgroundColor: "#f2f2f2",
//     marginVertical: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

import {
  View,
  SafeAreaView,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useNavigation } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";

const Register = () => {
  const [PasswordSee, setPasswordSee] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleResister = () => {
    console.log(formData);
    axios
      .post(
        "http://192.168.18.13:4000/linkdinapp/api/v1/user/register",
        formData
      )
      .then((res) => {
        router.push("/login");
        Alert.alert("Registered successfully");
        setFormData({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        if (err.response) {
          console.log("Response data:", err.response.data);
          Alert.alert(`Resister failed: ${err.response.data.message}`);
        } else {
          console.log(`Resister failed: ${err.message}`);
          Alert.alert(`Resister failed: ${err.message}`);
        }
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#0077b5",
              }}
            >
              Create an account
            </Text>
          </View>
          <View style={{ marginTop: 60 }}>
            <View style={styles.inputSectionContainner}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={"gray"}
                style={{ paddingHorizontal: 10 }}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>
            <View style={styles.inputSectionContainner}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={"gray"}
                style={{ paddingHorizontal: 10 }}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </View>
          </View>
          <View
            style={[
              styles.inputSectionContainner,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={"gray"}
              secureTextEntry={PasswordSee}
              style={{ flex: 1, paddingHorizontal: 10 }}
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
              }}
            />
            <TouchableOpacity onPress={() => setPasswordSee(!PasswordSee)}>
              <Ionicons
                name={PasswordSee ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              style={{
                width: 300,
                backgroundColor: "#0077b5",
                borderRadius: 5,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
              onPress={handleResister}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <Pressable style={{ marginTop: 15 }}>
              <Text
                style={{ textAlign: "center", fontSize: 16, color: "gray" }}
              >
                Already have an account?
                <Link href="/login" style={{ color: "#0077b5" }}>
                  Login
                </Link>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  inputSectionContainner: {
    padding: 10,
    height: 50,
    width: 300,
    borderColor: "#0077b5",
    backgroundColor: "#f2f2f2",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
