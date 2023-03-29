// ParcelLists
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Employee } from '../state/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDeleteParcelList } from '../hooks/useDeleteParcelList';


const ParcelLists: React.FC<{
  employee: Employee | undefined;
  onDeleteList: () => void;
}> = ({ employee, onDeleteList }) => {
  const navigation = useNavigation();

  const handlePressList = (username: string, listId?: string) => {
    navigation.navigate('ParcelList', { listId, username });
  };
  const [deleteParcelList] = useDeleteParcelList();

  const handleDeleteParcel = (listId?: string) => {
    if (!employee || !listId) {
      return
    }
    deleteParcelList({ employeeName: employee.name, listId })
      .then(() => onDeleteList());

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parcel Lists</Text>
      <View style={styles.listContainer}>
        {employee && employee.lists && employee.lists.length > 0 ?
          <FlatList
            data={employee.lists}
            keyExtractor={(list) => list.name}
            renderItem={({ item }) => (
              <View style={styles.listItem} >
                <TouchableOpacity onPress={() => handlePressList(employee.name, item._id)}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemInfo}>{`items: ${item.parcels.length}`}</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteParcel(item._id)}>
                  <Icon name='trash-o' color="#DF0000" size={24} />
                </TouchableOpacity>
              </View>
            )}
          /> :
          <Text style={styles.message}>No parcel lists found. Please add one.</Text>
        }
      </View>
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
    paddingHorizontal: 8
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

  },
});

export default ParcelLists;
