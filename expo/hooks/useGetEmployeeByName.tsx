import { useQuery, QueryKey, useQueryClient } from 'react-query';
import apiConfig from '../state/config';
import { Employee, List } from '../state/types';


async function fetchEmployeeByName(name: string): Promise<Employee> {
  const response = await fetch(`${apiConfig.API_URL}/employees/${name}`);
  if (!response.ok) {
    throw new Error('Employee not found or does not exist');
  }
  const employee = await response.json();


  return employee;
}

export function useEmployeeByName(name: string, enabled: boolean) {
  const queryKey: QueryKey = ['employeeByName', name];
  return useQuery<Employee, Error>(queryKey, () => fetchEmployeeByName(name), { enabled });
}
