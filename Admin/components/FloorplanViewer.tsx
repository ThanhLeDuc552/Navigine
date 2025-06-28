import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  x: number;
  y: number;
};

export default function FloorplanViewer({ x, y }: Props) {
  return (
    <View style={styles.floorplan}>
      <View style={[styles.dot, { left: x, top: y }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  floorplan: {
    width: 300,
    height: 300,
    backgroundColor: '#eee',
    marginTop: 20,
    position: 'relative',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
  },
});
