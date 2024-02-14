import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Game = () => {
  const [grid, setGrid] = useState(
    Array.from({length: 9}).map((_, index) => ({
      key: String(index),
      sign: -1,
    })),
  );

  useEffect(() => {
    setGrid(prev => {
      let updatedGrid = [...prev];
      updatedGrid[4].sign = 1;
      updatedGrid[6].sign = 0;
      return updatedGrid;
    });
  }, []);

  function disableGridBorder(index: number) {
    let style: {[key: string]: number} = {};
    if (index < 3) {
      style.borderTopWidth = 0;
    }
    if (index > 5) {
      style.borderBottomWidth = 0;
    }
    if (index == 0 || index == 3 || index == 6) {
      style.borderLeftWidth = 0;
    }
    if (index == 2 || index == 5 || index == 8) {
      style.borderRightWidth = 0;
    }
    return style;
  }

  const renderItem = ({item, index}: any) => (
    <View style={[styles.cell, disableGridBorder(index)]}>
      {item.sign == 0 && (
        <Image
          source={require('../../Assets/Images/circleSign.png')}
          style={styles.sign}
        />
      )}
      {item.sign == 1 && (
        <Image
          source={require('../../Assets/Images/crossSign.png')}
          style={styles.sign}
        />
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../Assets/Images/GameBg.png')}
      style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timerText}>0:05</Text>
      </View>
      <Text style={styles.heading}>Player X Turn</Text>
      <View style={styles.board}>
        <FlatList
          data={grid}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    </ImageBackground>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    width: 149,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 34,
    color: '#000000',
  },
  heading: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 23,
  },
  board: {
    width: 324,
    height: 324,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  cell: {
    width: 90,
    height: 90,
    borderColor: '#c7c7c7',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
    width: 70,
    height: 70,
  },
});
