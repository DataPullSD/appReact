package com.example.springelasticproject.model;

import com.example.springelasticproject.Services.RepairShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/repair-shops")
public class RepairShopController {

    private final RepairShopService repairShopService;

    @Autowired
    public RepairShopController(RepairShopService repairShopService) {
        this.repairShopService = repairShopService;
    }

    // Créer une nouvelle boutique de réparation
    @PostMapping
    public ResponseEntity<RepairShop> createRepairShop(@RequestBody RepairShop repairShop) {
        RepairShop savedShop = repairShopService.save(repairShop);
        return new ResponseEntity<>(savedShop, HttpStatus.CREATED);
    }

    // Obtenir toutes les boutiques (paginées)
    @GetMapping
    public ResponseEntity<Page<RepairShop>> getAllRepairShops(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy) {
        try {
            PageRequest pageRequest;
            if (sortBy != null && !sortBy.isEmpty()) {
                pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
            } else {
                // Sans tri si aucun champ de tri n'est spécifié
                pageRequest = PageRequest.of(page, size);
            }
            Page<RepairShop> shops = repairShopService.findAll(pageRequest);
            return new ResponseEntity<>(shops, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtenir une boutique par ID
    @GetMapping("/{id}")
    public ResponseEntity<RepairShop> getRepairShopById(@PathVariable String id) {
        Optional<RepairShop> shop = repairShopService.findById(id);
        return shop.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Mettre à jour une boutique
    @PutMapping("/{id}")
    public ResponseEntity<RepairShop> updateRepairShop(@PathVariable String id, @RequestBody RepairShop repairShop) {
        if (!repairShopService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repairShop.setPlaceId(id);
        RepairShop updatedShop = repairShopService.save(repairShop);
        return new ResponseEntity<>(updatedShop, HttpStatus.OK);
    }

    // Supprimer une boutique
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepairShop(@PathVariable String id) {
        if (!repairShopService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repairShopService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Rechercher des boutiques par nom
    @GetMapping("/search/name")
    public ResponseEntity<List<RepairShop>> searchByName(@RequestParam String name) {
        List<RepairShop> shops = repairShopService.findByName(name);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par catégorie principale
    @GetMapping("/search/category")
    public ResponseEntity<List<RepairShop>> searchByCategory(@RequestParam String category) {
        List<RepairShop> shops = repairShopService.findByMainCategory(category);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par ville
    @GetMapping("/search/city")
    public ResponseEntity<List<RepairShop>> searchByCity(@RequestParam String city) {
        List<RepairShop> shops = repairShopService.findByCity(city);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par code postal
    @GetMapping("/search/postal-code")
    public ResponseEntity<List<RepairShop>> searchByPostalCode(@RequestParam String postalCode) {
        List<RepairShop> shops = repairShopService.findByPostalCode(postalCode);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par note minimale
    @GetMapping("/search/rating")
    public ResponseEntity<List<RepairShop>> searchByMinimumRating(@RequestParam Float rating) {
        List<RepairShop> shops = repairShopService.findByMinimumRating(rating);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par plage de notes
    @GetMapping("/search/rating-range")
    public ResponseEntity<List<RepairShop>> searchByRatingRange(
            @RequestParam Float minRating,
            @RequestParam Float maxRating) {
        List<RepairShop> shops = repairShopService.findByRatingRange(minRating, maxRating);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par nombre minimum d'avis
    @GetMapping("/search/min-reviews")
    public ResponseEntity<List<RepairShop>> searchByMinimumReviews(@RequestParam Integer minReviews) {
        List<RepairShop> shops = repairShopService.findByMinimumReviews(minReviews);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques ouvertes un jour spécifique
    @GetMapping("/search/open")
    public ResponseEntity<List<RepairShop>> searchByOpenDay(@RequestParam String day) {
        List<RepairShop> shops = repairShopService.findOpenOn(day);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par numéro de téléphone
    @GetMapping("/search/phone")
    public ResponseEntity<List<RepairShop>> searchByPhone(@RequestParam String phone) {
        List<RepairShop> shops = repairShopService.findByPhone(phone);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques par statut
    @GetMapping("/search/status")
    public ResponseEntity<List<RepairShop>> searchByStatus(@RequestParam String status) {
        List<RepairShop> shops = repairShopService.findByStatus(status);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Recherche textuelle dans plusieurs champs
    @GetMapping("/search")
    public ResponseEntity<List<RepairShop>> searchShops(@RequestParam String query) {
        List<RepairShop> shops = repairShopService.searchByText(query);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Rechercher des boutiques à proximité d'une position
    @GetMapping("/search/nearby")
    public ResponseEntity<List<RepairShop>> searchNearbyShops(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5.0") Double distance) {
        List<RepairShop> shops = repairShopService.findNearbyShops(latitude, longitude, distance);
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    // Endpoints de gestion d'index
    @PostMapping("/reindex")
    public ResponseEntity<Void> reindexAll() {
        repairShopService.reindexAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/index")
    public ResponseEntity<Void> deleteIndex() {
        repairShopService.deleteIndex();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/index")
    public ResponseEntity<Void> createIndex() {
        repairShopService.createIndex();
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/searchByA04NoFus")
    public ResponseEntity<Map<String, Object>> searchByAttributes04NoFus(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        // Création de l'objet Pageable pour la pagination
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        // Appel à la méthode de recherche
        Map<String, Object> searchResults = repairShopService.searchByAttributes04NoFuss(attributes, pageable);


        return ResponseEntity.ok(searchResults);
    }
}
