import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import { StateContext } from '../state/context';
import RegisterEmployeeModal from './RegisterEmployeeModal';

const EmployeeInput = () => {
  const [name, setName] = useState('');
  const { isLoading, isError, refetch } = useEmployeeByName(name, false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const { dispatch } = useContext(StateContext);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleGetEmployee = async () => {
    refetch()
      .then((response) => {
        if(response.status !== 'success') {
          return
        }
        dispatch({ type: 'SET_USERNAME', payload: name })
      })
      .catch((error) => console.log(error))

  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Input your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee name. eg: Carlos"
        value={name}
        onChangeText={handleNameChange}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={isLoading || name === '' ? styles.disabledButton : styles.button}
          onPress={handleGetEmployee}
          disabled={isLoading || name === ''}
        >
          <Text style={isLoading || name === '' ? styles.disabledButtonText : styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          setRegisterModalVisible(true)
          setName('')
        }}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <RegisterEmployeeModal
          show={registerModalVisible}
          onClose={() => {
            setRegisterModalVisible(false);
          }}
        />
      </View>
      <View style={styles.messageContainer}>
        {isLoading && <Text>Loading...</Text>}
        {isError && <Text style={styles.errorText}>Error loading employee information.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: '#DF0000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  }, 
  disabledButton: {
    backgroundColor: '#B70202',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#DEDEDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  messageContainer: {
    padding: 32,
    display: 'flex',
    alignItems: 'center'
  }
});

export default EmployeeInput;
