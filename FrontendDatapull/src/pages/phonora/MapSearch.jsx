import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Component,
} from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import Select from "../../components/form/Select";
import "leaflet/dist/leaflet.css";
import "./UserSearchApp.css";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";

// Add styles for tooltips
const tooltipStyles = `
  .leaflet-tooltip-custom {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #888;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    color: #222;
    padding: 5px 10px;
    font-weight: bold;
    pointer-events: none;
  }
  
  .custom-div-icon:hover {
    z-index: 1000 !important;
  }
`;

// Reused ProtectedData component
const ProtectedData = ({ dataId, type }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cacheKey = `${dataId}-${type}`;
  const dataCache = new Map();

  const handleToggleReveal = async () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }

    if (dataCache.has(cacheKey)) {
      setData(dataCache.get(cacheKey));
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 10000);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/users/protectedData/${dataId}?type=${type}`
      );
      const responseData = response.data.value;
      dataCache.set(cacheKey, responseData);
      setData(responseData);
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 10000);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "email":
        return "••••@••••.•••";
      case "phone":
        return "••• ••• ••••";
      case "relationship":
        return "••••••";
      default:
        return "•••••••";
    }
  };

  return (
    <span
      onClick={handleToggleReveal}
      className={`protected-data cursor-pointer transition-all duration-300 hover:bg-blue-gray-50 px-2 py-1 rounded ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {isRevealed && data ? data : getPlaceholder()}
    </span>
  );
};

// Create a custom marker icon factory function with tooltips
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
    tooltipAnchor: [0, -5], // Position for tooltips
  });
};

// Custom icons for city markers
const redIcon = createCustomIcon("#ff0000");
const blueIcon = createCustomIcon("#2196F3");

