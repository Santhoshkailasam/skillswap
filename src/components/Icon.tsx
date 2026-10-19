import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

export type IconName =
  | 'home'
  | 'compass'
  | 'plus'
  | 'chat'
  | 'user'
  | 'bell'
  | 'search'
  | 'filter'
  | 'sparkles'
  | 'swap';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color = Colors.cyan,
}) => {
  const s = size;

  switch (name) {
    case 'home':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          {/* Roof */}
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: s * 0.44,
              borderRightWidth: s * 0.44,
              borderBottomWidth: s * 0.38,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
            }}
          />
          {/* Base */}
          <View
            style={{
              width: s * 0.62,
              height: s * 0.42,
              backgroundColor: color,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* Door cutout */}
            <View
              style={{
                width: s * 0.22,
                height: s * 0.24,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
              }}
            />
          </View>
        </View>
      );

    case 'compass':
    case 'sparkles':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          {/* Outer circle */}
          <View
            style={{
              width: s * 0.88,
              height: s * 0.88,
              borderRadius: (s * 0.88) / 2,
              borderWidth: 1.6,
              borderColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Inner Needle diamond */}
            <View
              style={{
                width: s * 0.36,
                height: s * 0.36,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
                borderRadius: 1,
              }}
            />
          </View>
        </View>
      );

    case 'plus':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          <View
            style={{
              position: 'absolute',
              width: 2.2,
              height: s * 0.68,
              backgroundColor: color,
              borderRadius: 1.1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: s * 0.68,
              height: 2.2,
              backgroundColor: color,
              borderRadius: 1.1,
            }}
          />
        </View>
      );

    case 'chat':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          {/* Main Bubble */}
          <View
            style={{
              width: s * 0.82,
              height: s * 0.6,
              backgroundColor: color,
              borderRadius: s * 0.22,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Inner lines */}
            <View
              style={{
                width: s * 0.44,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
                marginBottom: 2,
              }}
            />
            <View
              style={{
                width: s * 0.28,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
                alignSelf: 'flex-start',
                marginLeft: s * 0.19,
              }}
            />
          </View>
          {/* Speech tail */}
          <View
            style={{
              alignSelf: 'flex-start',
              marginLeft: s * 0.2,
              marginTop: -1,
              width: 0,
              height: 0,
              borderTopWidth: 3.5,
              borderLeftWidth: 3.5,
              borderRightWidth: 3.5,
              borderTopColor: color,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          />
        </View>
      );

    case 'user':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          {/* Head */}
          <View
            style={{
              width: s * 0.38,
              height: s * 0.38,
              borderRadius: (s * 0.38) / 2,
              backgroundColor: color,
              marginBottom: 1.5,
            }}
          />
          {/* Shoulders */}
          <View
            style={{
              width: s * 0.72,
              height: s * 0.34,
              borderTopLeftRadius: s * 0.34,
              borderTopRightRadius: s * 0.34,
              borderBottomLeftRadius: 1,
              borderBottomRightRadius: 1,
              backgroundColor: color,
            }}
          />
        </View>
      );

    case 'bell':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          {/* Top handle loop */}
          <View
            style={{
              width: s * 0.18,
              height: s * 0.14,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              borderWidth: 1.2,
              borderColor: color,
              borderBottomWidth: 0,
              marginBottom: -1,
            }}
          />
          {/* Bell dome */}
          <View
            style={{
              width: s * 0.58,
              height: s * 0.46,
              backgroundColor: color,
              borderTopLeftRadius: s * 0.29,
              borderTopRightRadius: s * 0.29,
              borderBottomLeftRadius: 1,
              borderBottomRightRadius: 1,
            }}
          />
          {/* Bell bottom lip */}
          <View
            style={{
              width: s * 0.72,
              height: 1.8,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          {/* Clapper dot */}
          <View
            style={{
              width: 3.2,
              height: 3.2,
              borderRadius: 1.6,
              backgroundColor: color,
              marginTop: 0.8,
            }}
          />
        </View>
      );

    case 'search':
      return (
        <View style={[styles.box, { width: s, height: s }]}>
          <View
            style={{
              width: s * 0.54,
              height: s * 0.54,
              borderRadius: (s * 0.54) / 2,
              borderWidth: 1.8,
              borderColor: color,
              marginRight: 2,
              marginBottom: 2,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: s * 0.14,
              right: s * 0.14,
              width: 1.8,
              height: s * 0.32,
              backgroundColor: color,
              borderRadius: 1,
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'filter':
      return (
        <View style={[styles.box, { width: s, height: s, gap: 2 }]}>
          <View
            style={{
              width: s * 0.7,
              height: 1.8,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              width: s * 0.48,
              height: 1.8,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
          <View
            style={{
              width: s * 0.26,
              height: 1.8,
              backgroundColor: color,
              borderRadius: 1,
            }}
          />
        </View>
      );

    default:
      return (
        <View
          style={[
            styles.box,
            {
              width: s,
              height: s,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: color,
            }}
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
