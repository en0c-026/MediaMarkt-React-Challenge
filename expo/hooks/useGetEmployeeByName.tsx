import { useQuery, QueryKey } from 'react-query';
import { Employee } from '../state/types';
import { API_URL } from './useCreateEmployee';

async function fetchEmployeeByName(name: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${name}`);
  if (!response.ok) {
    throw new Error('Employeed not found or not exists');
  }
  return response.json();
}

export function useEmployeeByName(name: string) {
  const queryKey: QueryKey = ['employeeByName', name];
  return useQuery<Employee, Error>(queryKey, () => fetchEmployeeByName(name), { enabled: false });
}
