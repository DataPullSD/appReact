import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export function SearchStatistics() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("weekly"); // weekly, monthly, yearly
  const [genderFilter, setGenderFilter] = useState("all"); // all, male, female
  const [relationshipFilter, setRelationshipFilter] = useState("all"); // all, married, single

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock API call - replace with actual API to your backend
        // Example: const response = await fetch(`/api/search/statistics?period=${period}&gender=${genderFilter}&relationship=${relationshipFilter}`);
        // const data = await response.json();

        // Mock data for regions and departments
        const mockData = {
          weekly: {
            regions: [
              { name: "Île-de-France", count: 1200 },
              { name: "Auvergne-Rhône-Alpes", count: 950 },
              { name: "Provence-Alpes-Côte d'Azur", count: 800 },
              { name: "Nouvelle-Aquitaine", count: 700 },
              { name: "Occitanie", count: 650 },
            ],
            departments: [
              {
                name: "Paris (75)",
                all: { all: 500, married: 300, single: 200 },
                male: { all: 250, married: 150, single: 100 },
                female: { all: 250, married: 150, single: 100 },
              },
              {
                name: "Rhône (69)",
                all: { all: 400, married: 240, single: 160 },
                male: { all: 200, married: 120, single: 80 },
                female: { all: 200, married: 120, single: 80 },
              },
              {
                name: "Bouches-du-Rhône (13)",
                all: { all: 350, married: 210, single: 140 },
                male: { all: 175, married: 105, single: 70 },
                female: { all: 175, married: 105, single: 70 },
              },
              {
                name: "Gironde (33)",
                all: { all: 300, married: 180, single: 120 },
                male: { all: 150, married: 90, single: 60 },
                female: { all: 150, married: 90, single: 60 },
              },
              {
                name: "Haute-Garonne (31)",
                all: { all: 280, married: 168, single: 112 },
                male: { all: 140, married: 84, single: 56 },
                female: { all: 140, married: 84, single: 56 },
              },
            ],
          },
          monthly: {
            regions: [
              { name: "Île-de-France", count: 4800 },
              { name: "Auvergne-Rhône-Alpes", count: 3800 },
              { name: "Provence-Alpes-Côte d'Azur", count: 3200 },
              { name: "Nouvelle-Aquitaine", count: 2800 },
              { name: "Occitanie", count: 2600 },
            ],
            departments: [
              {
                name: "Paris (75)",
                all: { all: 2000, married: 1200, single: 800 },
                male: { all: 1000, married: 600, single: 400 },
                female: { all: 1000, married: 600, single: 400 },
              },
              {
                name: "Rhône (69)",
                all: { all: 1600, married: 960, single: 640 },
                male: { all: 800, married: 480, single: 320 },
                female: { all: 800, married: 480, single: 320 },
              },
              {
                name: "Bouches-du-Rhône (13)",
                all: { all: 1400, married: 840, single: 560 },
                male: { all: 700, married: 420, single: 280 },
                female: { all: 700, married: 420, single: 280 },
              },
              {
                name: "Gironde (33)",
                all: { all: 1200, married: 720, single: 480 },
                male: { all: 600, married: 360, single: 240 },
                female: { all: 600, married: 360, single: 240 },
              },
              {
                name: "Haute-Garonne (31)",
                all: { all: 1120, married: 672, single: 448 },
                male: { all: 560, married: 336, single: 224 },
                female: { all: 560, married: 336, single: 224 },
              },
            ],
          },
          yearly: {
            regions: [
              { name: "Île-de-France", count: 57600 },
              { name: "Auvergne-Rhône-Alpes", count: 45600 },
              { name: "Provence-Alpes-Côte d'Azur", count: 38400 },
              { name: "Nouvelle-Aquitaine", count: 33600 },
              { name: "Occitanie", count: 31200 },
            ],
            departments: [
              {
                name: "Paris (75)",
                all: { all: 24000, married: 14400, single: 9600 },
                male: { all: 12000, married: 7200, single: 4800 },
                female: { all: 12000, married: 7200, single: 4800 },
              },
              {
                name: "Rhône (69)",
                all: { all: 19200, married: 11520, single: 7680 },
                male: { all: 9600, married: 5760, single: 3840 },
                female: { all: 9600, married: 5760, single: 3840 },
              },
              {
                name: "Bouches-du-Rhône (13)",
                all: { all: 16800, married: 10080, single: 6720 },
                male: { all: 8400, married: 5040, single: 3360 },
                female: { all: 8400, married: 5040, single: 3360 },
              },
              {
                name: "Gironde (33)",
                all: { all: 14400, married: 8640, single: 5760 },
                male: { all: 7200, married: 4320, single: 2880 },
                female: { all: 7200, married: 4320, single: 2880 },
              },
              {
                name: "Haute-Garonne (31)",
                all: { all: 13440, married: 8064, single: 5376 },
                male: { all: 6720, married: 4032, single: 2688 },
                female: { all: 6720, married: 4032, single: 2688 },
              },
            ],
          },
        };

        setSearchData(mockData[period]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search statistics:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [period, genderFilter, relationshipFilter]);

  // Chart options for regions
  const regionChartOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: searchData?.regions.map((r) => r.name) || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Search Results",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} results`,
      },
    },
  };

  const regionChartSeries = searchData
    ? [
        {
          name: "Search Results",
          data: searchData.regions.map((r) => r.count),
        },
      ]
    : [];

  // Chart options for departments
  const departmentChartOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: searchData?.departments.map((d) => d.name) || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Search Results",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} results`,
      },
    },
  };

  const departmentChartSeries = searchData
    ? [
        {
          name: "Search Results",
          data: searchData.departments.map((d) => {
            const gender = genderFilter === "all" ? "all" : genderFilter;
            return d[gender][relationshipFilter];
          }),
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Region Card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Search Statistics by Region
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Number of search results by French region
            </p>
          </div>
          <div className="flex items-start w-full gap-3 sm:justify-end">
            <div className="relative inline-block">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
              </button>
              <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="w-40 p-2"
              >
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Export Data
                </DropdownItem>
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  Print Report
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === "weekly"
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === "monthly"
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === "yearly"
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Yearly
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-brand-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] xl:min-w-full">
              <Chart
                options={regionChartOptions}
                series={regionChartSeries}
                type="bar"
                height={310}
              />
            </div>
          </div>
        )}
      </div>

      {/* Department Card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Search Statistics by Department
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Number of search results by French department, filtered by gender and relationship status
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={relationshipFilter}
            onChange={(e) => setRelationshipFilter(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <option value="all">All Relationship Statuses</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-brand-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] xl:min-w-full">
              <Chart
                options={departmentChartOptions}
                series={departmentChartSeries}
                type="bar"
                height={310}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchStatistics;