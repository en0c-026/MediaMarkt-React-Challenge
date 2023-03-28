import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PackageScreenRouteProp = RouteProp<RootStackParamList,'Package'>;
type PackageScreenNavigationProp = StackNavigationProp<RootStackParamList,'Package'>;

type Props = {
  route?: PackageScreenRouteProp;
  navigation?: PackageScreenNavigationProp;
};
const Package = ({ route, navigation }: Props) => {
  if (!route?.params.packageId) {
    return <Text>No package found.</Text>;
  }
  return (
    <>
      <Text>Package Detail</Text>
      <Text>Package ID: {route?.params.packageId}</Text>
    </>
  );
};

export default Package;