// ParcelLists
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  lists: any;
}> = ({ lists }) => {
  const navigation = useNavigation();

  const handlePressList = (listName: string) => {
    navigation.navigate('ParcelList', { listName });
  };

  return (
    <>
      <Text style={styles.title}>Parcel Lists</Text>
      {lists && lists.length > 0 ? (
        <FlatList
          data={lists}
          keyExtractor={(list) => list._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handlePressList(item.name)}>
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
