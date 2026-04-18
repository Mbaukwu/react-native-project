// ─────────────────────────────────────────────────────────────
// BookingTabs Component
// Screen: Bookings page tab switcher
// Purpose: Toggle between Upcoming and History bookings
// Dependencies: React Native View, TouchableOpacity, AppText
// ─────────────────────────────────────────────────────────────

import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/typography/AppText";

type BookingTabsProps = {
  activeTab: "upcoming" | "history";
  setActiveTab: (tab: "upcoming" | "history") => void;
  upcomingCount: number;
  historyCount: number;
};

// ── Component ────────────────────────────────────────────────
export default function BookingTabs({
  activeTab,
  setActiveTab,
  upcomingCount,
  historyCount,
}: BookingTabsProps) {
  return (
    <View className="flex-row mb-4 gap-6">

      {/* ── Upcoming Tab ──────────────────────────────────── */}
      <TouchableOpacity onPress={() => setActiveTab("upcoming")}>
        <AppText
          className={`text-base ${
            activeTab === "upcoming" ? "text-primary" : "text-text-secondary"
          }`}
          variant={activeTab === "upcoming" ? "bold" : "medium"}
        >
          Upcoming ({upcomingCount})
        </AppText>

        {activeTab === "upcoming" && (
          <View className="h-0.5 bg-primary mt-1 rounded-full w-full" />
        )}
      </TouchableOpacity>

      {/* ── History Tab ───────────────────────────────────── */}
      <TouchableOpacity onPress={() => setActiveTab("history")}>
        <AppText
          className={`text-base ${
            activeTab === "history" ? "text-primary" : "text-text-secondary"
          }`}
          variant={activeTab === "history" ? "bold" : "medium"}
        >
          History ({historyCount})
        </AppText>

        {activeTab === "history" && (
          <View className="h-0.5 bg-primary mt-1 rounded-full w-full" />
        )}
      </TouchableOpacity>

    </View>
  );
}