import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pet, BodyConditionLog, WeightLog, LogType } from "../../types";
import PetCard from "./components/PetCard";
import MonthSummary from "./components/MonthSummary";
import HealthStatus from "./components/HealthStatus";
import LogsTable from "./components/LogsTable";
import TabBar from "./components/TabSelector";

type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "SingleProfile">;

// Mock data for development
const mockPet: Pet = {
  id: "1",
  name: "Max",
  species: "Dog",
  breed: "Golden Retriever",
  age: 3,
  created_at: new Date().toISOString(),
  owner_id: "123",
  logs_weight: [
    { id: "1", pet_id: "1", weight: 25.5, date: "2024-02-25T10:00:00Z" },
    { id: "2", pet_id: "1", weight: 26.0, date: "2024-01-25T10:00:00Z" },
  ],
  logs_bodycondition: [
    { id: "1", pet_id: "1", body_condition: "3", date: "2024-02-25T10:00:00Z" },
    { id: "2", pet_id: "1", body_condition: "4", date: "2024-01-25T10:00:00Z" },
  ],
  logs_vet_visits: [
    {
      id: "1",
      date: "2025-03-01T10:30:00Z",
      notes: "Routine check-up. Vaccinations updated.",
      pet_id: "1",
    },
    {
      id: "2",
      date: "2025-02-15T14:00:00Z",
      notes: "Treated for minor ear infection. Prescribed ear drops.",
      pet_id: "1",
    },
  ],
};

function getThisMonthLogs(
  logs_bodycondition: BodyConditionLog[],
  logs_weight: WeightLog[]
) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const latestBodyConditionLog = logs_bodycondition
    ?.filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const latestWeightLog = logs_weight
    ?.filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return { latestBodyConditionLog, latestWeightLog };
}
const tabs = [
  { key: "weight", tabName: "Weight Logs" },
  { key: "body", tabName: "Body Condition" },
  { key: "vet", tabName: "Vet Visits" },
];
export const SingleProfileScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [thisMonthLogs, setThisMonthLogs] = useState<{
    latestBodyConditionLog: BodyConditionLog | null;
    latestWeightLog: WeightLog | null;
  }>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });
  const [selectedTab, setSelectedTab] = useState<LogType>("weight");
  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPet(mockPet);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  useEffect(() => {
    if (pet) {
      setThisMonthLogs(
        getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight)
      );
    }
  }, [pet]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PetCard pet={pet} />

      <MonthSummary {...thisMonthLogs} />

      <HealthStatus pet={pet} />
      <TabBar tabs={tabs} selectedTab={selectedTab} onSelect={setSelectedTab} />
      <LogsTable
        weightLogs={pet.logs_weight}
        bodyConditionLogs={pet.logs_bodycondition}
        vetVisitLogs={pet.logs_vet_visits}
        logType={selectedTab}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
