import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  let count = 0;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .catch((err) => {
        console.log(err);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const newUser = {
      name: "Ivan",
      email: "ivan@test.com",
      phone: "1-2355-34343-33",
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data }) => setUsers([...users, data]))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
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
                  className="btn btn-danger"
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="btn btn-primary"
          style={{ marginLeft: "25px" }}
          onClick={() => addUser()}
        >
          Add user
        </button>
      </div>
    </>
  );
}

export default App;
