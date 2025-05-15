import { useState, useEffect } from "react";
import axios from 'axios';
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
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#3b82f6",
  "#14b8a6",
  "#f43f5e",
  "#84cc16",
  "#a855f7",
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
      console.error(`Échec du chargement de ${endpoint}:`, err);
      setError(
        `Impossible de charger les données ${endpoint}. Veuillez réessayer plus tard.`
      );
      return [];
    }
  };
  const [userCount, setUserCount] = useState(null);


  const getUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/countUsers');
      return response.data;
    } catch (error) {
      console.error('Erreur dans getUserCount :', error.message);
      return null;
    }
  };
  
  
  
  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };
    fetchUserCount();

   
  }, []);

  // Fonction pour charger toutes les statistiques
  const loadAllStatistics = async () => {
    setLoading(true);
    try {
      const [departments, regions, relationshipStatus, gender, cities] =
        await Promise.all([
          fetchData("departments"),
          fetchData("regions"),
          fetchData("relationship-status"),
          fetchData("gender"),
          fetchData("cities"),
        ]);

      setStats({
        departments,
        regions,
        relationshipStatus,
        gender,
        cities,
      });
    } catch (err) {
      console.error("Échec du chargement des statistiques:", err);
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
    return data.reduce((sum, item) => sum + item.count, 0);
  };

  // Fonction pour obtenir les meilleurs éléments par nombre
  const getTopItems = (data, limit = 5) => {
    return [...data].sort((a, b) => b.count - a.count).slice(0, limit);
  };

  // Rendu d'un graphique à barres
  const renderBarChart = (data, title, height = 400) => {
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
              formatter={(value, name, props) => [value, "Total"]}
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

  // Rendu d'un petit histogramme pour les éléments principaux
  const renderTopItemsHistogram = (data, title, fillColor, badgeColor, badgeText) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
          <div className={`bg-${badgeColor}-50 text-${badgeColor}-700 text-xs font-medium px-2.5 py-0.5 rounded-full `}>
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

  // Préparation des données pour le rendu
  const totalUsers = calculateTotal(stats.gender);
  const topDepartments = getTopItems(stats.departments, 3);
  const topCities = getTopItems(stats.cities, 3);
  const topRegions = getTopItems(stats.regions, 3);

  // Rendu principal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        {/* En-tête du tableau de bord */}
        <div className="mb-8 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
            Tableau de bord analytique
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Vue d'ensemble des statistiques utilisateurs et démographiques
          </p>
        </div>

        {/* Carte récapitulative */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center dark:bg-gray-900 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white" >
              Vue d'ensemble
            </h2>
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {userCount}
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

        {/* Section Top Locations - 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 dark:bg-gray-900">
          {/* Top régions */}
          {renderTopItemsHistogram(topRegions, "Top Régions", "#8b5cf6", "rose", "Localisation")}
          
          {/* Top départements */}
          {renderTopItemsHistogram(topDepartments, "Top Départements", "#6366f1", "emerald", "Localisation")}
          
          {/* Top villes */}
          {renderTopItemsHistogram(topCities, "Top Villes", "#10b981", "amber", "Localisation")}
        </div>

        {/* Section Données Démographiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Distribution par genre */}
          {renderPieChart(stats.gender, "Distribution par Genre")}
          
          {/* Statut relationnel */}
          {renderPieChart(stats.relationshipStatus, "Statut Relationnel")}
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Départements */}
          {renderBarChart(getTopItems(stats.departments, 20), "Top 20 Départements", 500)}
          
          {/* Régions */}
          {renderBarChart(stats.regions, "Statistiques par Région", 500)}
        </div>

        {/* Statistiques complètes des villes (prend toute la largeur) */}
        {renderBarChart(getTopItems(stats.cities, 20), "Top 20 Villes", 600)}

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

        

        {/* Pied de page */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} • Tableau de bord analytique • Dernière
            mise à jour: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}