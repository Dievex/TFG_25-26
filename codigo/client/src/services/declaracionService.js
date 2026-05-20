import api from './api';

export const getPuestos = async () => {
  const response = await api.get('/declaracion/puestos');
  return response.data;
};

export const getOrdenes = async (idPuesto) => {
  const response = await api.get(`/declaracion/ordenes/${idPuesto}`);
  return response.data;
};

export const getReferencias = async (idOrden) => {
  const response = await api.get(`/declaracion/referencias/${idOrden}`);
  return response.data;
};

export const getCantidadAnterior = async (idOrden) => {
  const response = await api.get(`/declaracion/cantidad/${idOrden}`);
  return response.data.total;
};

export const guardarDeclaracion = async (data) => {
  const response = await api.post('/declaracion/guardar', data);
  return response.data;
};

export const getHistorial = async () => {
  const response = await api.get('/declaracion/historial');
  return response.data;
};

export const enviarASap = async () => {
  const response = await api.post('/rpa/activar');
  return response.data;
};
