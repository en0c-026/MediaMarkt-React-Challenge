import React, { useState } from 'react';
import { TouchableOpacity, Text, Modal, Button, TextInput, View, StyleSheet } from 'react-native';
import { Parcel } from '../state/types';
import { useUpdateParcel } from '../hooks/useUpdateParcel';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDeleteParcel } from '../hooks/useDeleteParcel';

interface Props {
  parcel: Parcel;
  listId: string;
  showModal: (parcel: Parcel) => void;
  onDelete: (params?: any) => any;
}

const ParcelItem: React.FC<Props> = ({ listId, parcel, showModal, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivered, setDelivered] = useState(parcel.delivered);
  const [carrier, setCarrier] = useState(parcel.carrier);
  const [deleteParcel, { isLoading: isDeletingParcel }] = useDeleteParcel();

  async function handleDeleteParcel(parcelId: string, employeeName: string) {
    await deleteParcel({ employeeName, listId, parcelId });
    onDelete()
  }

  const [updateParcel, { isLoading: isUpdatingParcel }] = useUpdateParcel();

  const handleUpdateParcel = async () => {
    await updateParcel({
      employeeName: parcel.employeeName,
      listId, parcelId: parcel.parcelId,
      parcel: {
        parcelId: parcel.parcelId,
        delivered,
        carrier,
        employeeName: parcel.employeeName
      }
    });
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.parcel} >
        <Text style={styles.parcelRowId}>{parcel.parcelId}</Text>
        <Text style={styles.parcelRow}>{parcel.delivered ? 'Yes' : 'No'}</Text>
        <TouchableOpacity style={styles.parcelRow} onPress={() => showModal(parcel)}>
          <MaterialCommunityIcon name="truck-delivery" size={24} style={{ marginLeft: 8}} color="#006dd6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.parcelRow} onPress={() => handleDeleteParcel(parcel.parcelId, parcel.employeeName)} disabled={isDeletingParcel}>
          <FontAwesome name="trash-o" size={24} color="#DF0000" style={{ marginLeft: 8}} />
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible}>
        <Text>Parcel ID: {parcel.parcelId}</Text>
        <Text>Delivered:</Text>
        <TextInput value={delivered.toString()} onChangeText={(val) => setDelivered(val === 'true')} />
        <Button title="Update" onPress={handleUpdateParcel} disabled={isUpdatingParcel} />
        <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  parcel: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1f1f1',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  parcelRow: {
    width: '20%',
    marginLeft: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  parcelRowId: {
    width: '40%',
    paddingLeft: 24
  }
})
export default ParcelItem;
