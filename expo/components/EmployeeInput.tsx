import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import { StateContext } from '../state/context';

interface EmployeeInputProps {
  name: string;
  setName: (v: string) => void;
}

const EmployeeInput = ({ name, setName }: EmployeeInputProps) => {
  const { isLoading, isError, refetch } = useEmployeeByName(name);

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
      <Text style={styles.label}>Please enter your employee name</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee name. eg: Carlos"
        value={name}
        onChangeText={handleNameChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleGetEmployee}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text style={styles.errorText}>Error loading employee information.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default EmployeeInput;
