import { useQuery, QueryKey, useQueryClient } from 'react-query';
import { Employee, List } from '../state/types';
import { API_URL } from './useCreateEmployee';

async function fetchEmployeeByName(name: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${name}`);
  if (!response.ok) {
    throw new Error('Employee not found or does not exist');
  }
  const employee = await response.json();


  return employee;
}

export function useEmployeeByName(name: string) {
  const queryKey: QueryKey = ['employeeByName', name];
  return useQuery<Employee, Error>(queryKey, () => fetchEmployeeByName(name), {
    enabled: false
  });
}
