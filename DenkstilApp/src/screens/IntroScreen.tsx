import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface Props {
  onStart: () => void;
}

const QUADRANTS = [
  { id: 'A', color: '#2680c2', bg: 'rgba(38,128,194,0.12)', icon: '🔬', name: 'Analytisch', desc: 'Logisch, faktenbasiert, quantitativ, technisch' },
  { id: 'B', color: '#1a9e6e', bg: 'rgba(26,158,110,0.12)', icon: '📋', name: 'Organisiert', desc: 'Strukturiert, detailorientiert, geplant, zuverlässig' },
  { id: 'C', color: '#c45a20', bg: 'rgba(196,90,32,0.12)',  icon: '🤝', name: 'Sozial', desc: 'Kommunikativ, empathisch, teamorientiert' },
  { id: 'D', color: '#9030c0', bg: 'rgba(144,48,192,0.12)', icon: '💡', name: 'Kreativ', desc: 'Ganzheitlich, intuitiv, innovativ, visionär' },
];

const USE_CASES = [
  { icon: '👤', title: 'Selbsterkenntnis', color: '#2680c2', bg: '#f0f7ff', desc: 'Verstehe, wie du bevorzugt denkst und Entscheidungen triffst.' },
  { icon: '🤝', title: 'Teamdynamik', color: '#1a9e6e', bg: '#f0fff8', desc: 'Verstehe, warum Kollegen anders reagieren.' },
  { icon: '🎯', title: 'Karriere', color: '#c45a20', bg: '#fff8f0', desc: 'Finde Rollen, die zu deinem Denkstil passen.' },
  { icon: '💬', title: 'Kommunikation', color: '#9030c0', bg: '#f8f0ff', desc: 'Lerne, andere Denkstile gezielt anzusprechen.' },
];

