import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import IntroScreen from './src/screens/IntroScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { Score } from './src/types';

type Screen = 'intro' | 'assessment' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [scores, setScores] = useState<Score[]>([]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      {screen === 'intro' && (
        <IntroScreen onStart={() => setScreen('assessment')} />
      )}

      {screen === 'assessment' && (
        <AssessmentScreen
          onComplete={(result) => {
            setScores(result);
            setScreen('results');
          }}
          onBack={() => setScreen('intro')}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          scores={scores}
          onRestart={() => setScreen('intro')}
        />
      )}
    </SafeAreaProvider>
  );
}
