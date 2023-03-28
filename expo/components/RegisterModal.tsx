import React, { useState } from 'react';
import { Modal, Button, TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface RegisterModalProps {
  show: boolean;
  onCreateEmployee: (name: string) => void;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, onCreateEmployee, onClose }) => {
  const [name, setName] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleCreateEmployee = () => {
    onCreateEmployee(name);
    setName('');
    onClose();
  };

  return (
    <Modal visible={show} animationType="slide" collapsable>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Employee Name:</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={handleNameChange} />
        <TouchableOpacity style={styles.button} onPress={handleCreateEmployee}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 32
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: '#0080ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterModal;
