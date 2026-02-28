import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  value?: number;
  onChange: (value: number) => void;
  color: string;
}

const LABELS = ['Gar nicht', 'Wenig', 'Teils', 'Überwiegend', 'Voll'];

export default function LikertScale({ value, onChange, color }: Props) {
  return (
    <View>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((v) => {
          const selected = value === v;
          return (
            <TouchableOpacity
              key={v}
              style={[
                styles.btn,
                selected
                  ? { backgroundColor: color, borderColor: color }
                  : styles.btnIdle,
              ]}
              onPress={() => onChange(v)}
              activeOpacity={0.7}
            >
              <Text style={[styles.num, selected && styles.numSelected]}>
                {v}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>{LABELS[0]}</Text>
        <Text style={styles.labelText}>{LABELS[4]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIdle: {
    backgroundColor: '#f5f6fa',
    borderColor: '#dde0ef',
  },
  num: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  numSelected: {
    color: '#fff',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 10,
    color: '#999',
  },
});
