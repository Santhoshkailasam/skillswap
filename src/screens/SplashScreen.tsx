import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(25)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Text sequence
    Animated.parallel([
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2400,
      useNativeDriver: false,
    }).start();

    // 4. Subtle ambient glow pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.9,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 5. Button fade in
    Animated.timing(buttonFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 1400,
      useNativeDriver: true,
    }).start();

    // Auto finish after 2.8s
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, glowAnim, textFadeAnim, textSlideAnim, buttonFadeAnim, progressAnim, onFinish]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.65],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Ambient background glow effects */}
      <Animated.View
        style={[
          styles.ambientCyanGlow,
          {
            opacity: glowAnim,
            transform: [{ scale: glowAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ambientVioletGlow,
          {
            opacity: glowAnim,
          },
        ]}
      />

      {/* Main Branding Center */}
      <View style={styles.centerContent}>
        {/* Glow halo behind logo */}
        <Animated.View
          style={[
            styles.logoGlowHalo,
            {
              transform: [{ scale: scaleAnim }],
              opacity: glowAnim,
            },
          ]}
        />

        {/* App Logo */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../assets/skillswap_logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Brand Name & Tagline */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textFadeAnim,
              transform: [{ translateY: textSlideAnim }],
            },
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.titleMain}>SKILL</Text>
            <Text style={styles.titleGradient}>SWAP</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.pillBadge}>
              <Text style={styles.badgeText}>PEER-TO-PEER NETWORK</Text>
            </View>
          </View>

          <Text style={styles.tagline}>
            Exchange Mastery · Elevate Together
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Loading Progress & Skip Action */}
      <View style={styles.bottomSection}>
        {/* Progress bar container */}
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[styles.progressBarFill, { width: progressWidth }]}
          />
        </View>

        <Text style={styles.loadingStatusText}>Initializing Smart Swaps...</Text>

        <Animated.View style={{ opacity: buttonFadeAnim, marginTop: 18 }}>
          <TouchableOpacity
            style={styles.enterButton}
            onPress={onFinish}
            activeOpacity={0.85}
          >
            <Text style={styles.enterButtonText}>Enter Dashboard ›</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  ambientCyanGlow: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(2, 132, 199, 0.08)',
  },
  ambientVioletGlow: {
    position: 'absolute',
    top: '30%',
    right: '10%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoGlowHalo: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
  },
  logoWrapper: {
    width: 144,
    height: 144,
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: Colors.surface,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleMain: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  titleGradient: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.cyan,
    letterSpacing: 2,
  },
  badgeRow: {
    marginTop: 10,
    marginBottom: 8,
  },
  pillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.cyan,
    letterSpacing: 1.2,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  bottomSection: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  progressBarBg: {
    width: width * 0.65,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.cyan,
    borderRadius: 2,
  },
  loadingStatusText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  enterButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  enterButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.cyan,
    letterSpacing: 0.5,
  },
});
