const globalReducer = (state, action) => {
  if (action.type === "SET_ALL_DESTINATIONS") {
    return {
      ...state,
      allDestinations: action.payload,
    };
  }
  if (action.type === "SET_ALL_SPACECRAFTS") {
    return {
      ...state,
      availableSpaceCrafts: action.payload,
      allSpaceCrafts: action.payload,
    };
  }
  if (action.type === "UPDATE_SELECTED_DESTINATIONS") {
    return {
      ...state,
      selectedDestinations: action.payload,
    };
  }
  if (action.type === "UPDATE_SELECTED_SPACECRAFTS") {
    const selectedSpaceCrafts = action.payload;
    return {
      ...state,
      selectedSpaceCrafts,
    };
  }
  if (action.type === "UPDATE_AVAILABLE_SPACECRAFTS") {
    let availableSpaceCrafts = state.allSpaceCrafts.map((s) => ({ ...s }));
    const selectedSpaceCrafts = state.selectedSpaceCrafts;
    // console.log("selectedSpaceCrafts", selectedSpaceCrafts);

    selectedSpaceCrafts.forEach((sc) => {
      // console.log("sc", sc);
      // console.log("availableSpaceCrafts", availableSpaceCrafts);
      if (sc) {
        const vehicle = availableSpaceCrafts.find((v) => v.name === sc.name);
        // console.log("vehicle", vehicle);
        vehicle.total_no -= 1;
      }
    });
    // console.log(
    //   "UPDATE_AVAILABLE_SPACECRAFTS",
    //   selectedSpaceCrafts,
    //   availableSpaceCrafts
    // );
    return {
      ...state,
      availableSpaceCrafts,
    };
  }
  if (action.type === "RESET_SELECTIONS") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return {
      ...state,
      selectedSpaceCrafts: [],
      selectedDestinations: [],
      availableSpaceCrafts: [...state.allSpaceCrafts],
      totalTimeTaken: 0,
      falconeFound: false,
      planetFound: "",
    };
  }
  if (action.type === "CALCULATE_TIME") {
    // const destinations = state.allDestinations.filter((d) =>
    //   state.selectedDestinations.includes(d.name)
    // );
    const destinations = state.selectedDestinations.map((d) =>
      state.allDestinations.find((a) => a.name === d)
    );

    // console.log("CALCULATE_TIME sd", state.selectedDestinations);
    // console.log("CALCULATE_TIME d", destinations);
    const vehicles = state.selectedSpaceCrafts;
    let totalTimeTaken = 0;
    // console.log("CALCULATE_TIME v", vehicles);

    vehicles.forEach((v, index) => {
      if (v) {
        totalTimeTaken += destinations[index].distance / v.speed;
      }
    });
    // console.log(totalTimeTaken);
    return { ...state, totalTimeTaken };
  }

  if (action.type === "SET_RESULTS") {
    console.log("payload", action.payload);
    return { ...state, ...action.payload };
  }
  throw new Error("Action type not found.");
};

export default globalReducer;
