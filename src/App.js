import "./App.css";
import { useState, useEffect } from "react";
import axiosConfig from "./services/axiosConfig";
import userService from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  let count = 0;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    userService
      .getAllUsers()
      .then(({ data }) => setUsers(data))
      .catch((err) => setError(err));
  };

  const deleteUser = (id) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    userService.deleteUser(id).catch((err) => {
      setError(err);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser = {
      name: "Ivan",
      email: "ivan@test.com",
      phone: "1-2355-34343-33",
    };

    axiosConfig.post("/users/", newUser);

    userService
      .addUser(newUser)
      .then(({ data: user }) => setUsers([...users, user]))
      .catch((err) => setError(err));
  };

  const updateUser = (id) => {
    const user = users.find((x) => x.id === id);
    const modifiedUser = {
      ...user,
      name: "Pakistan",
      email: "pakistan@abv.bg",
    };

    setUsers(users.map((user) => (user.id === id ? modifiedUser : user)));

    userService.updateUser(modifiedUser).catch((err) => setError(err));
  };

  return (
    <>
      {error && <p className="text-danger">{error.message}</p>}
      <div>
        <button
          className="btn btn-outline-primary"
          style={{ margin: "25px" }}
          onClick={addUser}
        >
          Add user
        </button>
      </div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <th scope="row">{(count += 1)}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-outline-danger"
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateUser(user.id)}
                  className="btn btn-outline-success"
                  style={{ cursor: "pointer" }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
