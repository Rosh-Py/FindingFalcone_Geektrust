import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";

function TimeTaken() {
  const { totalTimeTaken } = useGlobalContext();

  return (
    <Wrapper>
      <p>Time Taken: {totalTimeTaken}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  color: #fff;
  min-width: 15rem;
  max-width: 25rem;
  text-align: center;
  border: 1px solid white;
  p {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 768px) {
    p {
      font-size: 1.25rem;
    }
  }
`;

export default TimeTaken;
