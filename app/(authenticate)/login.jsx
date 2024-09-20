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
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [PasswordSee, setPasswordSee] = React.useState(true);
  const [formData, setFormData] = React.useState({});

  const handleLogin = () => {
    axios
      .post("http://192.168.18.13:4000/linkdinapp/api/v1/user/login", formData)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        router.push("/home");
        setFormData({ email: "", password: "" });
      })
      .catch((error) => {
        console.log("Login failed", error);
        Alert.alert("Login failed", "Invalid email or password");
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
              Log in to your account
            </Text>
          </View>
          <View style={{ marginTop: 60 }}>
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
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text> Keep me Logged in</Text>
            <Text style={{ color: "#007fff", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 80 }}>
            <TouchableOpacity
              style={{
                width: 300,
                backgroundColor: "#0077b5",
                borderRadius: 5,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <Pressable style={{ marginTop: 15 }}>
              <Text
                style={{ textAlign: "center", fontSize: 16, color: "gray" }}
              >
                Don't have an account?{" "}
                <Link href="/Register" style={{ color: "#0077b5" }}>
                  Register
                </Link>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;

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
