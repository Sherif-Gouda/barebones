import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pet, VetVisitLog } from "@/types";

const HealthStatus = ({
  pet,
  latestVetVisit,
}: {
  pet: Pet;
  latestVetVisit: VetVisitLog | null;
}) => (
  <View style={styles.healthStatus}>
    <Text style={styles.tableHeader}>Health Status</Text>
    <Text>
      Overall Health:{" "}
      {pet?.logs_weight?.length > 3 ? "Good" : "Needs More Data"}
    </Text>
    <Text>
      Last Vet Visit:{" "}
      {latestVetVisit?.date
        ? new Date(latestVetVisit.date).toLocaleDateString()
        : "No data"}
    </Text>
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
