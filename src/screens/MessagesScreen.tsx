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

interface ChatItem {
  id: string;
  name: string;
  initials: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const CHATS_DATA: ChatItem[] = [
  {
    id: 'c1',
    name: 'Elena Rostova',
    initials: 'ER',
    color: '#8B5CF6',
    lastMessage: 'Ready for our session at 7:30 PM! I have the 3D files ready.',
    time: '2m',
    unread: 2,
  },
  {
    id: 'c2',
    name: 'Dr. Aris Thorne',
    initials: 'AT',
    color: '#0284C7',
    lastMessage: 'Looking forward to swapping with you on Ollama.',
    time: '1h',
    unread: 0,
  },
  {
    id: 'c3',
    name: 'Maya Lin',
    initials: 'ML',
    color: '#EC4899',
    lastMessage: 'Let’s review the design token structure tomorrow.',
    time: '3h',
    unread: 0,
  },
  {
    id: 'c4',
    name: 'Sofia Alvarez',
    initials: 'SA',
    color: '#10B981',
    lastMessage: '¡Hola Alex! The Spanish exercise notes are attached.',
    time: 'Yesterday',
    unread: 0,
  },
];

export const MessagesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = CHATS_DATA.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. SIMPLE SEARCH */}
      <View style={styles.searchBar}>
        <Icon name="search" size={16} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
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

      {/* 2. CHAT LIST */}
      {filteredChats.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.chatRow}
          onPress={() =>
            Alert.alert(`Chat with ${chat.name}`, chat.lastMessage)
          }
          activeOpacity={0.7}
        >
          {/* Avatar */}
          <View style={[styles.avatar, { backgroundColor: chat.color }]}>
            <Text style={styles.avatarText}>{chat.initials}</Text>
          </View>

          {/* Details */}
          <View style={styles.chatInfo}>
            <View style={styles.topRow}>
              <Text style={styles.nameText}>{chat.name}</Text>
              <Text style={styles.timeText}>{chat.time}</Text>
            </View>
            <Text style={styles.messageText} numberOfLines={1}>
              {chat.lastMessage}
            </Text>
          </View>

          {/* Unread Pill */}
          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

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
  content: {
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
    marginBottom: 14,
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
  // Chat Row
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  timeText: {
    fontSize: 11.5,
    color: '#94A3B8',
  },
  messageText: {
    fontSize: 13,
    color: '#64748B',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