export default function IntroScreen({ onStart }: Props) {
  const [consent, setConsent] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.quadrantBadges}>
            {QUADRANTS.map((q) => (
              <View key={q.id} style={[styles.badge, { backgroundColor: q.bg, borderColor: q.color }]}>
                <Text style={[styles.badgeText, { color: q.color }]}>{q.id}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>Denkstil-{'\n'}<Text style={styles.titleItalic}>Assessment</Text></Text>
          <Text style={styles.subtitle}>
            Entdecke deinen bevorzugten Denkstil anhand des 4-Quadranten-Modells –
            inspiriert von Ned Herrmanns Gehirnforschung.
          </Text>
        </View>

        {/* Legal notice */}
        <View style={styles.legalBox}>
          <Text style={styles.legalIcon}>⚖️</Text>
          <View style={styles.legalContent}>
            <Text style={styles.legalTitle}>Rechtlicher Hinweis</Text>
            <Text style={styles.legalText}>
              Dieses Tool ist eine eigenständige, unabhängige Anwendung ohne Verbindung zu Herrmann International
              oder dem offiziellen HBDI®-Verfahren. HBDI® ist eine eingetragene Marke der Herrmann Global LLC.
            </Text>
          </View>
        </View>

        {/* Brain intro */}
        <View style={styles.card}>
          <Text style={styles.brainEmoji}>🧠</Text>
          <Text style={styles.cardTitle}>Warum denken wir so verschieden?</Text>
          <Text style={styles.cardText}>
            Jeder Mensch hat einen einzigartigen Denkstil. Manche lösen Probleme mit Zahlen und Logik,
            andere mit Gespür und Intuition – manche planen akribisch, andere denken in großen Visionen.
            Keiner dieser Stile ist besser oder schlechter – sie sind einfach{' '}
            <Text style={styles.bold}>verschieden</Text>.
          </Text>
        </View>

        {/* Use cases */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Wofür kannst du dieses Assessment nutzen?</Text>
          <View style={styles.useGrid}>
            {USE_CASES.map((u) => (
              <View key={u.title} style={[styles.useItem, { backgroundColor: u.bg }]}>
                <Text style={styles.useIcon}>{u.icon}</Text>
                <View style={styles.useTextGroup}>
                  <Text style={[styles.useTitle, { color: u.color }]}>{u.title}</Text>
                  <Text style={styles.useDesc}>{u.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 4 Quadrants */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Das 4-Quadranten-Modell</Text>
          <Text style={styles.cardText}>
            Entwickelt von <Text style={styles.bold}>Ned Herrmann</Text> in den 1970er-Jahren.
            Jeder Mensch nutzt alle vier Denkstile, hat aber individuelle Vorlieben.
          </Text>
          <View style={styles.quadGrid}>
            {QUADRANTS.map((q) => (
              <View key={q.id} style={[styles.quadItem, { backgroundColor: q.bg }]}>
                <Text style={styles.quadIcon}>{q.icon}</Text>
                <View style={styles.quadText}>
                  <Text style={[styles.quadTitle, { color: q.color }]}>
                    {q.id} – {q.name}
                  </Text>
                  <Text style={styles.quadDesc}>{q.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* How it works */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>So funktioniert das Assessment</Text>
          {[
            { num: '1', text: '40 Aussagen – beantworte jede auf einer Skala von 1 bis 5' },
            { num: '2', text: 'Antworte intuitiv – es gibt keine richtigen oder falschen Antworten' },
            { num: '3', text: 'Dauer ca. 10–15 Minuten – du erhältst danach ein ausführliches Profil' },
          ].map((step) => (
            <View key={step.num} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{step.num}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>

        {/* Privacy */}
        <View style={styles.privacyBox}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            <Text style={styles.bold}>Datenschutz: </Text>
            Dieses Assessment läuft vollständig auf deinem Gerät. Es werden{' '}
            <Text style={styles.bold}>keine Daten gespeichert oder übertragen</Text>.
          </Text>
        </View>

        {/* Consent */}
        <TouchableOpacity
          style={[styles.consentBlock, consent && styles.consentChecked]}
          onPress={() => setConsent(!consent)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
            {consent && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.consentText}>
            <Text style={styles.consentBold}>Ich habe die Hinweise gelesen und verstanden.</Text>
            <Text style={styles.consentMuted}>
              Mir ist bewusst, dass dieses Tool zur Selbstreflexion dient und keine professionelle
              Diagnose ersetzt.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Start button */}
        <TouchableOpacity
          style={[styles.startBtn, !consent && styles.startBtnDisabled]}
          onPress={consent ? onStart : undefined}
          activeOpacity={consent ? 0.8 : 1}
        >
          <Text style={[styles.startBtnText, !consent && styles.startBtnTextDisabled]}>
            Assessment starten →
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Eigenständige, unabhängige Anwendung – keine Verbindung zur Herrmann Global LLC.{'\n'}
          Basiert auf dem wissenschaftlichen Konzept von Ned Herrmann (1976).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f6fa' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },

  header: { alignItems: 'center', marginBottom: 20, paddingTop: 8 },
  quadrantBadges: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  badge: {
    width: 36, height: 36, borderRadius: 8,
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 15, fontWeight: '700' },
  title: { fontSize: 36, fontWeight: '800', color: '#111', textAlign: 'center', lineHeight: 42 },
  titleItalic: { fontStyle: 'italic', fontWeight: '300' },
  subtitle: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20, marginTop: 10, paddingHorizontal: 8 },

  legalBox: {
    backgroundColor: '#fff7ed', borderWidth: 1.5, borderColor: '#f97316',
    borderRadius: 12, padding: 14, flexDirection: 'row', gap: 10, marginBottom: 16,
  },
  legalIcon: { fontSize: 20 },
  legalContent: { flex: 1 },
  legalTitle: { fontSize: 13, fontWeight: '700', color: '#9a3412', marginBottom: 4 },
  legalText: { fontSize: 11, color: '#7c2d12', lineHeight: 16 },

  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#e0e3ef', marginBottom: 12,
  },
  brainEmoji: { fontSize: 36, textAlign: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 8, textAlign: 'center' },
  cardText: { fontSize: 13, color: '#444', lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 },
  bold: { fontWeight: '700' },

  useGrid: { gap: 8 },
  useItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    borderRadius: 10, padding: 10, gap: 10,
  },
  useIcon: { fontSize: 20 },
  useTextGroup: { flex: 1 },
  useTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  useDesc: { fontSize: 11, color: '#555', lineHeight: 16 },

  quadGrid: { marginTop: 12, gap: 8 },
  quadItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    borderRadius: 10, padding: 10, gap: 10,
  },
  quadIcon: { fontSize: 22 },
  quadText: { flex: 1 },
  quadTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  quadDesc: { fontSize: 11, color: '#555', lineHeight: 16 },

  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  stepNum: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#2680c2', alignItems: 'center', justifyContent: 'center',
  },
  stepNumText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  stepText: { flex: 1, fontSize: 13, color: '#333', lineHeight: 19, paddingTop: 3 },

  privacyBox: {
    backgroundColor: '#f0fff8', borderRadius: 10, padding: 12,
    flexDirection: 'row', gap: 8, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(26,158,110,0.25)',
  },
  privacyIcon: { fontSize: 18 },
  privacyText: { flex: 1, fontSize: 12, color: '#444', lineHeight: 18 },

  consentBlock: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    flexDirection: 'row', gap: 12, marginBottom: 16,
    borderWidth: 1.5, borderColor: '#e0e3ef',
  },
  consentChecked: { borderColor: '#1a9e6e', backgroundColor: 'rgba(26,158,110,0.04)' },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: '#1a9e6e', borderColor: '#1a9e6e' },
  checkmark: { color: '#fff', fontWeight: '700', fontSize: 13 },
  consentText: { flex: 1 },
  consentBold: { fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 4 },
  consentMuted: { fontSize: 11, color: '#666', lineHeight: 16 },

  startBtn: {
    backgroundColor: '#2680c2', borderRadius: 14, padding: 16,
    alignItems: 'center', marginBottom: 20,
    shadowColor: '#2680c2', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  startBtnDisabled: { backgroundColor: '#c8ccd8', shadowOpacity: 0 },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  startBtnTextDisabled: { color: '#888' },

  disclaimer: { fontSize: 10, color: '#bbb', textAlign: 'center', lineHeight: 15 },
});
