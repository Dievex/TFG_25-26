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

export const exportarCSV = async (filters) => {
  const params = new URLSearchParams();
  if (filters.estado) params.append('estado', filters.estado);
  if (filters.puesto) params.append('puesto', filters.puesto);
  if (filters.orden) params.append('orden', filters.orden);
  if (filters.referencia) params.append('referencia', filters.referencia);

  const response = await api.get(`/log/exportar?${params.toString()}`, {
    responseType: 'blob',
  });
  return response.data;
};
