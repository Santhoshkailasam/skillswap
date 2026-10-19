import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Icon, IconName } from './Icon';

export type TabKey = 'Home' | 'matches' | 'create' | 'messages' | 'profile';

interface TabItem {
  key: TabKey;
  label: string;
  icon: IconName;
  badge?: number | string;
  isAction?: boolean;
}

interface BottomTabBarProps {
  currentTab: TabKey;
  onTabSelect: (tab: TabKey) => void;
  onCreateSwapPress?: () => void;
}

const TABS: TabItem[] = [
  { key: 'Home', label: 'Home', icon: 'home' },
  { key: 'matches', label: 'Matches', icon: 'sparkles', badge: 'New' },
  { key: 'create', label: 'Swap', icon: 'plus', isAction: true },
  { key: 'messages', label: 'Chat', icon: 'chat', badge: 2 },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabSelect,
  onCreateSwapPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map((tab) => {
          const isActive = currentTab === tab.key;

          if (tab.isAction) {
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.actionButtonWrapper}
                onPress={onCreateSwapPress || (() => onTabSelect(tab.key))}
                activeOpacity={0.85}
              >
                <View style={styles.actionButton}>
                  <Text style={styles.actionIcon}>+</Text>
                </View>
                <Text style={styles.actionLabel}>Post Swap</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onTabSelect(tab.key)}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name={tab.icon}
                  size={17}
                  color={isActive ? Colors.cyan : Colors.textMuted}
                />
                {tab.badge !== undefined && (
                  <View
                    style={[
                      styles.badgeContainer,
                      typeof tab.badge === 'string'
                        ? styles.stringBadge
                        : styles.numBadge,
                    ]}
                  >
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
                ]}
              >
                {tab.label}
              </Text>

              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 14 : 6,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    minWidth: 46,
    position: 'relative',
  },
  activeTabButton: {},
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  activeTabLabel: {
    color: Colors.cyan,
    fontWeight: '700',
  },
  inactiveTabLabel: {
    color: Colors.textMuted,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.cyan,
    marginTop: 1.5,
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.coral,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  numBadge: {
    width: 14,
    height: 14,
  },
  stringBadge: {
    paddingHorizontal: 3,
    height: 12,
    backgroundColor: Colors.violet,
  },
  badgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  actionButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -9,
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actionIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: -1,
  },
  actionLabel: {
    fontSize: 8.5,
    fontWeight: '700',
    color: Colors.cyan,
    marginTop: 2,
  },
});
