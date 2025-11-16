import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { signUpWithEmail } from "../lib/auth";
import { useFonts, Zain_400Regular } from "@expo-google-fonts/zain";
import { COLORS } from "../lib/theme";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Zain_400Regular,
  });

  async function handleSignup() {
    setLoading(true);
    setError("");
    try {
      await signUpWithEmail(email, pw, name);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/crymaps-icon.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>CryMaps</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <TextInput
        placeholder="Your Name (optional)"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
        placeholderTextColor={COLORS.placeholder}
      />

      <TextInput
        placeholder="email@address.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor={COLORS.placeholder}
      />

      <TextInput
        placeholder="password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
        placeholderTextColor={COLORS.placeholder}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} />
        ) : (
          <Text style={styles.buttonTextPrimary}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Link to Log In */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.linkButtonText}>
          Already have an account? <Text style={{fontWeight: 'bold'}}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Zain_400Regular",
    fontSize: 64,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  errorText: {
    color: COLORS.red,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonTextPrimary: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 15,
  },
  linkButtonText: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: "center",
  },
});