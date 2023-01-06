import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { logout } from "../utils/useLogout";
import {
  Box,
  DefaultButton,
  Container,
  DivRow,
  DivButtons,
  Ul,
  Li,
  ButtonLeft,
  ButtonRight,
} from "./styles/styles";

export default function Transfer() {
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
            <p>
              Name: {user.name?.first} {user.name?.last}
            </p>
            <p>Email: {user.email}</p>
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
          <ButtonRight onClick={() => navigate("/StatusCodePage")}>
            Next Page
          </ButtonRight>
        </DivButtons>
      </Box>
    </Container>
  );
}
