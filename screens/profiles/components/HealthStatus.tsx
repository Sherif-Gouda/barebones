import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pet } from "@/types";

const HealthStatus = ({ pet }: { pet: Pet }) => (
  <View style={styles.healthStatus}>
    <Text style={styles.tableHeader}>Health Status</Text>
    <Text>
      Overall Health: {pet?.logs_weight.length > 3 ? "Good" : "Needs More Data"}
    </Text>
    <Text>Last Vet Visit: 2 months ago</Text>
  </View>
);

const styles = StyleSheet.create({
  healthStatus: {
    padding: 16,
    backgroundColor: "#f0fff0",
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default HealthStatus;
