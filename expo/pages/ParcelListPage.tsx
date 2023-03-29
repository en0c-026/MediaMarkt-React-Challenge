import React, { useContext, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AddParcelModal from '../components/AddParcelModal';
import ParcelItem from '../components/ParcelItem';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import { StateContext } from '../state/context';

const ParcelListPage: React.FC<{
  route: any;
}> = ({ route }) => {
  const { listId } = route.params;
  const { state } = useContext(StateContext)
  const { data: employee, isLoading, refetch } = useEmployeeByName(state.username, true)
  const [isAddParcelModalVisible, setIsAddParcelModalVisible] = useState(false);
  const [newParcelId, setNewParcelId] = useState('');

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
              />}
          />
          : <Text style={styles.message}>No parcels found.</Text>
        }
      </View>
      <TouchableOpacity style={styles.addButtonContainer} onPress={() => setIsAddParcelModalVisible(true)}>
        <Icon name='pluscircle' color='#DF0000' size={48} />
      </TouchableOpacity>
      <AddParcelModal
        show={isAddParcelModalVisible}
        onClose={() => {
          setIsAddParcelModalVisible(false)
          refetch()
        }}
        newParcelId={newParcelId}
        setNewParcelId={setNewParcelId}
        employeeName={employee?.name}
        listId={list?._id}
      />
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
