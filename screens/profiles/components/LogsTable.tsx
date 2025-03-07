import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeightLog, BodyConditionLog } from "@/types";

const LogsTable = ({
  weightLogs,
  bodyConditionLogs,
}: {
  weightLogs: WeightLog[];
  bodyConditionLogs: BodyConditionLog[];
}) => (
  <View style={styles.table}>
    <Text style={styles.tableHeader}>Recent Logs</Text>
    {weightLogs.map((log, index) => (
      <View key={index} style={styles.tableRow}>
        <Text>Weight: {log.weight}kg</Text>
        <Text>Date: {new Date(log.date).toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default LogsTable;
