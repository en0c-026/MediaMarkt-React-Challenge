import { useMutation, MutationFunction, UseMutationResult } from 'react-query';
import { Parcel } from '../state/types';
import { API_URL } from './useCreateEmployee';

interface UpdateParcelParams {
  employeeName: string;
  listId: string;
  parcelId: string;
  parcel: Parcel;
}

async function updateParcel({ employeeName, listId, parcelId, parcel }: UpdateParcelParams): Promise<Parcel> {
  const response = await fetch(`${API_URL}/employees/${employeeName}/lists/${listId}/parcels/${parcelId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parcel),
  });

  if (!response.ok) {
    throw new Error('Failed to update parcel');
  }

  const updatedParcel = await response.json();

  return updatedParcel;
}

export function useUpdateParcel(): [MutationFunction<Parcel, UpdateParcelParams>, UseMutationResult<Parcel, Error, UpdateParcelParams>] {
  const mutationResult = useMutation<Parcel, Error, UpdateParcelParams>(updateParcel);

  const updateParcelInEmployeeList: MutationFunction<Parcel, UpdateParcelParams> = mutationResult.mutateAsync;

  return [updateParcelInEmployeeList, mutationResult];
}
