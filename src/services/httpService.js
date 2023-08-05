import axiosConfig from "./axiosConfig";

class HttpService {
  endpoint;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosConfig.get(this.endpoint + "/");
  }

  create(entity) {
    return axiosConfig.post(this.endpoint, entity);
  }

  delete(id) {
    return axiosConfig.delete(this.endpoint + "/" + id);
  }

  update(entity) {
    return axiosConfig.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint) => new HttpService(endpoint);

export default create;
