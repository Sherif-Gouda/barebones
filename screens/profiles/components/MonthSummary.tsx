import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BodyConditionLog, WeightLog } from "@/types";

const MonthSummary = ({
  latestBodyConditionLog,
  latestWeightLog,
}: {
  latestBodyConditionLog: BodyConditionLog | null;
  latestWeightLog: WeightLog | null;
}) => (
  <View style={styles.monthSummary}>
    <Text style={styles.tableHeader}>This Month's Summary</Text>
    <Text>
      Latest Weight:{" "}
      {latestWeightLog?.weight ? `${latestWeightLog?.weight} kg` : "No data"}
    </Text>
    <Text>
      Body Condition: {latestBodyConditionLog?.body_condition || "No data"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  monthSummary: {
    padding: 16,
    backgroundColor: "#e6f3ff",
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default MonthSummary;
