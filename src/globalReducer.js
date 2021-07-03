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
    return { ...state, selectedSpaceCrafts: action.payload };
  }

  throw new Error("Action type not found.");
};

export default globalReducer;
