import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { logout } from "../utils/useLogout";
import { useProtectPage } from "../utils/useValidate";
import {
  Box,
  DefaultButton,
  Container,
  DivButtons,
  Ul,
  Li,
  ButtonLeft,
} from "./styles/styles";

export default function Transfer() {
  useProtectPage();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const url = "https://randomuser.me/api/";

    httpClient
      .get(url)
      .then((res) => {
        const newUsers = [...users, ...res.data.results];
        setUsers(newUsers);
      })
      .catch((res) => {
        alert("Account error. Please log in again.");
        logout();
        navigate("/");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const usersList =
    users &&
    users.map((user) => {
      return (
        <Ul key={user.id?.value}>
          <Li>
            <div>
              <p>
                Name: {user.name?.first} {user.name?.last}
              </p>
              <p>Email: {user.email}</p>
              <p>Age: {user.dob.age}</p>
            </div>
            <div>
              <img src={user.picture.large} />
            </div>
          </Li>
        </Ul>
      );
    });

  const onClickLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container>
      <Box>
        {usersList}
        <DivButtons>
          <ButtonLeft onClick={onClickLogout}>Logout</ButtonLeft>
          <DefaultButton onClick={getUsers}>Generate user</DefaultButton>
        </DivButtons>
      </Box>
    </Container>
  );
}
