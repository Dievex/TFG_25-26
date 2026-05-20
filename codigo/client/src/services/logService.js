import api from './api';

export const getLogs = async () => {
  const response = await api.get('/log');
  return response.data;
};

export const updateLog = async (data) => {
  const response = await api.put('/log', data);
  return response.data;
};

export const deleteLog = async (data) => {
  const response = await api.delete('/log', { data });
  return response.data;
};
