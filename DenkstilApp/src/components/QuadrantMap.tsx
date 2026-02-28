import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score } from '../types';
import { profiles } from '../data/profiles';
import { sections } from '../data/questions';

interface Props {
  scores: Score[];
}

// Layout order: A top-left, D top-right, B bottom-left, C bottom-right
const QUADRANT_LAYOUT = [
  { sectionIndex: 0, label: 'A – Oben Links' },
  { sectionIndex: 3, label: 'D – Oben Rechts' },
  { sectionIndex: 1, label: 'B – Unten Links' },
  { sectionIndex: 2, label: 'C – Unten Rechts' },
];

const BG_COLORS: Record<string, string> = {
  A: 'rgba(38,128,194,0.08)',
  B: 'rgba(26,158,110,0.08)',
  C: 'rgba(196,90,32,0.08)',
  D: 'rgba(144,48,192,0.08)',
};

export default function QuadrantMap({ scores }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>4-Quadranten-Modell</Text>
      <Text style={styles.subtitle}>
        A = Analytisch · D = Kreativ · B = Organisiert · C = Sozial
      </Text>
      <View style={styles.axisTop}>
        <Text style={styles.axisText}>⬆ Zerebrales Denken</Text>
      </View>
      <View style={styles.grid}>
        {QUADRANT_LAYOUT.map(({ sectionIndex, label }) => {
          const score = scores[sectionIndex];
          const sec = sections[sectionIndex];
          const profile = profiles[score.id];
          return (
            <View
              key={score.id}
              style={[styles.cell, { backgroundColor: BG_COLORS[score.id] }]}
            >
              <Text style={[styles.cellLabel, { color: score.color }]}>{label}</Text>
              <Text style={[styles.cellName, { color: score.color }]}>
                {sec.icon} {profile.label}
              </Text>
              <Text style={styles.cellTraits} numberOfLines={2}>
                {profile.persoenlicheMerkmale.slice(0, 3).join(' · ')}
              </Text>
              <Text style={[styles.cellScore, { color: score.color }]}>
                {score.pct}%
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.axisBottom}>
        <Text style={styles.axisText}>⬇ Limbisches Denken</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e3ef',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: '#888',
    marginBottom: 10,
    lineHeight: 16,
  },
  axisTop: {
    alignItems: 'center',
    marginBottom: 4,
  },
  axisBottom: {
    alignItems: 'center',
    marginTop: 4,
  },
  axisText: {
    fontSize: 10,
    color: '#aaa',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  cell: {
    width: '49%',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  cellLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  cellName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  cellTraits: {
    fontSize: 10,
    color: '#555',
    lineHeight: 14,
    flex: 1,
  },
  cellScore: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
