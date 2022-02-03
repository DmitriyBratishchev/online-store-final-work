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
  }
};

export default catalogService;
