import React, { useState } from 'react';
import { Modal, Button, TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useCreateEmployee from '../hooks/useCreateEmployee';

interface RegisterModalProps {
  show: boolean;
  onClose: () => void;
}

const RegisterEmployeeModal: React.FC<RegisterModalProps> = ({ show, onClose }) => {
  const [employeeName, setEmployeeName] = useState('');
  const { mutateAsync: createEmployee, isLoading: isCreaingEmployee, isError: isErrorCreatingEmployee } = useCreateEmployee();

  const handleCreateEmployee = () => {
    createEmployee({ employeeName })
      .then(() => {
        setEmployeeName('');
        onClose();
      });
  };
  const handleNameChange = (text: string) => {
    setEmployeeName(text);
  };
  return (
    <Modal visible={show} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            setEmployeeName('');
            onClose();
          }}>
            <Icon name='close' color='#FFFFF' size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>New Employee</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Employee: eg. Carlos"
            value={employeeName}
            onChangeText={handleNameChange}
          />
          <TouchableOpacity
            style={isCreaingEmployee || employeeName === '' ? styles.disabledButton : styles.registerButton}
            onPress={handleCreateEmployee}
            disabled={isCreaingEmployee || employeeName === ''}
          >
            <Text style={isCreaingEmployee || employeeName === '' ? styles.disabledButtonText : styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#DF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#B70202',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    position: 'absolute',
    top: 16,
    right: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#DEDEDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterEmployeeModal;
