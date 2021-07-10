import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../globalContext";
import { v4 as uuidv4 } from "uuid";

function SingleSelection({ number }) {
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
  const [distance, setDistance] = useState(0);
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
      setSpaceCraft("");
      setDistance(0);
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
  useEffect(() => {
    const newVehicleArr = availableSpaceCrafts.map((a) => ({ ...a }));
    setLocalAvailableSpaceCrafts(newVehicleArr);
  }, [availableSpaceCrafts]);

  /*
  Update selected destinations so far
  */
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    // find distance
    const distance = allDestinations.find(
      (d) => d.name === e.target.value
    ).distance;
    setDistance(distance);

    // Updating selected destinations
    const newDestArr = [...selectedDestinations];
    newDestArr[number] = e.target.value;
    updateSelectedDestinations(newDestArr);
    setIsDestinationSelected(true);

    // Checking if previous selected vehicle should be enabled or disabled
    if (spaceCraft) {
      let selectedVehicleMaxDistance;
      selectedVehicleMaxDistance = availableSpaceCrafts.find(
        (sc) => sc.name === spaceCraft
      ).max_distance;

      if (distance > selectedVehicleMaxDistance) {
        handleVehicleChange("");
      }
    }
  };

  /*
  Update selected vehicles and calculate time so far
  */
  const handleVehicleChange = (value) => {
    setSpaceCraft(value);
    const newVehicleArr = [...selectedSpaceCrafts];
    if (value) {
      const speed = allSpaceCrafts.find((sc) => sc.name === value).speed;
      newVehicleArr[number] = { name: value, speed };
    } else {
      newVehicleArr[number] = undefined;
    }
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
        <div
          className="radio-input"
          onChange={(e) => handleVehicleChange(e.target.value)}
        >
          {localAvailableSpaceCrafts.map(({ name, total_no, max_distance }) => {
            const id = uuidv4();
            // Disabled condition for options
            const disabled =
              (total_no === 0 && name !== spaceCraft) ||
              distance > max_distance;
            return (
              <label
                htmlFor={id}
                key={uuidv4()}
                className={`${disabled ? "disabled" : ""} ${
                  name === spaceCraft ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`vehicle${number}`}
                  value={name}
                  disabled={disabled ? true : false}
                  id={id}
                  // checked={name === spaceCraft ? true : false}
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
    cursor: pointer;
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
  .disabled {
    opacity: 0.6;
  }
  .selected {
    color: #eeef20;
  }
`;
export default SingleSelection;
