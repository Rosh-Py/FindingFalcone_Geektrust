import React, { useEffect } from "react";
import styled from "styled-components";
import {
  SingleSelection,
  TimeTaken,
  FindButton,
  Loading,
  Help,
} from "../components";
import axios from "axios";
import { apiEndpoint } from "../config";
import { useGlobalContext } from "../globalContext";

function HomePage() {
  const {
    setAllSpaceCrafts,
    setAllDestinations,
    totalSelectionOptions,
    totalSearchTime,
    resetSelections,
    isLoading,
    setIsLoading,
    isHelpModalOpen,
    setIsHelpModalOpen,
  } = useGlobalContext();

  useEffect(resetSelections, []);

  const fetchDetails = async (endpoint) => {
    try {
      // fetch vehicles
      setIsLoading(true);
      let vehicles = await axios({ url: `${endpoint}/vehicles` });
      setAllSpaceCrafts(vehicles.data);
      // fetch planets
      let planets = await axios({ url: `${endpoint}/planets` });
      setAllDestinations(planets.data);
      setIsLoading(false);
    } catch (err) {
      console.log(
        `%cSome problem occured while fetching the details...${err}`,
        "color:red; font-size: 1rem"
      );
    }
  };

  const options = new Array(totalSelectionOptions).fill(undefined);
  useEffect(() => fetchDetails(apiEndpoint), []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="selection-container">
        {options.map((element, index) => {
          return <SingleSelection key={index} number={index} />;
        })}
      </div>
      <div className="bottom-container">
        <TimeTaken totalTimeTaken={totalSearchTime} />
        <FindButton />
      </div>
      <div
        className="help-btn"
        onClick={() => setIsHelpModalOpen(!isHelpModalOpen)}
      >
        Help
      </div>
      {isHelpModalOpen && <Help />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: auto;

  .selection-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .bottom-container {
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    place-items: center;
  }
  .help-btn {
    position: fixed;
    bottom: 86vh;
    border: 1px solid white;
    right: 3vw;
    font-size: 0.6rem;
    box-shadow: var(--light-shadow);
    color: #fff;
    padding: 0.5rem;
    cursor: pointer;
  }

  .help-btn:active {
    transform: translate(2px, 2px);
  }

  @media screen and (min-width: 768px) {
    .bottom-container {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      place-items: center;
      margin: 2rem 0;
    }
    .help-btn {
      bottom: 15vh;
      font-size: 0.85rem;
      padding: 0.75rem;
    }
  }
`;

export default HomePage;
