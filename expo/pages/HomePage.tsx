import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ParcelLists from '../components/ParcelLists';
import EmployeeInput from '../components/EmployeeInput';
import { StateContext } from '../state/context';
import WelcomeHeader from '../components/WelcomeHeader';

const HomePage = () => {
  const { state } = useContext(StateContext);

  return (
    <View style={styles.container}>
      {!state.username ?
        <>
          <Text style={styles.title}>CarrieX App</Text>
          <EmployeeInput />
        </> :
        <>
          <WelcomeHeader username={state.username} />
          <ParcelLists />
        </>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
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

export default HomePage;