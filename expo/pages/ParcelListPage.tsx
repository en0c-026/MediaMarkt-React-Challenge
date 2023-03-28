import React, { useState } from 'react';
import { Text, Button, Modal, TextInput } from 'react-native';
import { useQuery } from 'react-query';
import { Employee, Parcel } from '../state/types';
import { useAddParcel } from '../hooks/useAddParcel';

const ParcelList: React.FC<{
  route: any;
}> = ({ route }) => {
  const { listId, username } = route.params;

  const { data: employee, isLoading, refetch } = useQuery<Employee>(['employeeByName', username]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newParcelId, setNewParcelId] = useState('');

  const [addParcel, { isLoading: isAddingParcel }] = useAddParcel();

  const handleAddParcel = async () => {
    if (!employee) {
      return;
    }
    const parcel: Parcel = {
      parcelId: newParcelId,
      employeeName: employee.name,
      delivered: false,
    };

    await addParcel({ employeeName: employee.name, listId, parcel });
    setNewParcelId('');
    setIsModalVisible(false);
    refetch();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const list = employee?.lists.find((l) => l._id?.toString() === listId);

  if (!list) {
    return <Text>List not found.</Text>;
  }

  return (
    <>
      <Text>{list.name}</Text>
      <Button title="Add Parcel" onPress={() => setIsModalVisible(true)} />
      {list.parcels.length > 0 ? (
        list.parcels.map((parcel) => <Text key={parcel.parcelId}>{parcel.parcelId}</Text>)
      ) : (
        <Text>No parcel found. Please add new parcel.</Text>
      )}
      <Modal visible={isModalVisible}>
        <TextInput placeholder="Parcel ID" value={newParcelId} onChangeText={setNewParcelId} />
        <Button title="Add" onPress={handleAddParcel} disabled={isAddingParcel} />
        <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};

export default ParcelList;
