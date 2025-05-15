package com.example.springelasticproject.Services;

import com.example.springelasticproject.model.RepairShop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RepairShopService {

    // Opérations CRUD de base
    RepairShop save(RepairShop repairShop);
    Optional<RepairShop> findById(String id);
    List<RepairShop> findAll();
    Page<RepairShop> findAll(Pageable pageable);
    void deleteById(String id);
    boolean existsById(String id);
    long count();

    // Opérations spécifiques métier
    List<RepairShop> findByName(String name);
    List<RepairShop> findByMainCategory(String mainCategory);
    List<RepairShop> findByCity(String city);
    List<RepairShop> findByPostalCode(String postalCode);
    List<RepairShop> findByMinimumRating(Float rating);
    List<RepairShop> findByRatingRange(Float minRating, Float maxRating);
    List<RepairShop> findByMinimumReviews(Integer minReviews);
    List<RepairShop> findOpenOn(String day);
    List<RepairShop> findByPhone(String phone);
    List<RepairShop> findByStatus(String status);
    List<RepairShop> searchByText(String searchText);
    List<RepairShop> findNearbyShops(Double latitude, Double longitude, Double distanceInKm);
    List<RepairShop> findByCategory(String category);

    // Opérations sur l'index
    void indexAllShops(List<RepairShop> shops);
    void reindexAll();
    void deleteIndex();
    void createIndex();
    public Map<String, Object> searchByAttributes04NoFuss(Map<String, String> attributes, Pageable pageable);
}
