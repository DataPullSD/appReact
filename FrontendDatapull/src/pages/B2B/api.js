// services/api.js
const API_BASE_URL = "http://localhost:8080/api/repair-shops"; // Ajustez selon votre configuration

export const searchRestaurants = async (filters, page = 0, size = 10, sortBy = "_score", direction = "desc") => {
  try {
    const response = await fetch(`${API_BASE_URL}/searchByA04NoFus?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    console.log(response)
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    throw error;
  }
};