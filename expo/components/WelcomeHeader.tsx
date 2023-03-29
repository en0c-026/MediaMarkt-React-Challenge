import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StateContext } from '../state/context';

const WelcomeHeader = ({ username }: { username: string}) => {
  const { dispatch } = useContext(StateContext)
  const handleResetUsername = () => dispatch({ type: 'RESET_USERNAME' });

  return (
    <View style={styles.welcomeHeader}>
      <Text style={styles.subtitle}>{`Welcome ${username}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleResetUsername}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#DF0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  }
});

export default WelcomeHeader;