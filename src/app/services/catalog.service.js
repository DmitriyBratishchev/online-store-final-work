import httpService from './http.service';

const catalogEndpoint = 'catalog/';

const catalogService = {
  get: async () => {
    const { data } = await httpService.get(catalogEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(catalogEndpoint, payload);
    console.log('catalog create data', data);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.put(catalogEndpoint + payload.id, payload);
    console.log('catalog edit element', data);
    return data;
  },
  remove: async (payload) => {
    const { data } = await httpService.delete(catalogEndpoint + payload.id);
    console.log('catalog remove element', data);
    return data;
  }
};

export default catalogService;
