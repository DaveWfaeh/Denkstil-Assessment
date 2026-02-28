import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Share,
} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import SpiderChart from '../components/SpiderChart';
import QuadrantMap from '../components/QuadrantMap';
import { profiles } from '../data/profiles';
import { sections } from '../data/questions';
import { getPreferenceLevel } from '../utils/scoring';
import { Score } from '../types';

interface Props {
  scores: Score[];
  onRestart: () => void;
}

const RANK_LABELS = ['🥇 Höchste Präferenz', '🥈 Zweite Präferenz', '🥉 Dritte Präferenz', '4️⃣ Geringste Präferenz'];

export default function ResultsScreen({ scores, onRestart }: Props) {
  const sorted = [...scores].sort((a, b) => b.pct - a.pct);
  const dominant = sorted[0];

  const handleShare = async () => {
    const lines = [
      'Mein Denkstil-Profil (Fäh Consulting)',
      '─────────────────────────',
      ...sorted.map((s, i) => `${i + 1}. ${s.id} – ${s.name}: ${s.pct}%`),
      '',
      `Dominanter Stil: ${dominant.id} – ${dominant.name}`,
      `Profil: ${profiles[dominant.id].label}`,
    ];
    try {
      await Share.share({ message: lines.join('\n') });
    } catch {
      // silently ignore
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.eyebrow}>Dein Ergebnis</Text>
          <Text style={styles.title}>Dein Denkstil-Profil</Text>
          <Text style={styles.subtitle}>
            Alle vier Quadranten wurden bewertet – deine Präferenzen zeigen,
            welche Denkstile dir besonders leichtfallen.
          </Text>
        </View>

        {/* Preference order */}
        <View style={styles.prefOrderBox}>
          <Text style={styles.prefOrderLabel}>Deine Präferenz-Reihenfolge</Text>
          <View style={styles.prefBadgesRow}>
            {sorted.map((s, i) => (
              <React.Fragment key={s.id}>
                <View style={[styles.prefBadge, { backgroundColor: s.color }]}>
                  <Text style={styles.prefBadgeText}>{s.id}</Text>
                </View>
                {i < sorted.length - 1 && (
                  <Text style={styles.prefArrow}>›</Text>
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.prefDominant}>
            Dominantester Stil:{' '}
            <Text style={[styles.bold, { color: dominant.color }]}>
              {dominant.id} – {dominant.name} ({dominant.pct}%)
            </Text>
          </Text>
        </View>

        {/* Score cards */}
        {scores.map((s, i) => (
          <ScoreCard key={s.id} score={s} animDelay={i * 120} />
        ))}

        {/* Spider chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Denkstil-Spinnendiagramm</Text>
          <Text style={styles.cardSubtitle}>Je größer die Fläche, desto stärker die Präferenz</Text>
          <View style={styles.spiderWrap}>
            <SpiderChart scores={scores} size={280} />
          </View>
        </View>

        {/* Quadrant map */}
        <QuadrantMap scores={scores} />

        {/* Whole brain note */}
        <View style={styles.wholeBrainNote}>
          <Text style={styles.wholeBrainText}>
            💡 <Text style={styles.bold}>Ganzhirn-Denken (Whole Brain Thinking):</Text>{' '}
            Im 4-Quadranten-Modell ist kein Denkstil besser als ein anderer. Die stärkste Wirkung
            entsteht durch das bewusste Nutzen aller vier Quadranten.
          </Text>
        </View>

        {/* Detailed profile for each quadrant */}
        <Text style={styles.profilesTitle}>Dein ausführliches Denkstil-Profil</Text>
        {sorted.map((s, rank) => {
          const p = profiles[s.id];
          const sec = sections.find((x) => x.id === s.id)!;
          const pref = getPreferenceLevel(s.pct);
          return (
            <View
              key={s.id}
              style={[styles.profileCard, { borderLeftColor: s.color, borderLeftWidth: 4 }]}
            >
              {/* Card header */}
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardLeft}>
                  <View style={[styles.profileBadge, { backgroundColor: s.color }]}>
                    <Text style={styles.profileBadgeText}>{s.id}</Text>
                  </View>
                  <View>
                    <Text style={styles.profileLabel}>
                      {sec.icon} {p.label}
                    </Text>
                    <Text style={[styles.profileRank, { color: s.color }]}>{RANK_LABELS[rank]}</Text>
                  </View>
                </View>
                <View style={styles.profileCardRight}>
                  <Text style={[styles.profilePct, { color: s.color }]}>{s.pct}%</Text>
                  <View style={[styles.prefLevelBadge, { backgroundColor: pref.bg, borderColor: pref.border }]}>
                    <Text style={[styles.prefLevelText, { color: pref.color }]}>
                      Stufe {pref.level} · {pref.label}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Traits */}
              <View style={styles.tagsSection}>
                <Text style={styles.tagsLabel}>Persönliche Merkmale</Text>
                <View style={styles.tags}>
                  {p.persoenlicheMerkmale.map((t) => (
                    <View key={t} style={[styles.tag, { backgroundColor: `${s.color}18`, borderColor: `${s.color}40` }]}>
                      <Text style={[styles.tagText, { color: s.color }]}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Work traits */}
              <View style={styles.tagsSection}>
                <Text style={styles.tagsLabel}>Bevorzugte Tätigkeiten</Text>
                <View style={styles.tags}>
                  {p.arbeitsMerkmale.map((t) => (
                    <View key={t} style={styles.tagWork}>
                      <Text style={styles.tagWorkText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Detail items */}
              {[
                { icon: '💪', label: 'Stärken', text: p.staerken, bg: '#f8f9fc' },
                { icon: '🏢', label: 'Im Beruf', text: p.arbeit, bg: '#f8f9fc' },
                { icon: '⚡', label: 'Unter Druck', text: p.unterDruck, bg: '#fff8f0' },
                { icon: '🌱', label: 'Entwicklung', text: p.entwicklung, bg: '#f0fff8' },
                { icon: '📚', label: 'Lernstil', text: p.lernstil, bg: '#f0f7ff' },
                { icon: '💬', label: 'Kommunikation', text: p.kommunikation, bg: '#f8f0ff' },
              ].map((item) => (
                <View key={item.label} style={[styles.detailItem, { backgroundColor: item.bg }]}>
                  <Text style={styles.detailLabel}>{item.icon} {item.label}</Text>
                  <Text style={styles.detailText}>{item.text}</Text>
                </View>
              ))}

              {/* Career */}
              <View style={styles.careerBox}>
                <Text style={styles.careerLabel}>🎯 Passende Berufsfelder</Text>
                <Text style={styles.careerText}>{p.karriere}</Text>
              </View>
            </View>
          );
        })}

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            ⚠️ <Text style={styles.bold}>Hinweis:</Text> Dieses Ergebnis dient ausschließlich zur
            persönlichen Selbstreflexion. Kein zertifiziertes psychologisches Testverfahren,
            kein Ersatz für professionelle Beratung.{'\n\n'}
            Eigenständige, unabhängige Anwendung – keine Verbindung zur Herrmann Global LLC oder
            dem offiziellen HBDI®-Verfahren.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnShare} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.btnShareText}>Teilen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRestart} onPress={onRestart} activeOpacity={0.8}>
            <Text style={styles.btnRestartText}>🔄 Neu starten</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f6fa' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },

  resultsHeader: { alignItems: 'center', marginBottom: 20 },
  eyebrow: { fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '800', color: '#111', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },

  prefOrderBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e3ef',
    marginBottom: 12,
    alignItems: 'center',
  },
  prefOrderLabel: { fontSize: 12, color: '#888', marginBottom: 10, fontWeight: '500' },
  prefBadgesRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  prefBadge: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8,
  },
  prefBadgeText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  prefArrow: { color: '#aaa', fontWeight: '700', fontSize: 18 },
  prefDominant: { fontSize: 12, color: '#555' },
  bold: { fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e3ef',
    marginBottom: 12,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 3, alignSelf: 'flex-start' },
  cardSubtitle: { fontSize: 11, color: '#999', marginBottom: 12, alignSelf: 'flex-start' },
  spiderWrap: { alignItems: 'center' },

  wholeBrainNote: {
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fde68a',
    marginBottom: 20,
  },
  wholeBrainText: { fontSize: 13, color: '#444', lineHeight: 19 },

  profilesTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 12 },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e3ef',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  profileCardLeft: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', flex: 1 },
  profileBadge: {
    width: 34, height: 34, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  profileBadgeText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  profileLabel: { fontSize: 14, fontWeight: '700', color: '#111' },
  profileRank: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  profileCardRight: { alignItems: 'flex-end' },
  profilePct: { fontSize: 28, fontWeight: '700', lineHeight: 32 },
  prefLevelBadge: {
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 5, borderWidth: 1, marginTop: 2,
  },
  prefLevelText: { fontSize: 10, fontWeight: '600' },

  tagsSection: { marginBottom: 10 },
  tagsLabel: {
    fontSize: 10, fontWeight: '700', color: '#888',
    textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 6,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  tag: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 6, borderWidth: 1,
  },
  tagText: { fontSize: 11, fontWeight: '600' },
  tagWork: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 6, backgroundColor: '#f0f4ff',
  },
  tagWorkText: { fontSize: 11, color: '#4466aa', fontWeight: '500' },

  detailItem: {
    borderRadius: 10, padding: 10, marginBottom: 6,
  },
  detailLabel: { fontSize: 12, fontWeight: '700', color: '#333', marginBottom: 4 },
  detailText: { fontSize: 12, color: '#555', lineHeight: 18 },

  careerBox: {
    backgroundColor: '#f8f9fc',
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  careerLabel: { fontSize: 12, fontWeight: '700', color: '#333', marginBottom: 4 },
  careerText: { fontSize: 12, color: '#555', lineHeight: 18 },

  disclaimerBox: {
    backgroundColor: '#fff8f0',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fde68a',
    marginBottom: 16,
  },
  disclaimerText: { fontSize: 11, color: '#666', lineHeight: 17 },

  actionRow: { flexDirection: 'row', gap: 10 },
  btnShare: {
    flex: 1,
    backgroundColor: '#2680c2',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#2680c2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  btnShareText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnRestart: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnRestartText: { color: '#1a1c2a', fontWeight: '600', fontSize: 15 },
});
