import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";

function SingleSelection({ number /*Number */ }) {
  const {
    allDestinations,
    allSpaceCrafts,
    selectedDestinations,
    selectedSpaceCrafts,
    updateSelectedDestinations,
    updateSelectedSpaceCrafts,
  } = useGlobalContext();

  const copy = allDestinations
    .filter((d) => !selectedDestinations.includes(d.name))
    .map(({ name }) => name);

  const [destination, setDestination] = useState("Select");
  const [spaceCraft, setSpaceCraft] = useState("");
  const [availableDestinations, setAvailableDestinations] = useState(copy);

  // const handleClick = () => {
  //   const newArr = allDestinations
  //     .filter((d) => !selectedDestinations.includes(d.name))
  //     .map(({ name }) => name);
  //   setAvailableDestinations(newArr);
  //   console.log("newArr", newArr, availableDestinations);
  // };
  useEffect(() => {
    const newArr = allDestinations
      .filter((d) => !selectedDestinations.includes(d.name))
      .map(({ name }) => name);

    if (!selectedDestinations[number]) {
      setAvailableDestinations(newArr);
    } else {
      setAvailableDestinations([destination, ...newArr]);
    }
  }, [selectedDestinations, allDestinations, number]);

  const handleChange = (e, number) => {
    setDestination(e.target.value);
    // new selected destinations
    const newDestArr = [...selectedDestinations];
    newDestArr[number] = e.target.value;
    updateSelectedDestinations(newDestArr);
  };

  return (
    <Wrapper>
      <div className="destinations">
        <h5>Destination {number + 1}</h5>
        <select value={destination} onChange={(e) => handleChange(e, number)}>
          <option value="Select" default disabled hidden>
            Select
          </option>
          {availableDestinations &&
            availableDestinations.map((dest, index) => (
              <option key={index} value={dest}>
                {dest}
              </option>
            ))}
        </select>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;

  .destinations {
    display: grid;
    place-items: center;
    color: #fff;
  }
`;
export default SingleSelection;
