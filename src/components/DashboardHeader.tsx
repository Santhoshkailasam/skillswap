import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Icon } from './Icon';

interface DashboardHeaderProps {
  unreadNotifications?: number;
  onNotificationPress?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  unreadNotifications = 3,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {/* Brand Section: Light App Logo + App Name */}
        <View style={styles.brandSection}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/skillswap_logo.png')}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.brandTitleContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.brandTitle}>SKILL</Text>
              <Text style={styles.brandTitleAccent}>SWAP</Text>
            </View>
            <Text style={styles.brandSubtitle}>PEER-TO-PEER EXCHANGE</Text>
          </View>
        </View>

        {/* Right Section: Notification Bell */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Icon name="bell" size={18} color="#FFFFFF" />
          {unreadNotifications > 0 && (
            <View style={styles.notificationDot}>
              <Text style={styles.notificationCount}>
                {unreadNotifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0284C7', // Signature Logo Color
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0369A1',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoWrapper: {
    width: 38,
    height: 38,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#34D399',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandTitleContainer: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  brandTitleAccent: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6EE7B7',
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#E0F2FE',
    letterSpacing: 1,
    marginTop: 1,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  notificationCount: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
