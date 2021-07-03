import React, { useState } from "react";
import styled from "styled-components";

function Selection({
  number /*Number */,
  availableDestinations /*Array */,
  availableSpaceCrafts /*Array of objects */,
}) {
  const [destination, setDestination] = useState("select");
  const [spaceCraft, setSpaceCraft] = useState("");

  return (
    <Wrapper>
      <div className="destinations">
        <h4>Destination {number + 1}</h4>
        <select
          value={destination}
          onChange={(e) => {
            console.log(e.target.value);
            setDestination(e.target.value);
          }}
        >
          <option defaultValue disabled>
            Select
          </option>
          {availableDestinations.map((destination, index) => (
            <option key={index} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  padding: 1rem;
  align-content: center;
  .destinations {
    display: grid;
    color: #000;
  }
`;
export default Selection;
