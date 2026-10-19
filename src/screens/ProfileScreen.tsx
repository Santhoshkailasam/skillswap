import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. LUXURY HERO PROFILE CARD */}
      <View style={styles.heroCard}>
        {/* Subtle Decorative Banner Accent */}
        <View style={styles.cardCoverAccent} />

        {/* Avatar with Verified Ring */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AR</Text>
            </View>
          </View>
          {/* Verified Badge */}
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedBadgeText}>✓</Text>
          </View>
        </View>

        {/* Identity & Status */}
        <Text style={styles.userName}>Alex Rivera</Text>
        <Text style={styles.userRole}>Staff Mobile Architect & Mentor</Text>

        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Open for Swaps · 📍 San Francisco</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryActionButton}
            onPress={() => Alert.alert('Edit Profile', 'Update your headline, skills, and bio.')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryActionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionButton}
            onPress={() => Alert.alert('Share Profile', 'Public link copied to clipboard: skillswap.me/@alexrivera')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryActionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. BENTO METRICS GRID (3 LUXURY STAT CARDS) */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>28</Text>
          <Text style={styles.metricLabel}>Swaps Done</Text>
          <Text style={styles.metricSub}>100% success</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.ratingValRow}>
            <Text style={styles.metricValue}>4.98</Text>
            <Text style={styles.metricStar}>★</Text>
          </View>
          <Text style={styles.metricLabel}>Trust Score</Text>
          <Text style={styles.metricSub}>42 reviews</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: '#0284C7' }]}>Top 1%</Text>
          <Text style={styles.metricLabel}>Peer Rank</Text>
          <Text style={styles.metricSub}>Gold Mentor</Text>
        </View>
      </View>

      {/* 3. SKILLS I TEACH (EXPERTISE PORTFOLIO) */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Teaching Expertise</Text>
            <Text style={styles.sectionSubtitle}>Skills I actively teach & mentor</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Add Skill', 'Add a skill you can teach to your profile.')}
            style={styles.addSkillBtn}
          >
            <Text style={styles.addSkillBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsList}>
          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#0284C7' }]} />
              <View>
                <Text style={styles.skillItemTitle}>React Native & TypeScript</Text>
                <Text style={styles.skillItemLevel}>Mastery · 18 Swaps Completed</Text>
              </View>
            </View>
            <View style={styles.levelBadgeGreen}>
              <Text style={styles.levelBadgeGreenText}>PRO</Text>
            </View>
          </View>

          <View style={styles.skillDivider} />

          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#8B5CF6' }]} />
              <View>
                <Text style={styles.skillItemTitle}>Mobile Architecture & Zustand</Text>
                <Text style={styles.skillItemLevel}>Expert · 8 Swaps Completed</Text>
              </View>
            </View>
            <View style={styles.levelBadgeGreen}>
              <Text style={styles.levelBadgeGreenText}>EXPERT</Text>
            </View>
          </View>

          <View style={styles.skillDivider} />

          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#10B981' }]} />
              <View>
                <Text style={styles.skillItemTitle}>App Performance & Profiling</Text>
                <Text style={styles.skillItemLevel}>Advanced · 4 Swaps Completed</Text>
              </View>
            </View>
            <View style={styles.levelBadgeGreen}>
              <Text style={styles.levelBadgeGreenText}>ADVANCED</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 4. SKILLS I WANT TO LEARN */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Learning Wishlist</Text>
            <Text style={styles.sectionSubtitle}>Skills I am actively looking to learn</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Add Wish', 'Add a skill you want to learn.')}
            style={styles.addSkillBtn}
          >
            <Text style={styles.addSkillBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsList}>
          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#F59E0B' }]} />
              <View>
                <Text style={styles.skillItemTitle}>Blender 3D Modeling & Spline</Text>
                <Text style={styles.skillItemLevel}>Goal: Interactive 3D App UI</Text>
              </View>
            </View>
            <View style={styles.levelBadgeBlue}>
              <Text style={styles.levelBadgeBlueText}>LEARNING</Text>
            </View>
          </View>

          <View style={styles.skillDivider} />

          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#EC4899' }]} />
              <View>
                <Text style={styles.skillItemTitle}>Conversational Japanese</Text>
                <Text style={styles.skillItemLevel}>Goal: JLPT N3 Fluency</Text>
              </View>
            </View>
            <View style={styles.levelBadgeBlue}>
              <Text style={styles.levelBadgeBlueText}>LEARNING</Text>
            </View>
          </View>

          <View style={styles.skillDivider} />

          <View style={styles.skillItem}>
            <View style={styles.skillItemLeft}>
              <View style={[styles.skillIconDot, { backgroundColor: '#6366F1' }]} />
              <View>
                <Text style={styles.skillItemTitle}>SwiftUI & Metal Shaders</Text>
                <Text style={styles.skillItemLevel}>Goal: Custom GPU Visual Effects</Text>
              </View>
            </View>
            <View style={styles.levelBadgeBlue}>
              <Text style={styles.levelBadgeBlueText}>LEARNING</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 5. ACCOUNT & PREFERENCES (APPLE SETTINGS STYLE) */}
      <View style={styles.menuCard}>
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => Alert.alert('Swap Preferences', 'Set video call hours, max weekly swaps, and format.')}
          activeOpacity={0.7}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Text style={styles.menuIconText}>⚡</Text>
            </View>
            <View>
              <Text style={styles.menuTitle}>Swap Preferences</Text>
              <Text style={styles.menuSubtitle}>Availability, 1-on-1 format & timezone</Text>
            </View>
          </View>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => Alert.alert('Verified Credentials', 'ID Verified · GitHub Linked · LinkedIn Linked')}
          activeOpacity={0.7}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconBox, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.menuIconText}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.menuTitle}>Trust & Verification</Text>
              <Text style={styles.menuSubtitle}>Identity verified & linked accounts</Text>
            </View>
          </View>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => Alert.alert('Help & Support', 'Reach our 24/7 peer community concierge.')}
          activeOpacity={0.7}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Text style={styles.menuIconText}>💬</Text>
            </View>
            <View>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>FAQs, guides and support team</Text>
            </View>
          </View>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom spacing for bottom navigation bar */}
      <View style={{ height: 80 }} />
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
  // 1. Luxury Hero Card
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  cardCoverAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#F0F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2FE',
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 14,
    marginBottom: 12,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    borderColor: '#0284C7',
    padding: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: 1,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  userRole: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 18,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryActionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  // 2. Bento Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  ratingValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  metricStar: {
    fontSize: 15,
    color: '#F59E0B',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginTop: 2,
  },
  metricSub: {
    fontSize: 9.5,
    color: '#94A3B8',
    marginTop: 2,
  },
  // 3. Section Cards
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  addSkillBtn: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  addSkillBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0284C7',
  },
  skillsList: {
    gap: 2,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  skillItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  skillIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skillItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  skillItemLevel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  levelBadgeGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  levelBadgeGreenText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  levelBadgeBlue: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  levelBadgeBlueText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0284C7',
  },
  skillDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  // 4. Menu Card
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 16,
  },
  menuTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  menuChevron: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '400',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
