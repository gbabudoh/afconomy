"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { africanCountries, regions, getCountriesByRegion } from "@/lib/countries";

interface CountryFilterProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
}

export default function CountryFilter({ selectedCountries, onCountriesChange }: CountryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = getCountriesByRegion(selectedRegion).filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCountry = (countryCode: string) => {
    if (selectedCountries.includes(countryCode)) {
      onCountriesChange(selectedCountries.filter((c) => c !== countryCode));
    } else {
      onCountriesChange([...selectedCountries, countryCode]);
    }
  };

  const clearAll = () => {
    onCountriesChange([]);
  };

  const selectAll = () => {
    onCountriesChange(africanCountries.map((c) => c.code));
  };

  const getSelectedCountryNames = () => {
    if (selectedCountries.length === 0) return "All African Countries";
    if (selectedCountries.length === africanCountries.length) return "All African Countries";
    if (selectedCountries.length === 1) {
      const country = africanCountries.find((c) => c.code === selectedCountries[0]);
      return country ? `${country.flag} ${country.name}` : "1 country";
    }
    return `${selectedCountries.length} countries selected`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary bg-card border border-secondary/20 rounded-lg hover:bg-secondary/5 hover:border-secondary/30 transition-all"
      >
        <span className="hidden sm:inline">{getSelectedCountryNames()}</span>
        <span className="sm:hidden">Countries</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-[380px] bg-card border border-secondary/20 rounded-xl shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-secondary/10 bg-secondary/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Select Countries</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-secondary/10 rounded-md transition-colors"
                >
                  <X className="h-4 w-4 text-secondary" />
                </button>
              </div>
              
              {/* Search */}
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-secondary/50"
              />
            </div>

            {/* Region Filter */}
            <div className="p-3 border-b border-secondary/10 bg-background">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      selectedRegion === region
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-3 border-b border-secondary/10 bg-secondary/5">
              <span className="text-xs text-secondary">
                {selectedCountries.length} of {africanCountries.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-secondary hover:text-foreground"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-[320px] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="p-8 text-center text-sm text-secondary">
                  No countries found
                </div>
              ) : (
                <div className="p-2">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => toggleCountry(country.code)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors border border-transparent ${
                        selectedCountries.includes(country.code) ? "bg-primary/5 border-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8 text-2xl">
                        {country.flag}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-foreground">{country.name}</p>
                        <p className="text-xs text-secondary">{country.capital}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedCountries.includes(country.code)
                            ? "bg-primary border-primary"
                            : "border-secondary/30"
                        }`}
                      >
                        {selectedCountries.includes(country.code) && (
                          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
