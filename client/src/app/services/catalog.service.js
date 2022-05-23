import httpService from './http.service';

const catalogEndpoint = 'catalog/';

const catalogService = {
  get: async () => {
    const { data } = await httpService.get(catalogEndpoint);
    return data;
  },
  getProductById: async (productId) => {
    const { data } = await httpService.get(catalogEndpoint + productId);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(catalogEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.put(catalogEndpoint + payload._id, payload);
    return data;
  },
  remove: async (payload) => {
    const { data } = await httpService.delete(catalogEndpoint + payload._id);
    return data;
  }
};

export default catalogService;
