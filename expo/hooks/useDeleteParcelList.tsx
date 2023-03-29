import { useMutation, MutationFunction, UseMutationResult } from 'react-query';
import apiConfig from '../state/config';


interface DeleteParcelListParams {
  employeeName: string;
  listId: string;
}

async function deleteParcelList({ employeeName, listId }: DeleteParcelListParams): Promise<void> {
  const response = await fetch(`${apiConfig.API_URL}/employees/${employeeName}/lists/${listId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete parcel list');
  }
}
export function useDeleteParcelList(): [MutationFunction<void, DeleteParcelListParams>, UseMutationResult<void, Error, DeleteParcelListParams>] {
  const mutationResult = useMutation<void, Error, DeleteParcelListParams>(deleteParcelList);

  const deleteParcelListFromList: MutationFunction<void, DeleteParcelListParams> = mutationResult.mutateAsync;

  return [deleteParcelListFromList, mutationResult];
}
