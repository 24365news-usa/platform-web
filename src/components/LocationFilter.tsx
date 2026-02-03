"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MapPin, X } from "lucide-react";
import { US_STATES_AND_TERRITORIES } from "@/lib/locations";

interface LocationFilterProps {
  availableLocations: {
    state: string;
    cities: string[];
  }[];
}

export default function LocationFilter({ availableLocations }: LocationFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedState, setExpandedState] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentState = searchParams.get("state");
  const currentCity = searchParams.get("city");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStateClick = (state: string) => {
    if (expandedState === state) {
      // Select state (all cities)
      const params = new URLSearchParams(searchParams);
      params.set("category", "local");
      params.set("state", state);
      params.delete("city");
      router.push(`/watch?${params.toString()}`);
      setIsOpen(false);
    } else {
      setExpandedState(state);
    }
  };

  const handleCityClick = (state: string, city: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", "local");
    params.set("state", state);
    params.set("city", city);
    router.push(`/watch?${params.toString()}`);
    setIsOpen(false);
  };

  const clearLocation = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("state");
    params.delete("city");
    router.push(`/watch?${params.toString()}`);
  };

  // Combine available locations with full list, showing available first
  const availableStateNames = new Set(availableLocations.map((l) => l.state));
  const sortedStates = [
    ...US_STATES_AND_TERRITORIES.filter((s) => availableStateNames.has(s.name)),
    ...US_STATES_AND_TERRITORIES.filter((s) => !availableStateNames.has(s.name)),
  ];

  const getLocationLabel = () => {
    if (currentCity && currentState) {
      return `${currentCity}, ${currentState}`;
    }
    if (currentState) {
      return currentState;
    }
    return "Local";
  };

  const hasActiveFilter = currentState || currentCity;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
          searchParams.get("category") === "local"
            ? "bg-red-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        <MapPin className="w-4 h-4" />
        {getLocationLabel()}
        <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
        {hasActiveFilter && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              clearLocation();
            }}
            className="ml-1 hover:bg-red-700 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-2">
            <div className="text-xs text-slate-500 uppercase px-3 py-2">States & Territories</div>
            {sortedStates.map((state) => {
              const locationData = availableLocations.find((l) => l.state === state.name);
              const hasVideos = !!locationData;
              const cities = locationData?.cities || [];
              const isExpanded = expandedState === state.name;

              return (
                <div key={state.code}>
                  <button
                    onClick={() => handleStateClick(state.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition ${
                      hasVideos
                        ? "text-white hover:bg-slate-700"
                        : "text-slate-500 cursor-default"
                    } ${currentState === state.name ? "bg-slate-700" : ""}`}
                    disabled={!hasVideos}
                  >
                    <span className="flex items-center gap-2">
                      <span>{state.name}</span>
                      {hasVideos && (
                        <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">
                          {cities.length > 0 ? `${cities.length} cities` : "videos"}
                        </span>
                      )}
                    </span>
                    {hasVideos && cities.length > 0 && (
                      <ChevronDown
                        className={`w-4 h-4 transition ${isExpanded ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {isExpanded && cities.length > 0 && (
                    <div className="ml-4 border-l border-slate-700 pl-2 mb-2">
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("category", "local");
                          params.set("state", state.name);
                          params.delete("city");
                          router.push(`/watch?${params.toString()}`);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 rounded"
                      >
                        All {state.name}
                      </button>
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCityClick(state.name, city)}
                          className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-700 rounded ${
                            currentCity === city ? "text-red-400" : "text-slate-300"
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
