import { useState, useEffect } from "react";
import User from "./User";

const UsersList = ({
  usersList,
  actualizarUsers,
  setUserToChange,
  setModal,
}) => {
  console.log(usersList);
  return (
    <div>
      {usersList &&
        usersList.map((user) => (
          <User
            user={user}
            key={user.id}
            actualizarUsers={actualizarUsers}
            setModal={setModal}
            setUserToChange={setUserToChange}
          />
        ))}
    </div>
  );
};

export default UsersList;
