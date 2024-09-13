import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const EnterServerId = ({navigation}: any) => {
  const [serverId, setServerId] = useState<number>();

  const onPressCreateGame = () => {
    let randomNumber = Math.floor(Math.random() * 9000 + 1000);
    let grid = Array.from({length: 9}).map((_, index) => ({
      key: String(index),
      sign: -1,
    }));

    firestore()
      .collection('serverId')
      .doc(randomNumber.toString())
      .set({
        grid: grid,
      })
      .then(() => {
        navigation.navigate('Game', {serverId: randomNumber});
      });
  };

  const onPressJoinGame = async () => {
    const server = await firestore()
      .collection('serverId')
      .doc(serverId?.toString())
      .get();
    if (
      serverId != undefined &&
      serverId > 1000 &&
      server.data() != undefined
    ) {
      navigation.navigate('Game', {serverId});
      setServerId(undefined);
    }
  };

  return (
    <ImageBackground
      source={require('../../Assets/Images/SelectSignBg.png')}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.heading}>TIC-TAC-TOE</Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.subHeading}>Server ID</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={num => {
                    if (num.length == 0) {
                      setServerId(undefined);
                    } else {
                      setServerId(parseInt(num));
                    }
                  }}
                  value={serverId?.toString()}
                  placeholder="Enter server ID"
                  placeholderTextColor={'#ffffff'}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressCreateGame}>
                  <Text style={styles.buttonText}>Create Game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressJoinGame}>
                  <Text style={styles.buttonText}>Join Game</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EnterServerId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
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
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#3A7BD5',
    fontWeight: 'bold',
  },
});
