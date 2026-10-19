import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Icon } from '../components/Icon';

interface SkillMatch {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  matchScore: number;
  givingSkill: string;
  seekingSkill: string;
  category: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Coding & AI' },
  { id: 'design', label: 'Design & 3D' },
  { id: 'languages', label: 'Languages' },
  { id: 'business', label: 'Business' },
];

const MATCHES_DATA: SkillMatch[] = [
  {
    id: '1',
    name: 'Tom Holland',
    initials: 'ER',
    avatarColor: '#8B5CF6',
    matchScore: 98,
    givingSkill: 'Blender 3D & Animation',
    seekingSkill: 'React Native Development',
    category: 'design',
  },
  {
    id: '2',
    name: 'Dr. Aris Thorne',
    initials: 'AT',
    avatarColor: '#0284C7',
    matchScore: 95,
    givingSkill: 'Python & AI Agents',
    seekingSkill: 'Mobile UI Design',
    category: 'tech',
  },
  {
    id: '3',
    name: 'Maya Lin',
    initials: 'ML',
    avatarColor: '#EC4899',
    matchScore: 94,
    givingSkill: 'Figma & UI/UX Systems',
    seekingSkill: 'Python Automation',
    category: 'design',
  },
  {
    id: '4',
    name: 'Lucas Silva',
    initials: 'LS',
    avatarColor: '#10B981',
    matchScore: 91,
    givingSkill: 'Conversational Spanish',
    seekingSkill: 'iOS & Swift Basics',
    category: 'languages',
  },
  {
    id: '5',
    name: 'Sarah Jenkins',
    initials: 'SJ',
    avatarColor: '#F59E0B',
    matchScore: 89,
    givingSkill: 'Startup Pitch & Sales',
    seekingSkill: 'Next.js Web Development',
    category: 'business',
  },
];

export const DashboardScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [requestedMatches, setRequestedMatches] = useState<string[]>([]);

  const handleProposeSwap = (match: SkillMatch) => {
    if (requestedMatches.includes(match.id)) {
      Alert.alert('Request Sent', `Your swap request with ${match.name} is pending.`);
      return;
    }
    setRequestedMatches((prev) => [...prev, match.id]);
    Alert.alert('Swap Proposed! 🚀', `Sent swap request to ${match.name}.`);
  };

  const filteredMatches = MATCHES_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.givingSkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seekingSkill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. CLEAN SEARCH BAR */}
      <View style={styles.searchBar}>
        <Icon name="search" size={16} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search skill or person..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearSearchText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2. CATEGORY PILLS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                isSelected && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isSelected && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. CLEAN, SPACIOUS SKILL SWAP CARDS */}
      {filteredMatches.map((match) => {
        const isRequested = requestedMatches.includes(match.id);

        return (
          <View key={match.id} style={styles.card}>
            {/* Header: Avatar, Name, Match Score */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: match.avatarColor },
                ]}
              >
                <Text style={styles.avatarText}>{match.initials}</Text>
              </View>

              <View style={styles.nameCol}>
                <Text style={styles.nameText}>{match.name}</Text>
              </View>

              <View style={styles.matchScoreBadge}>
                <Text style={styles.matchScoreText}>{match.matchScore}% Match</Text>
              </View>
            </View>

            {/* Simple Swap Info */}
            <View style={styles.swapDetails}>
              <View style={styles.swapRow}>
                <Text style={styles.swapLabel}>Teaches:</Text>
                <Text style={styles.swapValue}>{match.givingSkill}</Text>
              </View>

              <View style={styles.swapRow}>
                <Text style={styles.swapLabel}>Wants:</Text>
                <Text style={styles.swapValue}>{match.seekingSkill}</Text>
              </View>
            </View>

            {/* Single Action Button */}
            <TouchableOpacity
              style={[
                styles.swapButton,
                isRequested && styles.swapButtonRequested,
              ]}
              onPress={() => handleProposeSwap(match)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.swapButtonText,
                  isRequested && styles.swapButtonTextRequested,
                ]}
              >
                {isRequested ? '✓ Request Pending' : 'Propose Swap'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Space for bottom tab bar */}
      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  clearSearchText: {
    fontSize: 14,
    color: '#94A3B8',
    paddingHorizontal: 4,
  },
  // Categories
  categoryScroll: {
    gap: 8,
    paddingBottom: 14,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  categoryChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryChipTextActive: {
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
  swapButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  swapButtonRequested: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  swapButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  swapButtonTextRequested: {
    color: '#16A34A',
  },
});
