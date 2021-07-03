import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";
import { v4 as uuidv4 } from "uuid";

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
  const [isDestinationSelected, setIsDestinationSelected] = useState(false);
  const [spaceCraft, setSpaceCraft] = useState("");
  const [availableDestinations, setAvailableDestinations] = useState(copy);

  /*
  Updating the dropdown option dynamically
  */
  useEffect(() => {
    const newArr = allDestinations
      .filter((d) => !selectedDestinations.includes(d.name))
      .map(({ name }) => name);

    // Reset case starts
    if (destination !== "Select" && selectedDestinations.length === 0) {
      setDestination("Select");
      setIsDestinationSelected(false);
    }
    // Reset case ends

    if (!selectedDestinations[number]) {
      setAvailableDestinations(newArr);
    } else {
      setAvailableDestinations([destination, ...newArr]);
    }
  }, [selectedDestinations, allDestinations, number]);

  /*
  Update selected destinations so far
  */
  const handleChange = (e, number) => {
    setDestination(e.target.value);
    const newDestArr = [...selectedDestinations];
    newDestArr[number] = e.target.value;
    updateSelectedDestinations(newDestArr);
    setIsDestinationSelected(true);
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
      <div className={`vehicles ${!isDestinationSelected ? "hide" : ""}`}>
        {allSpaceCrafts.map(({ name, total_no }) => {
          const id = uuidv4();
          return (
            <div
              className="radio-input"
              onChange={(e) => setSpaceCraft(e.target.value)}
            >
              <input type="radio" name="vehicle" value={name} id={id} />
              <label htmlFor={id}>{`${name} (${total_no})`}</label>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  padding: 1rem;
  display: grid;
  justify-content: center;
  align-content: flex-start;
  position: relative;
  .destinations {
    display: grid;
    place-items: center;
    color: #fff;
  }
  select {
    height: 2rem;
    width: 10rem;
    background: transparent;
    color: #fff;
    font-size: 1rem;
  }
  option {
    color: #fff;
    background: rgba(0, 0, 0, 0.9);
  }

  .hide {
    display: none;
  }

  .vehicles {
    color: #fff;
    font-size: 0.7rem;
    padding: 1rem;
  }
  .radio-input {
    padding: 0.3rem;
  }
`;
export default SingleSelection;
