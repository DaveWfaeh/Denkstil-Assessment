import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Score } from '../types';
import { getPreferenceLevel } from '../utils/scoring';

interface Props {
  score: Score;
  animDelay?: number;
}

export default function ScoreCard({ score, animDelay = 0 }: Props) {
  const pref = getPreferenceLevel(score.pct);
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barAnim, {
      toValue: score.pct,
      duration: 800,
      delay: animDelay,
      useNativeDriver: false,
    }).start();
  }, [score.pct, animDelay]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelGroup}>
          <View style={styles.labelRow}>
            <View style={[styles.dot, { backgroundColor: score.color }]} />
            <Text style={styles.label} numberOfLines={1}>
              {score.id} – {score.name}
            </Text>
          </View>
          <View
            style={[
              styles.prefBadge,
              { backgroundColor: pref.bg, borderColor: pref.border },
            ]}
          >
            <Text style={[styles.prefText, { color: pref.color }]}>
              Stufe {pref.level}: {pref.label}
            </Text>
          </View>
        </View>
        <Text style={[styles.pct, { color: score.color }]}>{score.pct}%</Text>
      </View>

      <View style={styles.barBg}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: score.color,
              width: barAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e3ef',
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelGroup: {
    flex: 1,
    marginRight: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  prefBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
  },
  prefText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pct: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
  barBg: {
    height: 5,
    backgroundColor: '#e0e3ef',
    borderRadius: 99,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 99,
  },
});
