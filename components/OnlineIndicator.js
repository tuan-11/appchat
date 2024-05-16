import React from 'react';
import { View, StyleSheet,Text} from 'react-native';

export const OnlineIndicator = ({ online }) => {
  return (
    <View style={[styles.indicator, styles.online]}>
      <View style={ online ? styles.onlineDot : styles.offlineDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  offlineDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: 'gray',
  },
});

