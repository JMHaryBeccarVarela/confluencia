// User.js
import { eliminarUsuario, actualizarUsuario } from "../api/requests";

const User = ({ user, actualizarUsers, setModal, setUserToChange }) => {
  const handleDelete = async (id) => {
    const response = await eliminarUsuario(id);
    console.log(response);
    await actualizarUsers();
  };

  const handleChangeButton = (id, name, email) => {
    setUserToChange({ id: id, name: name, email: email });
    setModal(true);
  };

  return (
    <div className="flex min-w-[900px] border-b border-blue-400 items-center p-4 ">
      <div className="flex-grow max-w-32 ml-4 ">
        <h1>{user.id}</h1>
      </div>
      <div className="ml-auto mr-10">
        <p>{user.name}</p>
      </div>
      <div className="ml-auto mr-10">
        <p>{user.email}</p>
      </div>
      <div className="ml-auto mr-10">
        <p>{user.create_date}</p>
      </div>
      <div className="ml-auto mx-6 ">
        <button
          onClick={() => handleDelete(user.id)}
          className="border rounded border-red-600 bg-red-400 text-white font-bold"
        >
          <p className="p-1">DELETE</p>
        </button>
      </div>
      <div className="ml-auto mx-6">
        <button
          onClick={() => {
            handleChangeButton(user.id, user.name, user.email);
          }}
          className="border rounded border-yellow-600 bg-yellow-400 text-white font-bold"
        >
          <p className="p-1">CHANGE</p>
        </button>
      </div>
    </div>
  );
};

export default User;
