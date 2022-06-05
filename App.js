import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import FactsContextProvider from "./store/facts-context";

export default function App() {
  return (
    <FactsContextProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </FactsContextProvider>
  );
}
