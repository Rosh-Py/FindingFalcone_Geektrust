import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../config";

function FindButton() {
  const {
    totalSelectionOptions,
    selectedSpaceCrafts,
    selectedDestinations,
    setResults,
  } = useGlobalContext();
  const history = useHistory();

  const fetchToken = async (url) => {
    let token = await axios({
      method: "POST",
      url,
      headers: { accept: "application/json" },
    });
    token = token.data.token;
    localStorage.setItem("token", token);
    return token;
  };

  const fetchResults = async (url) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        token = await fetchToken(`${apiEndpoint}/token`);
      }

      const data = {
        token,
        planet_names: selectedDestinations,
        vehicle_names: selectedSpaceCrafts.map((a) => a.name),
      };

      let results = await axios({
        method: "POST",
        url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data,
      });

      //If token is expired
      if (results.error) {
        token = await fetchToken(`${apiEndpoint}/token`);
        results = await axios({
          method: "POST",
          url,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data,
        });
      }
      results = results.data;

      // set results
      setResults(
        results.status === "success" ? true : false,
        results.planet_name
      );
    } catch (error) {
      console.log(error);
    }
  };

  const disabled =
    selectedSpaceCrafts.length === totalSelectionOptions ? false : true;
  return (
    <Wrapper
      disabled={disabled}
      onClick={() => {
        fetchResults(`${apiEndpoint}/find`);
        history.push("/results");
      }}
    >
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
  box-shadow: var(--light-shadow);
  :active {
    transform: translate(5px, 5px);
  }
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
