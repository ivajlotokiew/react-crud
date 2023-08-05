import axiosConfig from "./axiosConfig";

class UserService {
  getAllUsers() {
    return axiosConfig.get("users/");
  }

  addUser(newUser) {
    return axiosConfig.post("/users/", newUser);
  }

  deleteUser(id) {
    return axiosConfig.delete(`/users/${id}`);
  }

  updateUser(modifiedUser) {
    return axiosConfig.post("/users/", modifiedUser);
  }
}

export default new UserService();
