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
    setIsLoading,
  } = useGlobalContext();

  const history = useHistory();

  // Fetching token for getting results
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

  //Finding falcone by making post request
  const findFalcone = async (url) => {
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
    results = results.data;
    setResults(
      results.status === "success" ? true : false,
      results.planet_name
    );
  };

  // Fetching final result whether falcone found or not
  const fetchResults = async () => {
    try {
      await findFalcone(`${apiEndpoint}/find`);
    } catch (error) {
      try {
        // If error response found, fetch token again and fetch results
        if (error.response.data.error) {
          localStorage.clear("token");
          await findFalcone(`${apiEndpoint}/find`);
        }
      } catch (error) {
        console.log("Some Error occured: ", error.response);
      }
    }
  };

  // Find Falcone button disabled condition
  const disabled =
    selectedSpaceCrafts.filter((sc) => sc).length === totalSelectionOptions
      ? false
      : true;

  return (
    <Wrapper
      disabled={disabled}
      onClick={async () => {
        if (disabled) {
          return;
        }
        history.push("/results");
        setIsLoading(true);
        await fetchResults();
        setIsLoading(false);
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
