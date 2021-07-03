import React, { useContext, useReducer } from "react";
import reducer from "./globalReducer";

const GlobalContext = React.createContext();
const initialState = {
  allDestinations: [], //all destinations
  allSpaceCrafts: [], // all space crafts
  totalSelectionOptions: 4,
  // Note: space crafts and destinations selected will be mapped based on index
  selectedDestinations: [], // selected destinations to search Al falcone
  selectedSpaceCrafts: [], // selected spacecrafts to search Al falcone
  totalSearchTime: 0, //Total time taken to find Al Falcone
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
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setAllDestinations,
        setAllSpaceCrafts,
        updateSelectedDestinations,
        updateSelectedSpaceCrafts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
