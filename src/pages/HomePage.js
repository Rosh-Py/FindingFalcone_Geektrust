import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components";
import axios from "axios";
import { apiEndpoint } from "../config";
import { useGlobalContext } from "../globalContext";

function HomePage() {
  const { setAllSpaceCrafts, setAllDestinations } = useGlobalContext();

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

  useEffect(() => fetchDetails(apiEndpoint), []);
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    center/ cover no-repeat
      url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
`;

export default HomePage;
