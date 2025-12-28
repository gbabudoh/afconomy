"use client";

import { useState } from "react";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar 
        selectedCountries={selectedCountries}
        onCountriesChange={setSelectedCountries}
      />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
