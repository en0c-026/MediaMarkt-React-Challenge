import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUpdateParcel } from '../hooks/useUpdateParcel';
import { Parcel } from '../state/types';

type AddParcelModalProps = {
  show: boolean;
  onClose: () => void;
  parcelId: string;
  employeeName?: string;
  listId?: string;
};

const DeliveryModal: React.FC<AddParcelModalProps> = ({
  show,
  onClose,
  employeeName,
  listId,
  parcelId
}) => {
  const [carrierId, setCarrierId] = useState('')
  const [updateParcel, { isLoading: isUpdatingParcel }] = useUpdateParcel();

  const handleUpdateParcel = () => {
    if (!employeeName || !listId || !carrierId) {
      return;
    }
    const parcel: Parcel = {
      parcelId,
      employeeName,
      delivered: true,
      carrierId
    };

    updateParcel({
      employeeName,
      listId,
      parcelId,
      parcel,
     }).then(() => {
       setCarrierId('')
        onClose()
     });
    onClose();
  };

  return (
    <Modal visible={show} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => onClose()}>
            <Icon name='close' size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Deliver Parcel</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Carrier ID"
            value={carrierId}
            onChangeText={setCarrierId}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={isUpdatingParcel || carrierId === '' ? styles.disabledButton : styles.addButton}
              onPress={handleUpdateParcel}
              disabled={isUpdatingParcel || carrierId === ''}
            >
              <Icon name='camera' size={24} color={isUpdatingParcel || carrierId === '' ? '#DEDEDE' : '#FFFFFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={isUpdatingParcel || carrierId === '' ? styles.disabledButton : styles.addButton}
              onPress={handleUpdateParcel}
              disabled={isUpdatingParcel || carrierId === ''}
            >
              <Text style={isUpdatingParcel || carrierId === '' ? styles.disabledButtonText : styles.buttonText}>Confirm</Text>
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

export default DeliveryModal;