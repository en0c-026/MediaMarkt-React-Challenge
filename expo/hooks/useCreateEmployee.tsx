import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Employee } from '../state/types';

export const API_URL = "http://192.168.43.191:3000"


interface CreateEmployeeParams {
  employeeName: string;
}

const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const createEmployee = async (params: CreateEmployeeParams): Promise<Employee> => {
    const { data } = await axios.post<Employee>(`${API_URL}/employees`, params);
    return data;
  };

  const mutation = useMutation<Employee, Error, CreateEmployeeParams>(createEmployee, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('employees');
    },
  });

  return mutation;
};

export default useCreateEmployee;
