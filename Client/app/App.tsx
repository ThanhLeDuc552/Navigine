import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView from '../components/MapView';

interface Position {
  x: number;
  y: number;
}

const MOCK_LOCATIONS = [
  { id: '1', name: 'Phòng họp 101', x: 50, y: 60 },
  { id: '2', name: 'Thư viện', x: 120, y: 80 },
  { id: '3', name: 'Phòng kỹ thuật', x: 200, y: 200 },
];

const App = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(MOCK_LOCATIONS);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (query === '') {
      setSuggestions(MOCK_LOCATIONS);
    } else {
      setSuggestions(
        MOCK_LOCATIONS.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.searchSection}>
          <Text style={styles.title}>🔍 Tìm kiếm vị trí trong nhà (WiFi)</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên phòng hoặc khu vực..."
            value={query}
            onChangeText={setQuery}
          />
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => setSelectedPosition({ x: item.x, y: item.y })}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
        </View>

        <View style={styles.mapContainer}>
          <MapView x={selectedPosition?.x || 0} y={selectedPosition?.y || 0} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  list: {
    maxHeight: 150,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
});

export default App;
