import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {gameWinner} from '../../utils/gameState';

const Game = () => {
  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [grid, setGrid] = useState(
    Array.from({length: 9}).map((_, index) => ({
      key: String(index),
      sign: -1,
    })),
  );

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, timer]);

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

  function onPressedGrid(index: number) {
    setGrid(prev => {
      let updatedGrid = [...prev];
      if (updatedGrid[index].sign === -1 && gameWinner(updatedGrid) === -1) {
        if (playerTurn == 0) {
          updatedGrid[index].sign = 0;
        } else {
          updatedGrid[index].sign = 1;
        }
        setTimer(10);
        setIsActive(true);
      }
      if (gameWinner(updatedGrid) != -1) {
        setTimer(0);
        setIsGameOver(true);
      } else {
        setPlayerTurn(prev => {
          return prev == 0 ? 1 : 0;
        });
      }
      return updatedGrid;
    });
  }

  function restartGame() {
    setIsGameOver(false);
    setPlayerTurn(prev => {
      return prev == 0 ? 1 : 0;
    });
    setGrid(
      Array.from({length: 9}).map((_, index) => ({
        key: String(index),
        sign: -1,
      })),
    );
  }

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      style={[styles.cell, disableGridBorder(index)]}
      onPress={() => onPressedGrid(index)}>
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
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../Assets/Images/GameBg.png')}
      style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGameOver}
        onRequestClose={restartGame}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeading}>{`Player ${
              gameWinner(grid) == 0 ? 'O' : 'X'
            } Wins !!!`}</Text>
            <TouchableOpacity style={styles.button} onPress={restartGame}>
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{`0:${timer}`}</Text>
      </View>
      <Text style={styles.heading}>{`Player ${
        playerTurn == 0 ? 'O' : 'X'
      } Turn`}</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalCard: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3A7BD5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
