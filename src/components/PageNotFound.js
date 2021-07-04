import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function PageNotFound() {
  const history = useHistory();
  setTimeout(() => history.push("/"), 3000);
  return (
    <Wrapper>
      <p>Page Not Found! Please click on Home button!</p>
      <p>You will be redirected to Home page...</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 10rem;
  padding: 1rem;
  font-size: 0.65rem;
  color: #fff;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;
export default PageNotFound;
