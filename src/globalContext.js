import React, { useContext, useReducer } from "react";
import reducer from "./globalReducer";

const GlobalContext = React.createContext();
const initialState = {
  allDestinations: [], //all destinations
  allSpaceCrafts: [], // all space crafts
  totalSelectionOptions: 4, //Total options
  // Note: space crafts and destinations selected will be mapped based on index
  selectedDestinations: [], // selected destinations to search Al falcone
  selectedSpaceCrafts: [], // selected spacecrafts to search Al falcone
  availableSpaceCrafts: [], // Available spacecrafts to select
  totalTimeTaken: 0, //Total time taken to find Al Falcone
  falconeFound: false, //Falcone found or not
  planetFound: "", //Found on planet
  isLoading: false, //loading status
  isHelpModalOpen: false, //help modal
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAllDestinations = (destinations) => {
    dispatch({ type: "SET_ALL_DESTINATIONS", payload: destinations });
  };

  const setAllSpaceCrafts = (vehicles) => {
    dispatch({ type: "SET_ALL_SPACECRAFTS", payload: vehicles });
  };

  const updateSelectedDestinations = (newSelection) => {
    dispatch({ type: "UPDATE_SELECTED_DESTINATIONS", payload: newSelection });
  };
  const updateSelectedSpaceCrafts = (newSelection) => {
    dispatch({ type: "UPDATE_SELECTED_SPACECRAFTS", payload: newSelection });
  };

  const resetSelections = () => {
    dispatch({ type: "RESET_SELECTIONS" });
  };

  const updateAvailableSpaceCrafts = () => {
    dispatch({ type: "UPDATE_AVAILABLE_SPACECRAFTS" });
  };
  const calculateTime = () => {
    dispatch({ type: "CALCULATE_TIME" });
  };

  const setResults = (falconeFound, planetFound) => {
    dispatch({ type: "SET_RESULTS", payload: { falconeFound, planetFound } });
  };
  const setIsLoading = (status) => {
    dispatch({ type: "SET_IS_LOADING", payload: status });
  };
  const setIsHelpModalOpen = (status) => {
    dispatch({ type: "SET_IS_HELP_MODAL_OPEN", payload: status });
  };
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setAllDestinations,
        setAllSpaceCrafts,
        updateSelectedDestinations,
        updateSelectedSpaceCrafts,
        resetSelections,
        updateAvailableSpaceCrafts,
        calculateTime,
        setResults,
        setIsLoading,
        setIsHelpModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
