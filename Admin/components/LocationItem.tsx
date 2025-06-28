import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Location = {
  id: string;
  name: string;
  x: number;
  y: number;
};

type Props = {
  location: Location;
  onEdit: (loc: Location) => void;
};

export default function LocationItem({ location, onEdit }: Props) {
  return (
    <View style={styles.item}>
      <Text>{location.name}</Text>
      <Button title="Sửa" onPress={() => onEdit(location)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
