import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import ParcelLists from '../components/ParcelLists';
import EmployeeInput from '../components/EmployeeInput';
import { StateContext } from '../state/context';
import RegisterEmployeeModal from '../components/RegisterEmployeeModal';
import AddParcelListModal from '../components/AddParcelListModal';
import Icon from 'react-native-vector-icons/AntDesign';

const HomePage = () => {
  const [name, setName] = useState('');
  const { data: employee, refetch } = useEmployeeByName(name);
  const { state, dispatch } = useContext(StateContext);
  const [createListModalVisible, setAddParcelListModalVisible] = useState(false);
  const handleResetUsername = () => dispatch({ type: 'RESET_USERNAME' });

  return (
    <View style={styles.container}>
      {!state.username ?
        <>
          <Text style={styles.title}>CarrieX App</Text>
          <EmployeeInput name={name} setName={setName} />
        </> :
        <>
          <View style={styles.welcomeHeader}>
            <Text style={styles.subtitle}>Welcome {state.username ? state.username : 'to CarrieX App!'}</Text>
            <TouchableOpacity style={styles.button} onPress={handleResetUsername}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <ParcelLists employee={employee} onDeleteList={() => refetch()} />
          <TouchableOpacity style={styles.addButtonContainer} onPress={() => setAddParcelListModalVisible(true)}>
            <Icon name='pluscircle' color='#DF0000' size={48} />
          </TouchableOpacity>
        </>
      }
      <AddParcelListModal
        show={createListModalVisible}
        onClose={() => {
          setAddParcelListModalVisible(false)
          refetch()
        }}
        employeeName={state.username}
      />
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
  addButtonContainer: {
    display: 'flex',
    alignItems: 'center'
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