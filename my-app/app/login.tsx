import { useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { loginAnonymously, signInWithEmail, signUpWithEmail } from "../lib/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  async function handleAnon() {
    try {
      await loginAnonymously();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleSignup() {
    try {
      await signUpWithEmail(email, pw);
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleLogin() {
    try {
      await signInWithEmail(email, pw);
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>CryMaps Login</Text>

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginTop: 20 }}
      />

      <TextInput
        placeholder="password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginTop: 10 }}
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Log In" onPress={handleLogin} />

      <View style={{ marginTop: 20 }}>
        <Button title="Continue Anonymously" onPress={handleAnon} />
      </View>

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}