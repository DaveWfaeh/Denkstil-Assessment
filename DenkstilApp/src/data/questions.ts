import { QuadrantSection, Question } from '../types';

export const sections: QuadrantSection[] = [
  {
    id: 'A',
    name: 'Analytisches Denken',
    color: '#2680c2',
    icon: '🔬',
    questions: [
      'Ich löse Probleme bevorzugt durch logische Analyse und faktenbasiertes Denken.',
      'Ich verlasse mich beim Entscheiden hauptsächlich auf Daten und Zahlen.',
      'Mathematische oder technische Aufgaben liegen mir gut.',
      'Ich schätze Objektivität und vermeide es, Entscheidungen von Emotionen leiten zu lassen.',
      'Ich beschäftige mich gerne mit komplexen theoretischen Fragestellungen.',
      'Ich überprüfe Argumente kritisch, bevor ich ihnen zustimme.',
      'Beim Lernen bevorzuge ich logische, systematische Erklärungen.',
      'Ich finde Freude daran, abstrakte Konzepte durchzudenken.',
      'In Diskussionen argumentiere ich vorrangig mit Fakten und Beweisen.',
      'Ich bevorzuge Aufgaben, bei denen ich Hypothesen aufstellen und testen kann.',
    ],
  },
  {
    id: 'B',
    name: 'Organisiertes Denken',
    color: '#1a9e6e',
    icon: '📋',
    questions: [
      'Ich plane meine Arbeit detailliert und halte mich an Strukturen und Pläne.',
      'Ich bevorzuge klare Regeln, Verfahren und Standards.',
      'Ich mag es, Aufgaben Schritt für Schritt in einer festgelegten Reihenfolge abzuarbeiten.',
      'Ordnung und Sauberkeit sind mir bei der Arbeit sehr wichtig.',
      'Ich beachte Details und stelle sicher, dass keine Fehler auftreten.',
      'Ich erledige Aufgaben pünktlich und halte Fristen konsequent ein.',
      'Ich fühle mich unwohl, wenn Pläne spontan geändert werden.',
      'Ich verwalte gerne Informationen in geordneten Listen oder Dateisystemen.',
      'Zuverlässigkeit und Beständigkeit sind für mich wichtige Werte bei der Arbeit.',
      'Ich dokumentiere meine Arbeitsprozesse sorgfältig.',
    ],
  },
  {
    id: 'C',
    name: 'Soziales Denken',
    color: '#c45a20',
    icon: '🤝',
    questions: [
      'Im Team zu arbeiten macht mir deutlich mehr Spaß als alleine zu arbeiten.',
      'Ich achte sehr auf die Gefühle und Bedürfnisse anderer Menschen.',
      'Ich kommuniziere offen und spreche auch persönliche Themen an.',
      'Ich bin häufig derjenige, der Konflikte im Team vermittelt und löst.',
      'Feedback und Wertschätzung aus meinem Umfeld sind mir sehr wichtig.',
      'Ich lerne am besten durch Austausch und Gespräche mit anderen.',
      'Mir liegt das Wohlbefinden meiner Kollegen oder Mitmenschen am Herzen.',
      'Ich bevorzuge kooperative Lösungsansätze gegenüber Konkurrenz.',
      'Ich engagiere mich gerne in sozialen Projekten oder Gemeinschaftsaktivitäten.',
      'Persönliche Beziehungen spielen bei meinen beruflichen Entscheidungen eine große Rolle.',
    ],
  },
  {
    id: 'D',
    name: 'Kreatives Denken',
    color: '#9030c0',
    icon: '💡',
    questions: [
      'Ich denke oft in Bildern, Metaphern oder ganzheitlichen Konzepten.',
      'Neue und ungewöhnliche Ideen faszinieren mich mehr als bewährte Methoden.',
      'Ich verlasse mich häufig auf meine Intuition, wenn ich Entscheidungen treffe.',
      'Ich sehe Probleme eher als Chancen und Möglichkeiten zur Veränderung.',
      'Ich bin offen für Risiken, wenn ich an eine neue Idee glaube.',
      'Brainstorming und kreatives Explorieren bereiten mir viel Freude.',
      'Ich sehe Zusammenhänge zwischen scheinbar unverbundenen Dingen.',
      'Mich interessiert die Zukunft und wie Dinge sein könnten, nicht nur wie sie sind.',
      'Ich breche gerne aus gewohnten Denkmustern aus.',
      'Künstlerischer oder gestalterischer Ausdruck liegt mir.',
    ],
  },
];

function seededShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  let seed = 42;
  function rand() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allQuestions: Question[] = sections.flatMap((sec, si) =>
  sec.questions.map((text, qi) => ({
    text,
    sectionIndex: si,
    questionIndex: qi,
    key: `${si}_${qi}`,
  }))
);

export const shuffledQuestions: Question[] = seededShuffle(allQuestions);
export const PAGE_SIZE = 8;
export const TOTAL_PAGES = Math.ceil(shuffledQuestions.length / PAGE_SIZE);
