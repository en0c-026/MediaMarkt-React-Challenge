import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAddParcelList } from '../hooks/useAddParcelList';

type AddParcelListModalProps = {
  show: boolean;
  onClose: () => void;
  employeeName: string;
};

const AddParcelListModal: React.FC<AddParcelListModalProps> = ({ show, onClose, employeeName }) => {
  const [listName, setListName] = useState('');
  const [addParcelList, { isLoading, isError }] = useAddParcelList(employeeName);

  const handleCreateList = () => {
    addParcelList({ employeeName, listName }).then(() => {
      setListName('');
      onClose();
    });
    
  };

  return (
    <Modal 
    visible={show} 
    animationType="slide"
    transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            setListName('');
            onClose();
          }}>
            <Icon name='close' color='#FFFFF' size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>New Parcel List</Text>
          <TextInput
            style={styles.textInput}
            placeholder="List name: eg. 26-03-2023"
            value={listName}
            onChangeText={setListName}
          />
          <TouchableOpacity
            style={isLoading || listName === '' ? styles.disabledButton : styles.addButton}
            onPress={handleCreateList}
            disabled={isLoading || listName === ''}
          >
            <Text style={isLoading || listName === '' ? styles.disabledButtonText : styles.buttonText}>Add</Text>
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
  addButton: {
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

export default AddParcelListModal;
