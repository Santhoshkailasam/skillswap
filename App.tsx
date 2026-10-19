import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Colors } from './src/theme/colors';
import { SplashScreen } from './src/screens/SplashScreen';
import { DashboardHeader } from './src/components/DashboardHeader';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { MatchesScreen } from './src/screens/MatchesScreen';
import { MessagesScreen } from './src/screens/MessagesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BottomTabBar, TabKey } from './src/components/BottomTabBar';
import { CreateSwapModal } from './src/components/CreateSwapModal';
import { CodePushService } from './src/services/CodePushService';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

function MainApp() {
  const insets = useSafeAreaInsets();
  const [currentTab, setCurrentTab] = useState<TabKey>('Home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check for OTA update on launch
    CodePushService.checkForUpdates();

    // 2. ⚡ Start real-time live alert listener (pops up immediately when Send is clicked)
    const stopListener = CodePushService.startLiveAlertListener();
    return () => stopListener();
  }, []);

  const handleNotificationPress = () => {
    Alert.alert(
      'Notifications (3 unread)',
      '1. Elena accepted your swap invite for 3D Blender\n2. You earned +40 Skill Points from last session\n3. Marcus Chen viewed your React Native profile'
    );
  };

  const handleTabSelect = (tab: TabKey) => {
    if (tab === 'create') {
      setIsCreateModalOpen(true);
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <View style={[styles.rootContainer, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Clean Premium Dashboard Header */}
      <DashboardHeader
        unreadNotifications={3}
        onNotificationPress={handleNotificationPress}
      />

      {/* Screen Body View based on Active Tab */}
      <View style={styles.screenContainer}>
        {currentTab === 'Home' && <DashboardScreen />}
        {currentTab === 'matches' && <MatchesScreen />}
        {currentTab === 'messages' && <MessagesScreen />}
        {currentTab === 'profile' && <ProfileScreen />}
      </View>

      {/* Floating Glassmorphic Bottom Tab Navigation */}
      <BottomTabBar
        currentTab={currentTab}
        onTabSelect={handleTabSelect}
        onCreateSwapPress={() => setIsCreateModalOpen(true)}
      />

      {/* Create / Post Swap Sheet */}
      <CreateSwapModal
        visible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0284C7',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
