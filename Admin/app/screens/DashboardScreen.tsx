import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Location } from '../types';
import LocationItem from '../../components/LocationItem';
import EditLocationScreen from './EditLocationScreen';

const MOCK_LOCATIONS: Location[] = [
  { id: '1', name: 'Phòng họp 101', x: 50, y: 60, building: 'Toà A' },
  { id: '2', name: 'Thư viện', x: 120, y: 80, building: 'Toà B' },
  { id: '3', name: 'Phòng kỹ thuật', x: 200, y: 200, building: 'Toà C' },
  { id: '4', name: 'Phòng máy tính', x: 300, y: 100, building: 'Toà A' },
  { id: '5', name: 'Phòng giáo vụ', x: 400, y: 160, building: 'Toà B' },
];

export default function DashboardScreen() {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [selected, setSelected] = useState<Location | null>(null);

  const groupedByBuilding = locations.reduce<Record<string, Location[]>>(
    (acc, loc) => {
      if (!acc[loc.building]) acc[loc.building] = [];
      acc[loc.building].push(loc);
      return acc;
    },
    {}
  );

  return selected ? (
    <EditLocationScreen
      location={selected}
      onSave={(updated) => {
        setLocations(locations.map((l) => (l.id === updated.id ? updated : l)));
        setSelected(null);
      }}
      onCancel={() => setSelected(null)}
    />
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📍 Quản lý Vị trí</Text>
      <FlatList
        data={Object.keys(groupedByBuilding)}
        keyExtractor={(key) => key}
        renderItem={({ item: building }) => (
          <View style={styles.buildingBlock}>
            <Text style={styles.buildingTitle}>{building}</Text>
            {groupedByBuilding[building].map((loc) => (
              <LocationItem
                key={loc.id}
                location={loc}
                onEdit={() => setSelected(loc)}
              />
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          const newLoc: Location = {
            id: Date.now().toString(),
            name: 'Vị trí mới',
            x: 0,
            y: 0,
            building: 'Toà A',
          };
          setSelected(newLoc);
        }}
      >
        <Text style={styles.addButtonText}>+ Thêm vị trí</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  buildingBlock: {
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  buildingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 6,
  },
  listContent: {
    paddingBottom: 100,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
