import httpService from './http.service';

const catalogEndpoint = 'catalog/';

const catalogService = {
  get: async () => {
    const { data } = await httpService.get(catalogEndpoint);
    console.log('data in get catalog', data);
    return data;
  },
  getProductById: async (productId) => {
    const { data } = await httpService.get(catalogEndpoint + productId);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(catalogEndpoint, payload);
    console.log('catalog create data', data);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.put(catalogEndpoint + payload._id, payload);
    console.log('catalog edit element', data);
    return data;
  },
  remove: async (payload) => {
    const { data } = await httpService.delete(catalogEndpoint + payload._id);
    console.log('catalog remove element', data);
    return data;
  }
};

export default catalogService;
