import httpService from './http.service';

const imageEndpoint = 'image/';

const imageService = {
  post: async (payload) => {
    console.log('image service', payload);
    const fileImages = new FormData();
    fileImages.append('image', payload);
    const { data } = await httpService.post(imageEndpoint, fileImages);
    return data;
  },
  remove: async (payload) => {
    const { data } = await httpService.delete(imageEndpoint + payload);
    return data;
  }
};

export default imageService;
