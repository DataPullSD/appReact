package com.example.springelasticproject.repository;


import com.example.springelasticproject.model.RepairShop;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairShopRepository extends ElasticsearchRepository<RepairShop, String> {

    // Rechercher par nom
    List<RepairShop> findByNameContainingIgnoreCase(String name);

    // Rechercher par catégorie principale
    List<RepairShop> findByMainCategory(String mainCategory);

    // Rechercher par ville
    List<RepairShop> findByCity(String city);

    // Rechercher par code postal
    List<RepairShop> findByPostalCode(String postalCode);

    // Rechercher les boutiques ayant une note minimale
    List<RepairShop> findByRatingGreaterThanEqual(Float rating);

    // Rechercher les boutiques ouvertes un jour spécifique
    List<RepairShop> findByClosedOnNotContaining(String day);

    // Rechercher les boutiques par téléphone
    List<RepairShop> findByPhoneContaining(String phone);

    // Rechercher les boutiques par description
    List<RepairShop> findByDescriptionContaining(String text);

    // Requête géospatiale - Trouver les boutiques dans un certain rayon
    @Query("{\"bool\": {\"must\": {\"match_all\": {}}, \"filter\": {\"geo_distance\": {\"distance\": \"?0km\", \"coordinates\": {\"lat\": ?1, \"lon\": ?2}}}}}")
    List<RepairShop> findByGeoDistance(Double distance, Double latitude, Double longitude);

    // Rechercher par catégorie
    List<RepairShop> findByCategoriesContaining(String category);

    // Rechercher par statut (ouvert, fermé, etc.)
    List<RepairShop> findByStatus(String status);

    // Rechercher par plage de notes
    List<RepairShop> findByRatingBetween(Float minRating, Float maxRating);

    // Rechercher par nombre minimum d'avis
    List<RepairShop> findByReviewsGreaterThanEqual(Integer minReviews);

    // Recherche multi-champs
    @Query("{\"bool\": {\"should\": [{\"match\": {\"name\": \"?0\"}}, {\"match\": {\"description\": \"?0\"}}, {\"match\": {\"mainCategory\": \"?0\"}}, {\"match\": {\"categories\": \"?0\"}}]}}")
    List<RepairShop> searchAcrossFields(String searchText);
}