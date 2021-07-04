import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";

function Header() {
  const { resetSelections } = useGlobalContext();
  return (
    <Wrapper>
      <div className="title">Finding Falcone</div>
      <div className="reset" onClick={resetSelections}>
        Reset
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
  border-bottom: 1px solid white;
  .title,
  .reset {
    font-family: "Press Start 2P";
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
  }

  .title {
    font-size: 1rem;
    padding: 1rem;
  }

  .reset {
    color: #fff;
    font-size: 0.75rem;
  }

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    .title {
      font-size: 2rem;
    }
    .reset {
      font-size: 1rem;
    }
  }
`;

export default Header;
