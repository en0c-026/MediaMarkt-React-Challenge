// ParcelList
import React from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';
import { List } from '../state/types';

const ParcelList: React.FC<{
  route: any;
}> = ({ route }) => {
  const { listName } = route.params;

  const { data } = useQuery<List>(['listByName', listName]);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Text>{data.name}</Text>
      {data.parcels.map((parcel) => (
        <Text key={parcel.parcelId}>{parcel.carrier}</Text>
      ))}
    </>
  );
};

export default ParcelList;
