import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { createClient } from "@supabase/supabase-js";

// --- Supabase setup ---
const supabase = createClient('https://dcaoifzkyecshfpfgjhk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYW9pZnpreWVjc2hmcGZnamhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTUxMDEsImV4cCI6MjA3ODc5MTEwMX0.-kpLikBwm0yW1Z-2BKBwboMHeCyBQZ-YzsXo-PgjvOs');

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading map…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Example marker — you’ll replace these with Supabase data later */}
        <Marker
          coordinate={{
            latitude: location.latitude + 0.0005,
            longitude: location.longitude + 0.0005,
          }}
          title="Example Cry Spot"
          description="This is where someone cried."
        />
      </MapView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => alert("Add cry spot screen coming soon!")}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: {
    color: "white",
    fontSize: 32,
    marginTop: -3,
  },
});