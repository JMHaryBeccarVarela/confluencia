import { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  agregarUsuario,
  eliminarUsuario,
  actualizarUsuario,
} from "../api/requests";
import UsersList from "./UsersList";

const HomePage = () => {
  const [userToChange, setUserToChange] = useState(null);
  console.log(userToChange);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleCreateButton = async () => {
    event.preventDefault();
    if (userToChange) {
      const response = await actualizarUsuario(
        userToChange.name,
        userToChange.id,
        userToChange.email
      );
      console.log(response);
      setModal(false);
      setUserToChange(null);
      await actualizarUsers();
      return;
    } else {
      const response = await agregarUsuario(formData);
      console.log(response);
      console.log("usuario añadido con exito");
      setModal(false);
      setFormData({
        name: "",
        email: "",
      });
    }
    await actualizarUsers();
  };

  const handleInputsChange = (event) => {
    if (userToChange) {
      setUserToChange({
        ...userToChange,
        [event.target.name]: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleDelete = async (id) => {
    const response = await eliminarUsuario(id);
    console.log(response);
    await actualizarUsers();
  };

  const handleUpdate = async (id) => {
    const response = await actualizarUsuario(id, formData);
    console.log(response);
    await actualizarUsers();
  };

  const actualizarUsers = async () => {
    const usersList = await obtenerUsuarios();
    setUsers(usersList);
  };

  useEffect(() => {
    actualizarUsers();
  }, []);

  console.log(users);

  return (
    <div>
      <div className="w-screen flex justify-center h-32 border-b-2 border-black">
        <img className="p-4 mx-auto" src="\logo-confluencia.png" alt="" />
      </div>
      <div className="w-screen flex justify-center">
        <button
          onClick={() => setModal(!modal)}
          className="my-2 p-4 border rounded-xl border-blue-600 bg-blue-400 font-bold"
        >
          Agregar Usuario
        </button>
      </div>
      {users && users.length === 0 && (
        <div className="w-screen flex justify-center my-7">
          <p>No hay usuarios existentes</p>
        </div>
      )}

      <div className="w-screen flex justify-center my-4">
        <UsersList
          usersList={users}
          actualizarUsers={actualizarUsers}
          setUserToChange={setUserToChange}
          handleInputsChange={handleInputsChange}
          setModal={setModal}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[550px] mx-auto my-8 p-6 bg-white shadow-md rounded-md border-2 border-blue-400">
            <h2 className="text-2xl font-semibold mb-6">Create User</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  onChange={handleInputsChange}
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={
                    userToChange ? userToChange.name : formData.name
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  onChange={handleInputsChange}
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={
                    userToChange ? userToChange.email : formData.email
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleCreateButton()}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setModal(!modal),
                      setFormData({
                        name: "",
                        email: "",
                      });
                  }}
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
