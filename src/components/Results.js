import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";
import { Link } from "react-router-dom";
import { Loading } from "./";

function Results() {
  const {
    falconeFound,
    planetFound,
    totalTimeTaken,
    resetSelections,
    isLoading,
  } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {falconeFound && (
        <div className="success">
          <p>
            Success! Congratulations on finding falcone. King Shan is mighty
            pleased.
          </p>
          <p>Time Taken: {totalTimeTaken}</p>
          <p>Found on planet: {planetFound}</p>
        </div>
      )}
      {!falconeFound && (
        <div className="failure">
          <p>Failure! Falcone not found.</p>
          <p>Time Taken: {totalTimeTaken}</p>
        </div>
      )}
      <Link to="/" onClick={resetSelections}>
        <div className="again">Start again</div>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #fff;
  font-size: 0.75rem;
  display: grid;
  place-items: center;
  a {
    color: #fff;
  }
  .success,
  .failure {
    display: grid;
    place-items: center;
    text-align: center;
    line-height: 1.5;
    margin: 2rem auto;
    padding: 1rem;
    border: 2px solid white;
    box-shadow: var(--dark-shadow);
    width: 80vw;
  }
  .again {
    padding: 0.75rem;
    border: 1px solid white;
    box-shadow: var(--light-shadow);
    max-width: 10rem;
    cursor: pointer;
  }
  .again:active {
    transform: translate(2px, 2px);
  }

  .success {
    color: #38b000;
  }
  .failure {
    color: #ff0000;
  }
  .success,
  .failure {
    transform: translateY(-1000%);
    animation: topDown 0.5s ease-out 1s forwards;
  }
`;
export default Results;
