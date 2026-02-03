"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MapPin, X } from "lucide-react";
import { US_STATES_AND_TERRITORIES } from "@/lib/locations";

interface CategoryFilterProps {
  category: {
    id: string;
    label: string;
  };
  availableLocations: {
    state: string;
    cities: string[];
  }[];
  isActive: boolean;
  showLocationFilter?: boolean;
}

export default function CategoryFilter({
  category,
  availableLocations,
  isActive,
  showLocationFilter = true,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedState, setExpandedState] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentState = searchParams.get("state");
  const currentCity = searchParams.get("city");
  const currentCategory = searchParams.get("category");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setExpandedState(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (e: React.MouseEvent) => {
    if (!showLocationFilter) {
      // No dropdown, just navigate
      return;
    }
    e.preventDefault();
    if (isActive && !isOpen) {
      // Already on this category, toggle dropdown
      setIsOpen(true);
    } else if (!isActive) {
      // Navigate to category first
      router.push(`/watch?category=${category.id}`);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleStateClick = (state: string) => {
    if (expandedState === state) {
      // Select state (all cities)
      router.push(`/watch?category=${category.id}&state=${encodeURIComponent(state)}`);
      setIsOpen(false);
      setExpandedState(null);
    } else {
      setExpandedState(state);
    }
  };

  const handleCityClick = (state: string, city: string) => {
    router.push(`/watch?category=${category.id}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
    setIsOpen(false);
    setExpandedState(null);
  };

  const clearLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/watch?category=${category.id}`);
  };

  // Filter locations that have videos in this category
  const locationsForCategory = availableLocations.filter((loc) => loc.state);

  // Sort: available states first, then alphabetically
  const availableStateNames = new Set(locationsForCategory.map((l) => l.state));
  const sortedStates = [
    ...US_STATES_AND_TERRITORIES.filter((s) => availableStateNames.has(s.name)),
    ...US_STATES_AND_TERRITORIES.filter((s) => !availableStateNames.has(s.name)),
  ];

  const hasLocationFilter = isActive && (currentState || currentCity);

  const getLabel = () => {
    if (hasLocationFilter) {
      if (currentCity) {
        return `${category.label}: ${currentCity}`;
      }
      return `${category.label}: ${currentState}`;
    }
    return category.label;
  };

  // For "All" category, no dropdown
  if (category.id === "all") {
    return (
      <Link
        href="/watch"
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          !currentCategory || currentCategory === "all"
            ? "bg-red-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        All
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleCategoryClick}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
          isActive
            ? "bg-red-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        {getLabel()}
        {showLocationFilter && (
          <ChevronDown className={`w-3.5 h-3.5 transition ${isOpen ? "rotate-180" : ""}`} />
        )}
        {hasLocationFilter && (
          <span
            onClick={clearLocation}
            className="ml-1 hover:bg-red-700 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {isOpen && showLocationFilter && (
        <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-2">
            {/* View all in category */}
            <button
              onClick={() => {
                router.push(`/watch?category=${category.id}`);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive && !currentState
                  ? "bg-red-600 text-white"
                  : "text-white hover:bg-slate-700"
              }`}
            >
              All {category.label}
            </button>

            <div className="border-t border-slate-700 my-2" />
            <div className="text-xs text-slate-500 uppercase px-3 py-1">Filter by Location</div>

            {sortedStates.map((state) => {
              const locationData = locationsForCategory.find((l) => l.state === state.name);
              const hasVideos = !!locationData;
              const cities = locationData?.cities || [];
              const isExpanded = expandedState === state.name;

              return (
                <div key={state.code}>
                  <button
                    onClick={() => hasVideos && handleStateClick(state.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition ${
                      hasVideos
                        ? "text-white hover:bg-slate-700"
                        : "text-slate-600 cursor-default"
                    } ${currentState === state.name ? "bg-slate-700" : ""}`}
                    disabled={!hasVideos}
                  >
                    <span className="flex items-center gap-2">
                      {state.name}
                      {hasVideos && (
                        <span className="text-xs bg-slate-600 px-1.5 py-0.5 rounded">
                          {cities.length || "•"}
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
                          router.push(`/watch?category=${category.id}&state=${encodeURIComponent(state.name)}`);
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
                            currentCity === city && currentState === state.name
                              ? "text-red-400"
                              : "text-slate-300"
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
