import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const SelectSign = () => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/SelectSignBg.png')}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>TIC-TAC-TOE</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.subHeading}>Pick who goes first?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signContainer}>
            <Image source={require('../../Assets/Images/crossSign.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signContainer}>
            <Image source={require('../../Assets/Images/circleSign.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SelectSign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 42,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subHeading: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 21,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  signContainer: {
    width: 143,
    height: 143,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
