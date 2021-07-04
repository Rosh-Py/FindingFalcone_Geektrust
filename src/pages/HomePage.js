import React, { useEffect } from "react";
import styled from "styled-components";
import { SingleSelection, TimeTaken, FindButton } from "../components";
import axios from "axios";
import { apiEndpoint } from "../config";
import { useGlobalContext } from "../globalContext";

function HomePage() {
  const {
    setAllSpaceCrafts,
    setAllDestinations,
    totalSelectionOptions,
    allDestinations,
    allSpaceCrafts,
    totalSearchTime,
  } = useGlobalContext();

  const fetchDetails = async (endpoint) => {
    try {
      // fetch vehicles
      let vehicles = await axios({ url: `${endpoint}/vehicles` });
      setAllSpaceCrafts(vehicles.data);
      console.table(vehicles.data);
      // fetch planets
      let planets = await axios({ url: `${endpoint}/planets` });
      setAllDestinations(planets.data);
      console.table(planets.data);
    } catch (err) {
      console.log(
        `%cSome problem occured while fetching the details...${err}`,
        "color:red; font-size: 1rem"
      );
    }
  };

  const options = new Array(totalSelectionOptions).fill(undefined);
  useEffect(() => fetchDetails(apiEndpoint), []);
  return (
    <Wrapper>
      <div className="bg-img"></div>
      <div className="selection-container">
        {options.map((element, index) => {
          return <SingleSelection key={index} number={index} />;
        })}
      </div>
      <div className="bottom-container">
        <TimeTaken totalTimeTaken={totalSearchTime} />
        <FindButton />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: auto;
  .bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      center/ cover no-repeat
        url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")
        fixed;
  }

  .selection-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .bottom-container {
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    place-items: center;
  }
  @media screen and (min-width: 768px) {
    .bottom-container {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      place-items: center;
      margin: 2rem 0;
    }
  }
`;

export default HomePage;
