import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Tab {
  key: string;
  tabName: string;
}

interface TabBarProps {
  tabs: Tab[];
  selectedTab: string;
  onSelect: (key: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, selectedTab, onSelect }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, selectedTab === tab.key && styles.selectedTab]}
          onPress={() => onSelect(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.key && styles.selectedTabText,
            ]}
          >
            {tab.tabName}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1, // Distribute tabs equally
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  selectedTabText: {
    color: "#fff",
  },
});

export default TabBar;
