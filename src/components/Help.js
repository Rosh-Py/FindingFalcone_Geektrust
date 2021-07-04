import React from "react";
import styled from "styled-components";
import HelpImg from "../images/Help.png";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../globalContext";

function Help() {
  const { isHelpModalOpen, setIsHelpModalOpen } = useGlobalContext();
  return (
    <Wrapper onClick={() => setIsHelpModalOpen(!isHelpModalOpen)}>
      <FaTimes
        className="close-icon"
        onClick={() => setIsHelpModalOpen(!isHelpModalOpen)}
      />
      <div className="help-img">
        <img src={HelpImg} alt="Help" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 100;
  .help-img {
    border: 1px solid white;
    overflow: auto;
    height: 70%;
    width: 80%;
    box-shadow: var(--dark-shadow);
  }
  .help-img img {
    width: auto;
  }
  .close-icon {
    position: fixed;
    top: 5vh;
    right: 5vw;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    transition: var(--transition);
  }
  .close-icon:hover {
    color: rgba(255, 0, 0, 0.8);
  }
  @media screen and (min-width: 768px) {
    .help-img img {
      width: 100%;
    }
  }
`;
export default Help;
