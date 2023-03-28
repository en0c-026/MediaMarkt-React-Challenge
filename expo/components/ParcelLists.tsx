// ParcelLists
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Employee } from '../state/types';

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listName: {
    fontSize: 18,
  },
  title: {}
});

const ParcelLists: React.FC<{
  employee: Employee | undefined;
}> = ({ employee }) => {
  const navigation = useNavigation();

  const handlePressList = (username: string, listId?: string) => {
    navigation.navigate('ParcelList', { listId, username });
  };

  return (
    <>
      <Text style={styles.title}>Parcel Lists</Text>
      {employee && employee.lists && employee.lists.length > 0 ? (
        <FlatList
          data={employee.lists}
          keyExtractor={(list) => list.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handlePressList(employee.name, item._id)}>
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No parcel lists found. Please add a new list.</Text>
      )}
    </>
  );
}

export default ParcelLists;
