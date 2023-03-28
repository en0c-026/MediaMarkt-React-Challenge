import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useAddParcelList } from '../hooks/useAddParcelList';

type CreateListModalProps = {
  show: boolean;
  onClose: () => void;
  employeeName: string;
};

const CreateListModal: React.FC<CreateListModalProps> = ({ show, onClose, employeeName }) => {
  const [listName, setListName] = useState('');
  const [addParcelList, {isLoading, isError}] = useAddParcelList(employeeName);

  const handleCreateList = () => {
    addParcelList({ employeeName, listName });
    setListName('');
    onClose();
  };

  return (
    <Modal visible={show} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Create a new Parcel List</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter list name"
          value={listName}
          onChangeText={setListName}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateList} disabled={isLoading}>
          {isLoading ?
            <Text style={styles.buttonText}>Creating...</Text> :
            <Text style={styles.buttonText}>Create</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 20,
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

export default CreateListModal;
