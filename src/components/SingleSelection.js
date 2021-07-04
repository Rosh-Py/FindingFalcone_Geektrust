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
    availableSpaceCrafts,
    updateAvailableSpaceCrafts,
    calculateTime,
  } = useGlobalContext();

  const copyDestinations = allDestinations
    .filter((d) => !selectedDestinations.includes(d.name))
    .map(({ name }) => name);

  const copySpaceCrafts = availableSpaceCrafts.map((a) => ({ ...a }));

  const [destination, setDestination] = useState("Select");
  const [isDestinationSelected, setIsDestinationSelected] = useState(false);
  const [spaceCraft, setSpaceCraft] = useState("");
  const [availableDestinations, setAvailableDestinations] =
    useState(copyDestinations);
  const [localAvailableSpaceCrafts, setLocalAvailableSpaceCrafts] =
    useState(copySpaceCrafts);

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
  Update Local Available vehicles
  */
  //  useEffect(,[availableSpaceCrafts])

  /*
  Update selected destinations so far
  */
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    const newDestArr = [...selectedDestinations];
    newDestArr[number] = e.target.value;
    updateSelectedDestinations(newDestArr);
    setIsDestinationSelected(true);
  };

  const handleVehicleChange = (e) => {
    setSpaceCraft(e.target.value);
    const newVehicleArr = [...selectedSpaceCrafts];
    const speed = allSpaceCrafts.find((sc) => sc.name === e.target.value).speed;
    newVehicleArr[number] = { name: e.target.value, speed };
    updateSelectedSpaceCrafts(newVehicleArr);
    calculateTime();
    updateAvailableSpaceCrafts();
  };
  return (
    <Wrapper>
      <div className="destinations">
        <h5>Destination {number + 1}</h5>
        <select
          value={destination}
          onChange={(e) => handleDestinationChange(e)}
        >
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
        <div className="radio-input" onChange={(e) => handleVehicleChange(e)}>
          {availableSpaceCrafts.map(({ name, total_no }) => {
            const id = uuidv4();
            return (
              <label htmlFor={id}>
                <input
                  type="radio"
                  name={`vehicle${number}`}
                  value={name}
                  // disabled={total_no === 0 ? true : false}
                  id={id}
                />
                {`${name} (${total_no})`}
              </label>
            );
          })}
        </div>
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
    display: grid;
  }
  .radio-input label {
    padding: 0.3rem;
    cursor: pointer;
  }
`;
export default SingleSelection;
