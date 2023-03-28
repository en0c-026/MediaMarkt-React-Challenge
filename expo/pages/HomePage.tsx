import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import ParcelLists from '../components/ParcelLists';
import EmployeeInput from '../components/EmployeeInput';
import useCreateEmployee from '../hooks/useCreateEmployee';
import { StateContext } from '../state/context';
import RegisterModal from '../components/RegisterModal';
import CreateListModal from '../components/CreateListModal';
import { useQueryClient } from 'react-query';

const HomePage = () => {
  const [name, setName] = useState('');
  const { data: employee, refetch } = useEmployeeByName(name);
  const { mutate: createEmployee } = useCreateEmployee();
  const { state, dispatch } = useContext(StateContext);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [createListModalVisible, setCreateListModalVisible] = useState(false);

  const handleCreateEmployee = async (employeeName: string) => {
    createEmployee({ employeeName });
    refetch();
    setRegisterModalVisible(false);
  };

  const handleResetUsername = () => dispatch({ type: 'RESET_USERNAME' });

 

  return (
    <View style={styles.container}>
      {!state.username ? (
        <View>
          <EmployeeInput name={name} setName={setName} />
          <TouchableOpacity style={styles.button} onPress={() => setRegisterModalVisible(true)}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>Welcome {state.username ? state.username : 'to CarrieX App!'}</Text>
          <TouchableOpacity style={styles.button} onPress={handleResetUsername}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCreateListModalVisible(true)}>
            <Text style={styles.buttonText}>Create Parcel List</Text>
          </TouchableOpacity>
          <ParcelLists employee={employee} />
        </View>
      )}
      <RegisterModal show={registerModalVisible} onClose={() => setRegisterModalVisible(false)} onCreateEmployee={handleCreateEmployee} />
      <CreateListModal show={createListModalVisible} onClose={() => setCreateListModalVisible(false)} employeeName={state.username} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4a148c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomePage;