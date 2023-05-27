import React from "react";
import styled from "styled-components";
import { Send } from "@material-ui/icons";

const Container = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  @media only screen and (max-width: 1200px) {
    text-align: center;
  }
`;

const InputContainer = styled.div`
  width: 36%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 5px;
  @media only screen and (max-width: 1200px) {
    width: 80%;
  }
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: black;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>
        Subscribe to the Hollywood Records newsletter and find out about the
        limited-time discounts!
      </Desc>
      <InputContainer>
        <Input placeholder="Enter your email address" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
