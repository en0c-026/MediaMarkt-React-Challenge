import React, { useState } from 'react';
import { Text, Button, Modal, TextInput, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from 'react-query';
import AddParcelModal from '../components/AddParcelModal';
import ParcelItem from '../components/ParcelItem';
import { useAddParcel } from '../hooks/useAddParcel';
import { useUpdateParcel } from '../hooks/useUpdateParcel';
import { Employee, Parcel } from '../state/types';

const ParcelListPage: React.FC<{
  route: any;
}> = ({ route }) => {
  const { listId, username } = route.params;

  const { data: employee, isLoading, refetch } = useQuery<Employee>(['employeeByName', username]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newParcelId, setNewParcelId] = useState('');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [updatedParcelId, setUpdatedParcelId] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [addParcel, { isLoading: isAddingParcel }] = useAddParcel();
  const [updateParcel, { isLoading: isUpdatingParcel }] = useUpdateParcel();

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

  const handleParcelClick = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setUpdatedParcelId(parcel.parcelId);
    setIsEditModalVisible(true);
  };

  const handleUpdateParcel = () => {
    if (!selectedParcel || !employee) {
      return;
    }

    const updatedParcel: Parcel = {
      ...selectedParcel,
      parcelId: updatedParcelId,
    };

    updateParcel({
      employeeName: employee.name,
      listId,
      parcelId: selectedParcel.parcelId,
      parcel: updatedParcel
    }).then(() => {
      setSelectedParcel(null);
      setIsEditModalVisible(false);
      refetch();
    })
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const list = employee?.lists.find((l) => l._id?.toString() === listId);

  if (!list) {
    return <Text>List not found.</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.name}</Text>
      <View style={styles.listContainer}>
        <View style={styles.headerParcelList}>
          <Text style={styles.headerRowId}>Id</Text>
          <Text style={styles.headerRow}>Delivered</Text>
          <Text style={styles.headerRow}>Deliver</Text>
          <Text style={styles.headerRow}>Delete</Text>
        </View>
        {list.parcels.length > 0 ?
          <FlatList
            data={list.parcels}
            keyExtractor={(list) => list.parcelId}
            renderItem={({ item }) =>
              <ParcelItem
                listId={list._id as string}
                parcel={item}
                showModal={() => handleParcelClick(item)}
                onDelete={refetch}
              />}
          />
          : <Text style={styles.message}>No parcels found.</Text>
        }
      </View>
      <TouchableOpacity style={styles.addButtonContainer} onPress={() => setIsModalVisible(true)}>
        <Icon name='pluscircle' color='#DF0000' size={48} />
      </TouchableOpacity>
      <AddParcelModal
        show={isModalVisible}
        onClose={() => {
          setIsModalVisible(false)
          refetch()
        }}
        newParcelId={newParcelId}
        setNewParcelId={setNewParcelId}
        employeeName={employee?.name}
        listId={list?._id}
      />
      {selectedParcel && (
        <Modal visible={isEditModalVisible}>
          <Text style={styles.modalTitle}>Edit Parcel</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Parcel ID"
            value={selectedParcel.parcelId}
            onChangeText={(text) => setSelectedParcel({ ...selectedParcel, parcelId: text })}
          />
          <Button
            title="Update"
            onPress={handleUpdateParcel}
            disabled={isUpdatingParcel}
          />
          <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerParcelList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
  listContainer: {
    flex: 1,
    display: 'flex',
  },
  addButtonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  message: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  headerRow: {
    width: '20%',
    textAlign: 'center',
    marginLeft: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1f1f1',
    paddingVertical: 16,

  },
  headerRowId: {
    width: '40%',
    paddingLeft: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1f1f1',
    paddingVertical: 16,

  }
});

export default ParcelListPage;
