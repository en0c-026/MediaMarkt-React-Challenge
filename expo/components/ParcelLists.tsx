// ParcelLists
import React, { useContext, useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Employee } from '../state/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useDeleteParcelList } from '../hooks/useDeleteParcelList';
import { useEmployeeByName } from '../hooks/useGetEmployeeByName';
import { StateContext } from '../state/context';
import AddParcelListModal from './AddParcelListModal';


const ParcelLists = () => {
  const navigation = useNavigation();
  const { state } = useContext(StateContext)
  const { data: employee, refetch } = useEmployeeByName(state.username, false);
  const [addParcelListModalVisible, setAddParcelListModalVisible] = useState(false);

  const handlePressList = (listId?: string) => {
    navigation.navigate('ParcelList', { listId });
  };
  const [deleteParcelList] = useDeleteParcelList();

  const handleDeleteParcel = (listId?: string) => {
    if (!employee || !listId) {
      return
    }
    deleteParcelList({ employeeName: employee.name, listId })
      .then(() => refetch());

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcel Lists</Text>
      <View style={styles.listContainer}>
        {employee && employee.lists && employee.lists.length > 0 ?
          <FlatList
            data={employee.lists}
            keyExtractor={(list) => list.name}
            renderItem={({ item }) => {
              const parcelLength = item.parcels.length
              const deliveredLength = item.parcels.filter((parcel) => parcel.delivered).length
              return (
                <View style={styles.listItem} >
                  <TouchableOpacity style={styles.itemInfo} onPress={() => handlePressList(item._id)}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text>
                      {deliveredLength > 0 ? 
                      `${parcelLength} parcel on the list, ${deliveredLength} were delivered` : 
                      `${parcelLength} parcel on the list`}
                    </Text>
                  </TouchableOpacity>
                  {deliveredLength === 0 && (
                    <TouchableOpacity style={styles.itemDelete} onPress={() => handleDeleteParcel(item._id)}>
                      <FontAwesome name='trash-o' color="#DF0000" size={24} />
                    </TouchableOpacity>
                  )}
                </View>
              )
            }}
          /> :
          <Text style={styles.message}>No parcel lists found. Please add one.</Text>
        }
      </View>
      <TouchableOpacity style={styles.addButtonContainer} onPress={() => setAddParcelListModalVisible(true)}>
        <AntDesign name='pluscircle' color='#DF0000' size={48} />
      </TouchableOpacity>
      <AddParcelListModal
        show={addParcelListModalVisible}
        onClose={() => {
          setAddParcelListModalVisible(false)
          refetch()
        }}
        employeeName={state.username}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  listItem: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listName: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  listNameText: {
    fontSize: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 16,
    position: 'relative',
    width: '100%',
  },
  message: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 8,
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },
  itemDelete: {
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },
  addButtonContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

export default ParcelLists;
