import { useMutation, MutationFunction, UseMutationResult } from 'react-query';
import { API_URL } from './useCreateEmployee';

interface DeleteParcelParams {
  employeeName: string;
  listId: string;
  parcelId: string;
}

async function deleteParcel({ employeeName, listId, parcelId }: DeleteParcelParams): Promise<void> {
  const response = await fetch(`${API_URL}/employees/${employeeName}/lists/${listId}/parcels/${parcelId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete parcel');
  }
}
export function useDeleteParcel(): [MutationFunction<void, DeleteParcelParams>, UseMutationResult<void, Error, DeleteParcelParams>] {
  const mutationResult = useMutation<void, Error, DeleteParcelParams>(deleteParcel);

  const deleteParcelFromList: MutationFunction<void, DeleteParcelParams> = mutationResult.mutateAsync;

  return [deleteParcelFromList, mutationResult];
}
