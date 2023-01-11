import styled from "styled-components";

export const Container = styled.div`
  background: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  @media screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  background: white;
  width: 400px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px;

  p {
    height: 10px;
  }
`;

export const DivLogo = styled.img`
  width: 70px;
  height: 70px;
  padding-top: 20px;
`;

export const Input = styled.input`
  width: 90%;
  font-size: 15px;
  padding: 12px 0 5px 10px;
  border-radius: 5px;
  border-width: 1px;
`;

export const InputDog = styled.input`
  font-size: 15px;
  padding: 12px 0 5px 10px;
  border-radius: 5px;
  border-width: 1px;
`;

export const DefaultButton = styled.button`
  background: #0070ba;
  width: 30%;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;

  :hover {
    cursor: pointer;
    background: #008de5;
  }
`;

export const ButtonSignUp = styled.button`
  background: #0070ba;
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
    background: #008de5;
  }
`;

export const DivButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonLeft = styled.button`
  background: #0070ba;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  color: white;

  :hover {
    cursor: pointer;
    background: #008de5;
  }
`;

export const Li = styled.li`
  width: 100%;
  margin-right: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  list-style: none;

  img {
    border-radius: 20%;
    height: 100px;
  }
`;

export const Ul = styled.ul`
  width: 100%;
  padding: 0;
`;
