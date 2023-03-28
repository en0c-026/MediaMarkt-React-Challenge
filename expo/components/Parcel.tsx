import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ParcelScreenRouteProp = RouteProp<RootStackParamList,'Parcel'>;
type ParcelScreenNavigationProp = StackNavigationProp<RootStackParamList,'Parcel'>;

type Props = {
  route?: ParcelScreenRouteProp;
  navigation?: ParcelScreenNavigationProp;
};
const Parcel = ({ route, navigation }: Props) => {
  if (!route?.params.parcelId) {
    return <Text>No parcel found.</Text>;
  }
  return (
    <>
      <Text>Parcel Detail</Text>
      <Text>Parcel ID: {route?.params.parcelId}</Text>
    </>
  );
};

export default Parcel;