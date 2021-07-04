import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Wrapper>
      <div className="loading"></div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  .loading {
    height: 5rem;
    width: 5rem;
    margin: 0 auto;
    margin-top: 10rem;
    border-radius: 50%;
    border: 4px solid grey;
    border-top-color: #fff;
    animation: loading 0.5s linear infinite;
  }
`;

export default Loading;
