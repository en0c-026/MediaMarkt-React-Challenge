import React, { createContext, ReactNode, useReducer } from "react";
import { Action, State } from "./types";

const initialState: State = {
  username: "",
};
const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload
      };
    case "RESET_USERNAME":
      return {
        ...state,
        username: initialState.username
      };
    default:
      return state;
  }
};
const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};



export { StateProvider, StateContext }