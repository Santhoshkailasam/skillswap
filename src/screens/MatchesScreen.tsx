import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

interface MatchItem {
  id: string;
  name: string;
  initials: string;
  color: string;
  matchScore: number;
  teaches: string;
  wants: string;
  filterTag: 'all' | 'high' | 'recent';
}

const FILTER_TABS = [
  { id: 'all', label: 'All Matches' },
  { id: 'high', label: '95%+ Synergy' },
  { id: 'recent', label: 'New Today' },
];

const MATCHES: MatchItem[] = [
  {
    id: 'm1',
    name: 'Kaito Tanaka',
    initials: 'KT',
    color: '#0284C7',
    matchScore: 99,
    teaches: 'Native Japanese & Conversation',
    wants: 'Python & Data Science',
    filterTag: 'high',
  },
  {
    id: 'm2',
    name: 'Amara Okafor',
    initials: 'AO',
    color: '#8B5CF6',
    matchScore: 96,
    teaches: 'Figma & Design Systems',
    wants: 'React Native & Mobile',
    filterTag: 'high',
  },
  {
    id: 'm3',
    name: 'Liam Vance',
    initials: 'LV',
    color: '#F59E0B',
    matchScore: 93,
    teaches: 'Acoustic & Electric Guitar',
    wants: 'Web Development & Tailwind',
    filterTag: 'recent',
  },
  {
    id: 'm4',
    name: 'Sofia Alvarez',
    initials: 'SA',
    color: '#EC4899',
    matchScore: 91,
    teaches: 'Conversational Spanish',
    wants: 'Web Scraping & Python',
    filterTag: 'recent',
  },
  {
    id: 'm5',
    name: 'Marcus Chen',
    initials: 'MC',
    color: '#10B981',
    matchScore: 88,
    teaches: 'Machine Learning & LangChain',
    wants: 'Product Strategy & Metrics',
    filterTag: 'recent',
  },
];

export const MatchesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);

  const handleConnect = (item: MatchItem) => {
    if (pendingRequests.includes(item.id)) {
      Alert.alert('Request Sent', `Your swap invitation with ${item.name} is pending.`);
      return;
    }
    setPendingRequests((prev) => [...prev, item.id]);
    Alert.alert('Invitation Sent! 🚀', `Sent swap invitation to ${item.name}.`);
  };

  const filteredList = MATCHES.filter((item) => {
    if (activeTab === 'high') return item.matchScore >= 95;
    if (activeTab === 'recent') return item.filterTag === 'recent';
    return true;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. CLEAN FILTER TABS */}
      <View style={styles.tabRow}>
        {FILTER_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabChip,
                isSelected && styles.tabChipActive,
              ]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.tabChipText,
                  isSelected && styles.tabChipTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. CLEAN MATCH CARDS */}
      {filteredList.map((item) => {
        const isRequested = pendingRequests.includes(item.id);

        return (
          <View key={item.id} style={styles.card}>
            {/* Header: Avatar, Name, Match Score */}
            <View style={styles.cardHeader}>
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
              </View>

              <View style={styles.nameCol}>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>

              <View style={styles.matchScoreBadge}>
                <Text style={styles.matchScoreText}>{item.matchScore}% Match</Text>
              </View>
            </View>

            {/* Simple Swap Details */}
            <View style={styles.swapDetails}>
              <View style={styles.swapRow}>
                <Text style={styles.swapLabel}>Teaches:</Text>
                <Text style={styles.swapValue}>{item.teaches}</Text>
              </View>

              <View style={styles.swapRow}>
                <Text style={styles.swapLabel}>Wants:</Text>
                <Text style={styles.swapValue}>{item.wants}</Text>
              </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={[
                styles.connectButton,
                isRequested && styles.connectButtonRequested,
              ]}
              onPress={() => handleConnect(item)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.connectButtonText,
                  isRequested && styles.connectButtonTextRequested,
                ]}
              >
                {isRequested ? '✓ Request Pending' : 'Propose Swap'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Spacing for bottom tab bar */}
      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabChipActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  tabChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B',
  },
  tabChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nameCol: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  matchScoreBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  matchScoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  // Swap Details
  swapDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    gap: 8,
  },
  swapRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swapLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    width: 60,
  },
  swapValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  // Button
  connectButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  connectButtonRequested: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  connectButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  connectButtonTextRequested: {
    color: '#16A34A',
  },
});
