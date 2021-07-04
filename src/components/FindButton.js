import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";
function FindButton() {
  const { totalSelectionOptions, selectedSpaceCrafts } = useGlobalContext();
  const disabled =
    selectedSpaceCrafts.length === totalSelectionOptions ? false : true;
  return (
    <Wrapper disabled={disabled}>
      <p>Find Falcone!</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #fff;
  padding: 1rem;
  max-width: 20rem;
  color: #fff;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background: rgba(0, 0, 0, 0.5);
  p {
    font-size: 0.8rem;
  }
  @media screen and (min-width: 768px) {
    p {
      font-size: 1.25rem;
    }
  }
`;

export default FindButton;
