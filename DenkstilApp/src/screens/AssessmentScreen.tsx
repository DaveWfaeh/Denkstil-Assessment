import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import LikertScale from '../components/LikertScale';
import { shuffledQuestions, sections, PAGE_SIZE, TOTAL_PAGES } from '../data/questions';
import { computeScores } from '../utils/scoring';
import { Score } from '../types';

interface Props {
  onComplete: (scores: Score[]) => void;
  onBack: () => void;
}

export default function AssessmentScreen({ onComplete, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = shuffledQuestions.length;
  const progressPct = (totalAnswered / totalQuestions) * 100;

  const pageStart = currentPage * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, totalQuestions);
  const pageQuestions = shuffledQuestions.slice(pageStart, pageEnd);

  const isPageDone = () =>
    pageQuestions.every((q) => answers[q.key] !== undefined);

  const animatePage = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      callback();
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const handleAnswer = (key: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (!isPageDone()) {
      Alert.alert(
        'Seite unvollständig',
        'Bitte beantworte alle Fragen auf dieser Seite, bevor du weitermachst.',
        [{ text: 'OK' }]
      );
      return;
    }
    if (currentPage < TOTAL_PAGES - 1) {
      animatePage(() => setCurrentPage((p) => p + 1));
    } else {
      const scores = computeScores(answers);
      onComplete(scores);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      animatePage(() => setCurrentPage((p) => p - 1));
    } else {
      onBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressLabel}>Seite {currentPage + 1} von {TOTAL_PAGES}</Text>
          <Text style={styles.progressCount}>{totalAnswered} / {totalQuestions}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
        </View>
        {/* Page dots */}
        <View style={styles.dots}>
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentPage && styles.dotActive,
                i < currentPage && styles.dotDone,
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageHint}>Antworte spontan und intuitiv</Text>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {pageQuestions.map((q, idx) => {
            const sec = sections[q.sectionIndex];
            const answered = answers[q.key] !== undefined;
            return (
              <View
                key={q.key}
                style={[styles.questionCard, answered && styles.questionCardAnswered]}
              >
                <View style={styles.questionMeta}>
                  <Text style={styles.questionNum}>
                    Frage {pageStart + idx + 1} von {totalQuestions}
                  </Text>
                  {answered && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={[styles.sectionTag, { backgroundColor: `${sec.color}18`, borderColor: `${sec.color}40` }]}>
                  <Text style={[styles.sectionTagText, { color: sec.color }]}>
                    {sec.icon} {sec.name}
                  </Text>
                </View>
                <Text style={styles.questionText}>{q.text}</Text>
                <LikertScale
                  value={answers[q.key]}
                  onChange={(val) => handleAnswer(q.key, val)}
                  color={sec.color}
                />
              </View>
            );
          })}
        </Animated.View>
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtnBack} onPress={handlePrev} activeOpacity={0.8}>
          <Text style={styles.navBtnBackText}>← Zurück</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtnNext, isPageDone() && styles.navBtnNextReady]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.navBtnNextText}>
            {currentPage === TOTAL_PAGES - 1 ? 'Auswertung →' : 'Weiter →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f6fa' },

  progressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e3ef',
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: { fontSize: 12, color: '#555', fontWeight: '500' },
  progressCount: { fontSize: 12, color: '#888' },
  progressBarBg: {
    height: 4,
    backgroundColor: '#e0e3ef',
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2680c2',
    borderRadius: 99,
  },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#e0e3ef',
  },
  dotActive: { backgroundColor: '#2680c2' },
  dotDone: { backgroundColor: '#1a9e6e' },

  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 20 },

  pageHeader: { marginBottom: 12 },
  pageHint: { fontSize: 13, color: '#888', fontStyle: 'italic' },

  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e3ef',
  },
  questionCardAnswered: {
    borderColor: 'rgba(26,158,110,0.4)',
    backgroundColor: 'rgba(26,158,110,0.02)',
  },
  questionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  questionNum: { fontSize: 11, color: '#aaa', fontWeight: '500' },
  checkmark: { fontSize: 14, color: '#1a9e6e', fontWeight: '700' },
  sectionTag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  sectionTagText: { fontSize: 11, fontWeight: '600' },
  questionText: {
    fontSize: 14,
    color: '#111',
    lineHeight: 21,
    marginBottom: 14,
  },

  navBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e3ef',
  },
  navBtnBack: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  navBtnBackText: { color: '#1a1c2a', fontWeight: '600', fontSize: 15 },
  navBtnNext: {
    flex: 2,
    backgroundColor: '#c8ccd8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  navBtnNextReady: {
    backgroundColor: '#2680c2',
    shadowColor: '#2680c2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  navBtnNextText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
