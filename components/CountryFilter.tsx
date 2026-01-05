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
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-secondary bg-card border border-secondary/20 rounded-lg hover:bg-secondary/5 hover:border-secondary/30 transition-all cursor-pointer"
      >
        <span className="hidden sm:inline truncate max-w-[120px] lg:max-w-none">{getSelectedCountryNames()}</span>
        <span className="sm:hidden">Countries</span>
        <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          {/* Mobile: Fixed centered, Desktop: Absolute right */}
          <div className="fixed sm:absolute left-1/2 sm:left-auto sm:right-0 top-1/2 sm:top-auto -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 sm:mt-2 w-[92vw] sm:w-[90vw] max-w-[380px] bg-card border border-secondary/20 rounded-xl shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-secondary/10 bg-secondary/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm sm:text-base text-foreground cursor-pointer">Select Countries</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-secondary/10 rounded-md transition-colors cursor-pointer"
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
                className="w-full px-3 py-2 text-sm bg-background border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-secondary/50 cursor-pointer"
              />
            </div>

            {/* Region Filter */}
            <div className="p-3 sm:p-4 border-b border-secondary/10 bg-background">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2 cursor-pointer">Filter by Region</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-2 sm:px-3 py-2 text-xs font-medium rounded-lg transition-all text-center cursor-pointer ${
                      selectedRegion === region
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary/5 text-secondary hover:bg-secondary/10 border border-secondary/15 hover:border-secondary/25"
                    }`}
                  >
                    {region === "All Regions" ? "🌍 All" : region.replace(" Africa", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-2 sm:p-3 border-b border-secondary/10 bg-secondary/5">
              <span className="text-xs text-secondary cursor-pointer">
                {selectedCountries.length} of {africanCountries.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-secondary hover:text-foreground cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-[50vh] sm:max-h-[320px] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="p-8 text-center text-sm text-secondary">
                  No countries found
                </div>
              ) : (
                <div className="p-1 sm:p-2">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => toggleCountry(country.code)}
                      className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-secondary/10 transition-colors border border-transparent cursor-pointer ${
                        selectedCountries.includes(country.code) ? "bg-primary/5 border-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-lg sm:text-2xl">
                        {country.flag}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">{country.name}</p>
                        <p className="text-xs text-secondary truncate">{country.capital}</p>
                      </div>
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedCountries.includes(country.code)
                            ? "bg-primary border-primary"
                            : "border-secondary/30"
                        }`}
                      >
                        {selectedCountries.includes(country.code) && (
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
