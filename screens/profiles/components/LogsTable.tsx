import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeightLog, BodyConditionLog, VetVisitLog, LogType } from "@/types";

interface LogsTableProps {
  weightLogs: WeightLog[];
  bodyConditionLogs: BodyConditionLog[];
  vetVisitLogs: VetVisitLog[] | null; // Vet visit logs may be null
  logType: LogType;
}

// Type guards to identify the correct log type based on the selected tab

const isWeightLog = (log: any, logType: LogType): log is WeightLog =>
  logType === "weight";

const isBodyConditionLog = (
  log: any,
  logType: LogType
): log is BodyConditionLog => logType === "body";

const isVetVisitLog = (log: any, logType: LogType): log is VetVisitLog =>
  logType === "vet";

const LogsTable: React.FC<LogsTableProps> = ({
  weightLogs,
  bodyConditionLogs,
  vetVisitLogs,
  logType,
}) => {
  let logsToDisplay: (WeightLog | BodyConditionLog | VetVisitLog)[] = [];

  // Determine which logs should be displayed based on the selected tab
  switch (logType) {
    case "weight":
      logsToDisplay = weightLogs;
      break;
    case "body":
      logsToDisplay = bodyConditionLogs;
      break;
    case "vet":
      logsToDisplay = vetVisitLogs || []; // Ensure it's an array, even if null
      break;
  }

  return (
    <View style={styles.table}>
      <Text style={styles.tableHeader}>Recent Logs</Text>
      {/* Render logs if available, otherwise show a "No logs" message */}
      {logsToDisplay?.length > 0 ? (
        logsToDisplay?.map((log) => (
          <View key={log.id} style={styles.tableRow}>
            {isWeightLog(log, logType) && (
              <Text>Weight: {log.weight ? `${log.weight} kg` : "N/A"}</Text>
            )}
            {isBodyConditionLog(log, logType) && (
              <Text>Condition: {log.body_condition ?? "N/A"}</Text>
            )}
            {isVetVisitLog(log, logType) && (
              <Text style={styles.notes}>Notes: {log.notes || "No notes"}</Text>
            )}
            <Text>
              Date: {log.date ? new Date(log.date).toLocaleDateString() : "N/A"}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noLogsText}>No logs available.</Text>
      )}
    </View>
  );
};

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
  noLogsText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginTop: 8,
  },
  notes: {
    maxWidth: "70%", // Prevents long notes from overlapping with the date
  },
});

export default LogsTable;
