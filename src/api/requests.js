import axios from "axios";

export const agregarUsuario = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/add",
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error al postear usuario", error);
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/list");
    const usersList = response.data;
    console.log(usersList);
    return usersList;
  } catch (error) {
    console.log("error al obtener los usuarios", error);
  }
};

export const eliminarUsuario = (id) => {
  console.log(id);
  try {
    const response = axios.delete(
      `http://localhost:8080/api/user/delete/${id}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("error al eliminar usuario", error);
  }
};

export const actualizarUsuario = (name, id, email) => {
  const requestBody = {
    name: name,
    id: id,
    email: email,
    create_date: "",
  };
  try {
    const response = axios.put(
      `http://localhost:8080/api/user/update`,
      requestBody
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("error al actualizar usuario", error);
  }
};
