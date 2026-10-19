import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../theme/colors';

interface CreateSwapModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CreateSwapModal: React.FC<CreateSwapModalProps> = ({
  visible,
  onClose,
}) => {
  const [giveSkill, setGiveSkill] = useState('');
  const [takeSkill, setTakeSkill] = useState('');
  const [duration, setDuration] = useState('45 min');

  const handleSubmit = () => {
    if (!giveSkill.trim() || !takeSkill.trim()) {
      Alert.alert('Incomplete Details', 'Please specify both skills to trade.');
      return;
    }

    Alert.alert(
      'Swap Proposal Live! 🎉',
      `Your swap offer "${giveSkill} for ${takeSkill}" is now active on the global board!`
    );
    setGiveSkill('');
    setTakeSkill('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.dragBar} />

          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.title}>Post a Skill Swap</Text>
              <Text style={styles.subtitle}>
                Trade your expertise with talented peers
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>What can you teach? (Your Expertise)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. React Native, Node.js, Jazz Guitar..."
              placeholderTextColor={Colors.textMuted}
              value={giveSkill}
              onChangeText={setGiveSkill}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>What do you want to learn?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 3D Blender, Conversational Spanish..."
              placeholderTextColor={Colors.textMuted}
              value={takeSkill}
              onChangeText={setTakeSkill}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Session Format</Text>
            <View style={styles.durationRow}>
              {['30 min', '45 min', '60 min'].map((item) => {
                const isSelected = duration === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.durationChip,
                      isSelected && styles.durationChipActive,
                    ]}
                    onPress={() => setDuration(item)}
                  >
                    <Text
                      style={[
                        styles.durationText,
                        isSelected && styles.durationTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Publish Instant Swap 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 20,
  },
  dragBar: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.textPrimary,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  durationChipActive: {
    borderColor: Colors.cyan,
    backgroundColor: '#E0F2FE',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  durationTextActive: {
    color: Colors.cyan,
    fontWeight: '800',
  },
  submitBtn: {
    backgroundColor: Colors.cyan,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
