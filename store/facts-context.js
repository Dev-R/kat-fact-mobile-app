import { createContext, useReducer } from "react";

export const FactsContext = createContext({
  facts: [],
  addFact: ({ fact }) => {},
  setFacts: (fact) => {},
  deleteFact: (id) => {},
  updateFact: (id, { fact }) => {},
});

function factsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableFactIndex = state.findIndex(
        (fact) => fact.id === action.payload.id
      );
      const updatableFact = state[updatableFactIndex];
      const updatedItem = { ...updatableFact, ...action.payload.data };
      const updatedfacts = [...state];
      updatedfacts[updatableFactIndex] = updatedItem;
      return updatedfacts;
    case "DELETE":
      return state.filter((fact) => fact.id !== action.payload);
    default:
      return state;
  }
}

function FactsContextProvider({ children }) {
  const [factsState, dispatch] = useReducer(factsReducer, []);

  function addFact(factsData) {
    dispatch({ type: "ADD", payload: factsData });
  }

  function setFacts(facts) {
    dispatch({ type: "SET", payload: facts });
  }

  function deleteFact(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateFact(id, factsData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: factsData } });
  }

  const value = {
    facts: factsState,
    setFacts: setFacts,
    addFact: addFact,
    deleteFact: deleteFact,
    updateFact: updateFact,
  };

  return (
    <FactsContext.Provider value={value}>{children}</FactsContext.Provider>
  );
}

export default FactsContextProvider;
