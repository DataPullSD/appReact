import { useState, useEffect } from "react";
import axios from "axios"; // Ajout de l'importation d'axios
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Palette de couleurs modernes
const COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#3b82f6", // blue
  "#14b8a6", // teal
  "#f43f5e", // rose
  "#84cc16", // lime
  "#a855f7", // purple
  "#ec4899", // pink
  "#22c55e", // green
  "#eab308", // yellow
  "#0ea5e9", // sky
  "#d946ef", // fuchsia
  "#6b7280", // gray
  "#fb923c", // orange
  "#4ade80", // light green
  "#f87171", // light red
  "#38bdf8"  // light blue
];


export default function StatisticsDashboard() {
  // State pour les données statistiques
  const [stats, setStats] = useState({
    departments: [],
    regions: [],
    relationshipStatus: [],
    gender: [],
    cities: [],
  });

  // State pour le statut de chargement
  const [loading, setLoading] = useState(true);
  // State pour les erreurs
  const [error, setError] = useState(null);
  // State pour l'onglet actif
  const [activeTab, setActiveTab] = useState("dashboard");
  // State pour le type de graphique
  const [chartType, setChartType] = useState("pie");
  // State pour le nombre total d'utilisateurs
  const [userCount, setUserCount] = useState(null);

  // Fonction pour récupérer les données depuis le backend
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/statistics/${endpoint}`
      );
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des données ${endpoint}`
        );
      }
      return await response.json();
    } catch (err) {
      setError(
        `Impossible de charger les données ${endpoint}. Veuillez réessayer plus tard.`
      );
      return [];
    }
  };

  // Fonction pour récupérer le nombre total d'utilisateurs
  const getUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/countUsers');
      return response.data;
    } catch (error) {
      console.error('Erreur dans getUserCount :', error.message);
      return null;
    }
  };

  // Fonction pour charger toutes les statistiques
  const loadAllStatistics = async () => {
    setLoading(true);
    try {
      const [departments, regions, relationshipStatus, gender, cities, count] =
        await Promise.all([
          fetchData("departments"),
          fetchData("regions"),
          fetchData("relationship-status"),
          fetchData("gender"),
          fetchData("cities"),
          getUserCount(),
        ]);

      setStats({
        departments,
        regions,
        relationshipStatus,
        gender,
        cities,
      });
      setUserCount(count);
    } catch (err) {
      setError(
        "Impossible de charger les statistiques. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  // Chargement des statistiques au montage du composant
  useEffect(() => {
    loadAllStatistics();
  }, []);

  // Fonction pour calculer le total
  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + (item.count || 0), 0);
  };

  // Fonction pour obtenir les meilleurs éléments par nombre
  const getTopItems = (data, limit = 5) => {
    return [...data].sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, limit);
  };

  // Rendu d'un graphique à barres
  const renderBarChart = (data, title, height = 400) => {
    if (!data || data.length === 0) return null;
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">{title}</h2>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ angle: -45, fontSize: 12, textAnchor: "end" }}
              height={70}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Rendu d'un graphique circulaire
  const renderPieChart = (data, title, height = 400) => {
    if (!data || data.length === 0) return null;
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">{title}</h2>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={140}
              innerRadius={70}
              fill="#8884d8"
              dataKey="count"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [value, "Total"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Rendu d'un graphique linéaire
  const renderLineChart = (data) => {
    if (!data || data.length === 0) return null;
    return (
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ angle: -45, fontSize: 12, textAnchor: "end" }}
            height={70}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Rendu d'un petit histogramme pour les éléments principaux
  const renderTopItemsHistogram = (data, title, fillColor, badgeColor, badgeText) => {
    if (!data || data.length === 0) return null;
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
          <div className={`bg-${badgeColor}-100 text-${badgeColor}-700 text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {badgeText}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 15, right: 10, left: 0, bottom: 25 }}
          >
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Bar dataKey="count" fill={fillColor} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % 3]} />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                fontSize={12}
                fill="#6b7280"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Fonction pour rendre le graphique approprié
  const renderChart = (data) => {
    switch (chartType) {
      case "bar":
        return renderBarChart(data, "Statistiques", 600);
      case "pie":
        return renderPieChart(data, "Statistiques", 450);
      case "line":
        return renderLineChart(data);
      default:
        return renderBarChart(data, "Statistiques", 600);
    }
  };

  // Rendu du tableau de bord de synthèse
  const renderDashboard = () => {
    const totalUsers = calculateTotal(stats.gender);
    const topDepartments = getTopItems(stats.departments, 3);
    const topCities = getTopItems(stats.cities, 3);
    const topRegions = getTopItems(stats.regions, 3);

    return (
      <div>
        {/* Carte récapitulative */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center dark:bg-gray-900 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              Vue d'ensemble
            </h2>
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {userCount || totalUsers || "N/A"}
            </div>
            <p className="text-gray-500 dark:text-gray-400">Utilisateurs enregistrés</p>
          </div>
          <div className="ml-auto bg-indigo-50 p-3 rounded-lg dark:bg-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
        </div>

        {/* Section Top Locations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {renderTopItemsHistogram(topRegions, "Top Régions", "#8b5cf6", "rose", "Localisation")}
          {renderTopItemsHistogram(topDepartments, "Top Départements", "#6366f1", "emerald", "Localisation")}
          {renderTopItemsHistogram(topCities, "Top Villes", "#10b981", "amber", "Localisation")}
        </div>

        {/* Section Données Démographiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {renderPieChart(stats.gender, "Distribution par Genre")}
          {renderPieChart(stats.relationshipStatus, "Statut Relationnel")}
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {renderBarChart(getTopItems(stats.departments, 10), "Top 10 Départements", 500)}
          {renderBarChart(getTopItems(stats.regions,10) ,"Top 10 Région", 500)}
        </div>

        {/* Statistiques complètes des villes */}
        {renderBarChart(getTopItems(stats.cities, 10), "Top 10 Villes", 600)}

        {/* Informations système */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Informations
            </h2>
            <div className="bg-gray-50 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Système
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-indigo-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm dark:text-white">Dernière analyse</p>
              <p className="font-medium dark:text-white">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            Données basées sur la dernière extraction d'Elasticsearch
          </div>
        </div>
      </div>
    );
  };

  // Rendu état de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-300"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Chargement des données...
          </p>
        </div>
      </div>
    );
  }

  // Rendu état d'erreur
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-lg dark:bg-gray-900 dark:border-red-500">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <strong className="font-semibold">Erreur</strong>
          </div>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors"
            onClick={() => loadAllStatistics()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Rendu principal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête du tableau de bord */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
            Tableau de bord analytique
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Vue d'ensemble des statistiques utilisateurs et démographiques
          </p>
        </div>

        {/* Onglets de navigation */}
        <div className="flex mb-8 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
          <button
            className={`px-6 py-3 font-medium flex items-center ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
            Tableau de bord
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center ${
              activeTab === "departments"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("departments")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            Départements
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center ${
              activeTab === "regions"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("regions")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a12.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
              />
            </svg>
            Régions
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center ${
              activeTab === "cities"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("cities")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
            Villes
          </button>
        </div>

        {/* Sélecteur de type de graphique */}
        {activeTab !== "dashboard" && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center dark:bg-gray-900 dark:border-gray-800">
            <label className="mr-3 font-medium text-gray-700 dark:text-white">
              Type de graphique:
            </label>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center ${
                  chartType === "bar"
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
                }`}
                onClick={() => setChartType("bar")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
                Barres
              </button>
              <button
                className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center ${
                  chartType === "pie"
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
                }`}
                onClick={() => setChartType("pie")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Circulaire
              </button>
              <button
                className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center ${
                  chartType === "line"
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
                }`}
                onClick={() => setChartType("line")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
                Ligne
              </button>
            </div>
          </div>
        )}

        {/* Contenu basé sur l'onglet actif */}
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "departments" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">
                  Statistiques par Département
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Distribution des utilisateurs par département
                </p>
              </div>
              <div className="bg-indigo-50 text-indigo-700 py-1 px-3 rounded-full text-sm font-medium flex items-center dark:bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
                {stats.departments.length} départements
              </div>
            </div>
            {renderChart(stats.departments)}
          </div>
        )}
        {activeTab === "regions" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">
                  Statistiques par Région
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Distribution des utilisateurs par région
                </p>
              </div>
              <div className="bg-indigo-50 text-indigo-700 py-1 px-3 rounded-full text-sm font-medium flex items-center dark:bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {stats.regions.length} régions
              </div>
            </div>
            {renderChart(stats.regions)}
          </div>
        )}
        {activeTab === "cities" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1 dark:text-white">
                  Statistiques par Ville
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Distribution des utilisateurs par ville
                </p>
              </div>
              <div className="bg-indigo-50 text-indigo-700 py-1 px-3 rounded-full text-sm font-medium flex items-center dark:bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
                {stats.cities.length} villes
              </div>
            </div>
            {renderChart(stats.cities)}
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-8 text-center text-gray-500 text-sm dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} • Tableau de bord analytique • Dernière
            mise à jour: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}