import { useMutation, MutationFunction, UseMutationResult } from 'react-query';
import { Parcel } from '../state/types';
import { API_URL } from './useCreateEmployee';

interface AddParcelParams {
  employeeName: string;
  listId: string;
  parcel: Parcel;
}

async function addParcel({ employeeName, listId, parcel }: AddParcelParams): Promise<Parcel> {
  const response = await fetch(`${API_URL}/employees/${employeeName}/lists/${listId}/parcels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parcel),
  });

  if (!response.ok) {
    throw new Error('Failed to add parcel');
  }

  const newParcel = await response.json();

  return newParcel;
}

export function useAddParcel(): [MutationFunction<Parcel, AddParcelParams>, UseMutationResult<Parcel, Error, AddParcelParams>] {
  const mutationResult = useMutation<Parcel, Error, AddParcelParams>(addParcel);

  const addParcelToEmployeeList: MutationFunction<Parcel, AddParcelParams> = mutationResult.mutateAsync;

  return [addParcelToEmployeeList, mutationResult];
}
