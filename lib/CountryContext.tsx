"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CountryContextType {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  return (
    <CountryContext.Provider value={{ selectedCountries, setSelectedCountries }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
