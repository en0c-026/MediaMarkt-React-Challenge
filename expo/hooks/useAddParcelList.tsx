import { useMutation, MutationFunction, UseMutationResult } from 'react-query';
import apiConfig from '../state/config';
import { Employee } from '../state/types';

import { useEmployeeByName } from './useGetEmployeeByName';

interface AddParcelListParams {
  employeeName: string;
  listName: string;
}

interface AddParcelListResponse {
  data: Employee;
}

async function addParcelList({ employeeName, listName }: AddParcelListParams): Promise<AddParcelListResponse> {

  const newList = {
    packages: [],
    name: listName,
  };

  const updatedEmployeeQuery = await fetch(`${apiConfig.API_URL}/employees/${employeeName}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });

  if (!updatedEmployeeQuery.ok) {
    throw new Error('Failed to add parcel list');
  }

  const updatedEmployee = await updatedEmployeeQuery.json();

  return { data: updatedEmployee };
}

export function useAddParcelList(name: string): [MutationFunction<AddParcelListResponse, AddParcelListParams>, UseMutationResult<AddParcelListResponse, Error, AddParcelListParams>] {
  const employeeQuery = useEmployeeByName(name, false);
  const mutationResult = useMutation<AddParcelListResponse, Error, AddParcelListParams>(addParcelList, {
    onSuccess: () => {
      employeeQuery.refetch();
    },
  });

  const addParcelListToEmployee: MutationFunction<AddParcelListResponse, AddParcelListParams> = mutationResult.mutateAsync;

  return [addParcelListToEmployee, mutationResult];
}
