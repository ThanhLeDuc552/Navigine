import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MapViewProps {
  x: number;
  y: number;
}

const MapView: React.FC<MapViewProps> = ({ x, y }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/floorplan.png')} // thêm ảnh sơ đồ tại đây
        style={styles.mapBackground}
        resizeMode="contain"
      >
        <Svg height="100%" width="100%">
          {x !== 0 && y !== 0 && <Circle cx={x} cy={y} r="10" fill="blue" />}
        </Svg>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mapBackground: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

export default MapView;
