import React, { useState } from 'react';
import { TouchableOpacity, Text, Modal, Button, TextInput, View, StyleSheet } from 'react-native';
import { Parcel } from '../state/types';
import { useUpdateParcel } from '../hooks/useUpdateParcel';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDeleteParcel } from '../hooks/useDeleteParcel';
import DeliveryModal from './DeliveryModal';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';

interface Props {
  parcel: Parcel;
  listId: string;
}

const ParcelItem: React.FC<Props> = ({ listId, parcel }) => {
  const { refetch } = useEmployeeByName(parcel.employeeName, false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteParcel, { isLoading: isDeletingParcel }] = useDeleteParcel();

  async function handleDeleteParcel(parcelId: string, employeeName: string) {
    await deleteParcel({ employeeName, listId, parcelId });
    refetch()
  }

  return (
    <View style={styles.container}>
      <View style={styles.parcel} >
        <Text style={styles.parcelRowId}>{parcel.parcelId}</Text>
        <Text style={styles.parcelRow}>{parcel.delivered ? 'Yes' : 'No'}</Text>
        <TouchableOpacity
          style={styles.parcelRow}
          onPress={() => setIsModalVisible(true)}
          disabled={parcel.delivered}
        >
          <MaterialCommunityIcon 
          name="truck-delivery" 
          size={24} 
          style={{ marginLeft: 8 }} 
            color={parcel.delivered ? '#BFBFBF' : '#006dd6'} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.parcelRow}
          onPress={() => handleDeleteParcel(parcel.parcelId, parcel.employeeName)} 
          disabled={isDeletingParcel || parcel.delivered}
        >
          <FontAwesome 
          name="trash-o" size={24} 
            color={parcel.delivered ? '#BFBFBF' : '#DF0000'} 
          style={{ marginLeft: 8 }} 
          />
        </TouchableOpacity>
      </View>
      <DeliveryModal
        show={isModalVisible}
        parcelId={parcel.parcelId}
        listId={listId}
        employeeName={parcel.employeeName}
        onClose={() => {
          setIsModalVisible(false)
          refetch()
        }}
      />
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
