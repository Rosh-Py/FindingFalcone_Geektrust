import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <p>Coding Problem by GeekTrust</p>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  margin-top: 1rem;
  width: 100%;
  font-size: 0.75rem;
  padding: 1rem;
  color: #fff;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  text-align: center;
`;
export default Footer;