export function MapSearch() {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  // Add these functions with your other callback functions
  const downloadCurrentResults = () => {
    if (results.length === 0) {
      setError("No results to download.");
      return;
    }

    setIsDownloading(true);

    try {
      // Create CSV headers
      const headers = [
        "First Name",
        "Last Name",
        "Gender",
        "City",
        "Country",
        "Department",
        "Region",
        "Phone",
        "Email",
        "Workplace",
        "Job Title",
        "Relationship Status",
        "Hometown City",
        "Hometown Country",
      ];

      // Format the results data
      const csvData = results.map((user) => [
        user.firstName || "",
        user.lastName || "",
        user.gender || "",
        user.currentCity || "",
        user.currentCountry || "",
        user.currentDepartment || "",
        user.currentRegion || "",
        user.phoneNumber || "", // Phone
        user.email || "", // Email
        user.workplace || "",
        user.jobTitle || "",
        user.relationshipStatus || "", // Relationship
        user.hometownCity || "",
        user.hometownCountry || "",
      ]);

      // Combine headers and data
      const csvContent = [
        headers.join(","),
        ...csvData.map((row) =>
          row
            .map((cell) =>
              typeof cell === "string" && cell.includes(",")
                ? `"${cell.replace(/"/g, '""')}"`
                : cell
            )
            .join(",")
        ),
      ].join("\n");

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      const fileName = `user-search-results-page${currentPage + 1}-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up
    } catch (err) {
      console.error("Download error:", err);
      setError("An error occurred during download. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to download all results (requires fetching all pages)
const downloadAllResults = async () => {
  if (nbr === 0) {
    setError("Aucun résultat à télécharger.");
    return;
  }

  setIsDownloading(true);

  try {
    const requestPayload = {
      gender: searchParams.gender || null,
      cities:
        selectedLocations.cities.size > 0
          ? Array.from(selectedLocations.cities)
          : null,
      departments:
        selectedLocations.departments.size > 0
          ? Array.from(selectedLocations.departments)
          : null,
      regions:
        selectedLocations.regions.size > 0
          ? Array.from(selectedLocations.regions)
          : null,
      additionalAttributes: {},
    };

    const response = await fetch("http://localhost:8080/users/export-csvMS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = `all-user-search-results-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Erreur téléchargement :", err);
    setError("Une erreur est survenue lors du téléchargement.");
  } finally {
    setIsDownloading(false);
  }
};


  // Add this effect with your other useEffect hooks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadOptions) {
        const dropdown = document.querySelector(".dropdown-menu");
        if (dropdown && !dropdown.contains(event.target)) {
          setShowDownloadOptions(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadOptions]);

  const optionsG = [
    { value: "", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const [searchParams, setSearchParams] = useState({
    gender: "",
  });
  const [selectedLocations, setSelectedLocations] = useState({
    cities: new Set(),
    departments: new Set(),
    regions: new Set(),
  });
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [results, setResults] = useState([]);
  const [nbr, setNBR] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regionsData, setRegionsData] = useState(null);
  const [departmentsData, setDepartmentsData] = useState(null);
  const [showLayerGuide, setShowLayerGuide] = useState(true); // State for arrow/message visibility

  // Fetch city data from geo.api.gouv.fr
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://geo.api.gouv.fr/communes?fields=nom,codesPostaux,centre,population&boost=population"
        );
        // Filter cities with population > 20,000
        const filteredCities = response.data
          .filter((city) => city.population > 20000 && city.centre?.coordinates)
          .map((city) => ({
            name: city.nom,
            country: "France",
            position: [city.centre.coordinates[1], city.centre.coordinates[0]], // [lat, lon]
            population: city.population,
          }));
        setCities(filteredCities);
      } catch (error) {
        console.error("Error fetching city data:", error);
        setError("Failed to load city data. Please try again.");
      }
    };
    fetchCities();
  }, []);

  // Load GeoJSON data for departments and regions
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson"
    )
      .then((response) => response.json())
      .then((data) => setRegionsData(data))
      .catch((error) => console.error("Error loading regions:", error));

    fetch(
      "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson"
    )
      .then((response) => response.json())
      .then((data) => setDepartmentsData(data))
      .catch((error) => console.error("Error loading departments:", error));
  }, []);

  const hasValidSearchParams = useMemo(() => {
    return (
      searchParams.gender.trim() !== "" ||
      selectedLocations.cities.size > 0 ||
      selectedLocations.departments.size > 0 ||
      selectedLocations.regions.size > 0
    );
  }, [searchParams, selectedLocations]);

  const performSearch = useCallback(async () => {
    if (!hasValidSearchParams) {
      setResults([]);
      setNBR(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Format the request based on the AdvancedSearchRequest class
    const requestPayload = {
      gender: searchParams.gender || null,
      cities:
        selectedLocations.cities.size > 0
          ? Array.from(selectedLocations.cities)
          : null,
      departments:
        selectedLocations.departments.size > 0
          ? Array.from(selectedLocations.departments)
          : null,
      regions:
        selectedLocations.regions.size > 0
          ? Array.from(selectedLocations.regions)
          : null,
      page: currentPage,
      size: resultsPerPage,
      additionalAttributes: {}, // Empty for now, can be extended if needed
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/users/search/advanced",
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Process the response based on the expected structure
      setResults(response.data.content || []);
      setNBR(response.data.totalItems || 0);

      // Update currentPage if it came back different than what we requested
      if (response.data.currentPage !== undefined) {
        setCurrentPage(response.data.currentPage);
      }
    } catch (err) {
      setError("An error occurred during the search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchParams,
    selectedLocations,
    currentPage,
    resultsPerPage,
    hasValidSearchParams,
  ]);

  useEffect(() => {
    if (hasValidSearchParams) {
      performSearch();
    }
  }, [currentPage, performSearch, hasValidSearchParams]);

  const handleSelectChange = useCallback((value, name) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(0);
  }, []);

  const handleLocationToggle = useCallback((type, name) => {
    setSelectedLocations((prev) => {
      const newSet = new Set(prev[type]);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return { ...prev, [type]: newSet };
    });
    setCurrentPage(0);
  }, []);

  const clearSelections = useCallback(() => {
    setSelectedLocations({
      cities: new Set(),
      departments: new Set(),
      regions: new Set(),
    });
    setSearchParams({ gender: "" });
    setResults([]);
    setNBR(0);
    setCurrentPage(0);
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(nbr / resultsPerPage) || 1,
    [nbr, resultsPerPage]
  );

  const goToNextPage = useCallback(() => {
    if ((currentPage + 1) * resultsPerPage < nbr) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, resultsPerPage, nbr]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const getPageNumbers = useMemo(() => {
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const regionStyle = useCallback(
    (feature) => {
      const isSelected = selectedLocations.regions.has(feature.properties.nom);
      return {
        color: isSelected ? "red" : "blue",
        weight: 2,
        fillOpacity: 0.2,
        fillColor: isSelected ? "red" : "blue",
      };
    },
    [selectedLocations.regions]
  );

  const departmentStyle = useCallback(
    (feature) => {
      const isSelected = selectedLocations.departments.has(
        feature.properties.nom
      );
      return {
        color: isSelected ? "red" : "blue",
        weight: 2,
        fillOpacity: 0.2,
        fillColor: isSelected ? "red" : "blue",
      };
    },
    [selectedLocations.departments]
  );

  const onEachRegion = useCallback(
    (feature, layer) => {
      const name = feature.properties.nom;

      // Add tooltip to show name on hover
      layer.bindTooltip(name, {
        permanent: false,
        direction: "center",
        className: "leaflet-tooltip-custom",
      });

      // Keep popup for click
      layer.bindPopup(name);

      layer.on({
        click: () => handleLocationToggle("regions", name),
      });
    },
    [handleLocationToggle]
  );

  const onEachDepartment = useCallback(
    (feature, layer) => {
      const name = feature.properties.nom;

      // Add tooltip to show name on hover
      layer.bindTooltip(name, {
        permanent: false,
        direction: "center",
        className: "leaflet-tooltip-custom",
      });

      // Keep popup for click
      layer.bindPopup(name);

      layer.on({
        click: () => handleLocationToggle("departments", name),
      });
    },
    [handleLocationToggle]
  );

  const displayedResults = useMemo(() => {
    return results.map((user, index) => (
      <tr
        key={user.idS || index}
        className="border-b border-gray-50 dark:border-gray-800"
      >
        <td className="py-3 px-5 ">
          <div className="flex items-center gap-4">
            <div>
              <Typography
                variant="small"
                className="font-semibold text-black dark:text-white"
              >
                {user.firstName} {user.lastName}
              </Typography>
            </div>
          </div>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.gender === "male"
              ? "Male"
              : user.gender === "female"
              ? "Female"
              : user.gender}
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.currentCity}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500 dark:text-gray-100">
            {user.currentCountry}
          </Typography>
        </td>

        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.currentDepartment}
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.currentRegion}
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-normal text-blue-gray-500 dark:text-gray-100">
            <ProtectedData dataId={user.idS} type="phone" />
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            <ProtectedData dataId={user.idS} type="email" />
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.workplace || "Not specified"}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500 dark:text-gray-100">
            {user.jobTitle || ""}
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            <ProtectedData dataId={user.idS} type="relationship" />
          </Typography>
        </td>
        <td className="py-3 px-5">
          <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-gray-100">
            {user.hometownCity}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500 dark:text-gray-100">
            {user.hometownCountry}
          </Typography>
        </td>
      </tr>
    ));
  }, [results]);

  //const gradientStyle = { background: "linear-gradient(135deg, #b24592 0%, #f15f79 100%)" };
  const gradientStyle = {
    background: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
  };
  // Add style tag to inject tooltip styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = tooltipStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="mt-2 mb-2 flex flex-col gap-12">
      <ComponentCard
        title={
          <div className="flex flex-col items-center justify-center mb-4 mt-4">
            <div className="flex items-center mb-4">
              {/* Logo de la marque */}
              <div
                className="p-3 rounded-lg shadow-lg mr-4"
                style={gradientStyle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-10 w-10 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                  />
                </svg>
              </div>

              {/* Titre de l'application */}
              <div>
                <label
                  className="font-bold mb-0 text-gray-800 dark:text-gray-200"
                  color="blue-gray"
                  style={{ fontSize: "3rem" }}
                >
                  Map<span className="text-red-400"> Search</span>
                </label>
              </div>
            </div>

            <label
              className="text-center max-w-lg opacity-80 text-gray-800 dark:text-gray-200"
              style={{ fontSize: "1rem" }}
            >
              Quickly find Phone Numbers from any Person in France
            </label>
          </div>
        }
      >
        <CardHeader className="mb-8 p-6" style={gradientStyle}>
          <Typography variant="h5" color="white">
            Map Search
          </Typography>
        </CardHeader>
        <CardBody className="px-6 pt-2 pb-6">
          <div className="mb-6">
            <Label variant="h6" className="mb-4">
              Search by Location and Gender
            </Label>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col w-full md:w-1/4">
                <Label variant="small" className="mb-2 font-medium">
                  Gender
                </Label>
                <Select
                  name="gender"
                  value={searchParams.gender}
                  onChange={(value) => handleSelectChange(value, "gender")}
                  options={optionsG}
                />
              </div>
            </div>
            <div
              className="map-container relative"
              style={{ height: "550px", width: "100%" }}
            >
              <MapContainer
                center={[46.71109, 1.7191036]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                minZoom={5}
                maxBounds={[
                  [40.5, -5.5],
                  [52, 9.5],
                ]}
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay checked name="Cities">
                    <LayerGroup>
                      {cities.map((city) => (
                        <Marker
                          key={city.name}
                          position={city.position}
                          icon={
                            selectedLocations.cities.has(city.name)
                              ? redIcon
                              : blueIcon
                          }
                          eventHandlers={{
                            click: () =>
                              handleLocationToggle("cities", city.name),
                          }}
                        >
                          <Tooltip
                            direction="top"
                            offset={[0, -5]}
                            opacity={0.9}
                            permanent={false}
                          >
                            {city.name}
                          </Tooltip>
                          <Popup>
                            {city.name}, France (Pop:{" "}
                            {city.population.toLocaleString()})
                          </Popup>
                        </Marker>
                      ))}
                    </LayerGroup>
                  </LayersControl.Overlay>
                  {departmentsData && (
                    <LayersControl.Overlay checked name="Departments">
                      <GeoJSON
                        data={departmentsData}
                        style={departmentStyle}
                        onEachFeature={onEachDepartment}
                      />
                    </LayersControl.Overlay>
                  )}
                  {regionsData && (
                    <LayersControl.Overlay checked name="Regions">
                      <GeoJSON
                        data={regionsData}
                        style={regionStyle}
                        onEachFeature={onEachRegion}
                      />
                    </LayersControl.Overlay>
                  )}
                </LayersControl>
              </MapContainer>
              {showLayerGuide && (
                <div
                  className="absolute top-2 right-2 z-[1000] flex items-center cursor-pointer"
                  onClick={() => setShowLayerGuide(false)}
                >
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-gray-800 border-b-[8px] border-b-transparent"></div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <Label variant="small" className="mb-2">
                Selected Locations:
              </Label>
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedLocations.cities).map((city) => (
                  <span
                    key={`city-${city}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                    onClick={() => handleLocationToggle("cities", city)}
                  >
                    {city} ×
                  </span>
                ))}
                {Array.from(selectedLocations.departments).map((dept) => (
                  <span
                    key={`dept-${dept}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                    onClick={() => handleLocationToggle("departments", dept)}
                  >
                    {dept} (Dept) ×
                  </span>
                ))}
                {Array.from(selectedLocations.regions).map((region) => (
                  <span
                    key={`region-${region}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                    onClick={() => handleLocationToggle("regions", region)}
                  >
                    {region} (Region) ×
                  </span>
                ))}
                {selectedLocations.cities.size === 0 &&
                  selectedLocations.departments.size === 0 &&
                  selectedLocations.regions.size === 0 && (
                    <Label variant="small" className="text-blue-gray-500">
                      No locations selected
                    </Label>
                  )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 ">
              <Button
                type="button"
                color="gray"
                disabled={isLoading}
                style={gradientStyle}
                onClick={performSearch}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="red"
                onClick={clearSelections}
              >
                Clear
              </Button>
            </div>
            <div className="flex justify-between items-center mt-4 gap-20 justify-end">
              <div className="relative">
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white mt-2"
                  onClick={() => downloadAllResults()}
                  disabled={results.length === 0 || isLoading || isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      Download All Results
                    </>
                  )}
                </Button>

                {showDownloadOptions && (
                  <div
                    className="absolut right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-[1000] border border-gray-200"
                    onClick={(e) => e.stopPropagation()} // Prevent click inside from closing the dropdown
                  >
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => {
                          downloadCurrentResults();
                          setShowDownloadOptions(false);
                        }}
                        disabled={isDownloading}
                      >
                        Current Page ({results.length} results)
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => {
                          downloadAllResults();
                          setShowDownloadOptions(false);
                        }}
                        disabled={isDownloading}
                      >
                        All Results ({nbr} results)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        </CardBody>
      </ComponentCard>

      <ComponentCard>
        <CardHeader className="mb-8 p-6" style={gradientStyle}>
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="white">
              Search Results
            </Typography>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="px-2 py-0.5 rounded-full bg-white text-red-500 font-bold shadow-sm">
                  {nbr} results
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-red-500 font-bold shadow-sm">
                  {results.length} shown
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="search-results-table w-full min-w-[640px] table-auto">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    {[
                      "Users",
                      "Gender",
                      "Location",
                      "Department",
                      "Region",
                      "Phone Number",
                      "Email",
                      "Workplace",
                      "Relationship Status",
                      "Home Location",
                    ].map((el) => (
                      <th key={el} className="py-3 px-5 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold text-gray-700 dark:text-gray-300"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody bg-white dark:bg-gray-900>
                  {displayedResults}
                </tbody>
              </table>
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-4">
                <Typography className="text-gray-800 dark:text-gray-200">
                  No results found.
                </Typography>
              </div>
            )
          )}
          {isLoading && (
            <div className="text-center py-4">
              <Typography className="text-gray-800 dark:text-gray-200">
                Loading the results...
              </Typography>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 dark:border-blue-gray-800 p-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 0 || isLoading}
              color="gray"
              size="sm"
              style={gradientStyle}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {getPageNumbers.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "filled" : "outlined"}
                  color={currentPage === page ? "red" : "gray"}
                  size="sm"
                  className="pagination-button text-gray-800 dark:text-gray-200"
                  onClick={() => goToPage(page)}
                  disabled={isLoading}
                >
                  {page + 1}
                </Button>
              ))}
            </div>
            <Button
              onClick={goToNextPage}
              disabled={
                (currentPage + 1) * resultsPerPage >= nbr || !nbr || isLoading
              }
              color="gray"
              size="sm"
              style={gradientStyle}
            >
              Next
            </Button>
          </div>
          <Typography
            variant="small"
            className="font-medium text-gray-800 dark:text-gray-200"
          >
            Page {currentPage + 1} of {totalPages}
          </Typography>
        </CardFooter>
      </ComponentCard>
    </div>
  );
}

export default MapSearch;
