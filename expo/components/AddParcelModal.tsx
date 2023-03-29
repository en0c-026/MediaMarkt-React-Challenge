import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAddParcel } from '../hooks/useAddParcel';
import { Parcel } from '../state/types';

type AddParcelModalProps = {
  show: boolean;
  onClose: () => void;
  newParcelId: string;
  setNewParcelId: (v: string) => void;
  employeeName?: string;
  listId?: string;
};

const AddParcelModal: React.FC<AddParcelModalProps> = ({
  show,
  onClose,
  employeeName,
  listId,
  newParcelId,
  setNewParcelId
}) => {
  const [addParcel, { isLoading: isAddingParcel }] = useAddParcel();

  const handleAddParcel = async () => {
    if (!employeeName || !listId) {
      return;
    }
    const parcel: Parcel = {
      parcelId: newParcelId,
      employeeName,
      delivered: false,
    };

    await addParcel({ employeeName, listId, parcel });
    setNewParcelId('');
    onClose();
  };

  return (
    <Modal visible={show} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => onClose()}>
            <Icon name='close' size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>New Parcel</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Parcel ID"
            value={newParcelId}
            onChangeText={setNewParcelId}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={isAddingParcel || newParcelId === '' ? styles.disabledButton : styles.addButton}
              onPress={handleAddParcel}
              disabled={isAddingParcel || newParcelId === ''}
            >
              <Icon name='camera' size={24} color={isAddingParcel || newParcelId === '' ? '#DEDEDE' : '#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={isAddingParcel || newParcelId === '' ? styles.disabledButton : styles.addButton}
              onPress={handleAddParcel}
              disabled={isAddingParcel || newParcelId === ''}
            >
              <Text style={isAddingParcel || newParcelId === '' ? styles.disabledButtonText : styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
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
  addButton: {
    backgroundColor: '#DF0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center'
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
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  disabledButtonText: {
    color: '#DEDEDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddParcelModal;