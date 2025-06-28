import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FloorplanViewer from '../../components/FloorplanViewer';
import { Location } from '../types';

type Props = {
  readonly location: Location;
  readonly onSave: (updated: Location) => void;
  readonly onCancel: () => void;
};

export default function EditLocationScreen({ location, onSave, onCancel }: Props) {
  const [name, setName] = useState(location.name);
  const [x, setX] = useState(location.x);
  const [y, setY] = useState(location.y);
  const [building, setBuilding] = useState(location.building); // 👈 thêm trường này nếu muốn cho phép chỉnh sửa

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>✏️ Chỉnh sửa vị trí</Text>

        <Text style={styles.label}>Tên vị trí</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên vị trí"
        />

        <Text style={styles.label}>Toà nhà</Text>
        <TextInput
          style={styles.input}
          value={building}
          onChangeText={setBuilding}
          placeholder="Nhập tên toà"
        />

        <Text style={styles.label}>Tọa độ X</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(x)}
          onChangeText={(v) => setX(Number(v))}
          placeholder="Tọa độ X"
        />

        <Text style={styles.label}>Tọa độ Y</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(y)}
          onChangeText={(v) => setY(Number(v))}
          placeholder="Tọa độ Y"
        />

        <Text style={styles.label}>Bản đồ minh họa:</Text>
        <View style={styles.mapPreview}>
          <FloorplanViewer x={x} y={y} />
        </View>

        <View style={styles.row}>
          <Button title="❌ Hủy" onPress={onCancel} color="#9ca3af" />
          <Button
            title="💾 Lưu"
            onPress={() => onSave({ ...location, name, x, y, building })}
            color="#2563eb"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  mapPreview: {
    marginTop: 12,
    height: 200,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});
