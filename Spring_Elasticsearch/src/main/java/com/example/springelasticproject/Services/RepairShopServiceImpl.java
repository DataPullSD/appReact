package com.example.springelasticproject.Services;

import co.elastic.clients.elasticsearch._types.query_dsl.*;
import com.example.springelasticproject.model.RepairShop;
import com.example.springelasticproject.model.User;
import com.example.springelasticproject.repository.RepairShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RepairShopServiceImpl implements RepairShopService {

    private final RepairShopRepository repairShopRepository;
    private final ElasticsearchOperations elasticsearchOperations;

    @Autowired
    public RepairShopServiceImpl(RepairShopRepository repairShopRepository,
                                 ElasticsearchOperations elasticsearchOperations) {
        this.repairShopRepository = repairShopRepository;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    @Override
    public RepairShop save(RepairShop repairShop) {
        return repairShopRepository.save(repairShop);
    }

    @Override
    public Optional<RepairShop> findById(String id) {
        return repairShopRepository.findById(id);
    }

    @Override
    public List<RepairShop> findAll() {
        List<RepairShop> shops = new ArrayList<>();
        repairShopRepository.findAll().forEach(shops::add);
        return shops;
    }

    @Override
    public Page<RepairShop> findAll(Pageable pageable) {
        return repairShopRepository.findAll(pageable);
    }

    @Override
    public void deleteById(String id) {
        repairShopRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return repairShopRepository.existsById(id);
    }

    @Override
    public long count() {
        return repairShopRepository.count();
    }

    @Override
    public List<RepairShop> findByName(String name) {
        return repairShopRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<RepairShop> findByMainCategory(String mainCategory) {
        return repairShopRepository.findByMainCategory(mainCategory);
    }

    @Override
    public List<RepairShop> findByCity(String city) {
        return repairShopRepository.findByCity(city);
    }

    @Override
    public List<RepairShop> findByPostalCode(String postalCode) {
        return repairShopRepository.findByPostalCode(postalCode);
    }

    @Override
    public List<RepairShop> findByMinimumRating(Float rating) {
        return repairShopRepository.findByRatingGreaterThanEqual(rating);
    }

    @Override
    public List<RepairShop> findByRatingRange(Float minRating, Float maxRating) {
        return repairShopRepository.findByRatingBetween(minRating, maxRating);
    }

    @Override
    public List<RepairShop> findByMinimumReviews(Integer minReviews) {
        return repairShopRepository.findByReviewsGreaterThanEqual(minReviews);
    }

    @Override
    public List<RepairShop> findOpenOn(String day) {
        return repairShopRepository.findByClosedOnNotContaining(day);
    }

    @Override
    public List<RepairShop> findByPhone(String phone) {
        return repairShopRepository.findByPhoneContaining(phone);
    }

    @Override
    public List<RepairShop> findByStatus(String status) {
        return repairShopRepository.findByStatus(status);
    }

    @Override
    public List<RepairShop> searchByText(String searchText) {
        return repairShopRepository.searchAcrossFields(searchText);
    }

    @Override
    public List<RepairShop> findNearbyShops(Double latitude, Double longitude, Double distanceInKm) {
        return repairShopRepository.findByGeoDistance(distanceInKm, latitude, longitude);
    }

    @Override
    public List<RepairShop> findByCategory(String category) {
        return repairShopRepository.findByCategoriesContaining(category);
    }

    @Override
    public void indexAllShops(List<RepairShop> shops) {
        repairShopRepository.saveAll(shops);
    }

    @Override
    public void reindexAll() {
        deleteIndex();
        createIndex();
    }

    @Override
    public void deleteIndex() {
        IndexOperations indexOps = elasticsearchOperations.indexOps(RepairShop.class);
        if (indexOps.exists()) {
            indexOps.delete();
        }
    }

    @Override
    public void createIndex() {
        IndexOperations indexOps = elasticsearchOperations.indexOps(RepairShop.class);
        if (!indexOps.exists()) {
            indexOps.create();
            indexOps.putMapping(indexOps.createMapping());
        }
    }
    @Override
    public Map<String, Object> searchByAttributes04NoFuss(Map<String, String> attributes, Pageable pageable) {
        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

        // Traitement spécial pour les champs courants
        if (attributes.containsKey("name") && !attributes.get("name").isEmpty()) {
            MatchQuery matchQuery = new MatchQuery.Builder()
                    .field("name")
                    .query(attributes.get("name"))
                    .operator(Operator.And)
                    .fuzziness("2") // Légère fuzziness pour flexibilité// Tous les termes doivent correspondre
                    .build();

            boolQueryBuilder.must(new Query.Builder().match(matchQuery).build());
        }

        if (attributes.containsKey("query") && !attributes.get("query").isEmpty()) {
            MatchQuery matchQuery = new MatchQuery.Builder()
                    .field("query")
                    .query(attributes.get("query"))
                    .operator(Operator.And)
                    .fuzziness("2") // Tous les termes doivent correspondre
                    .build();

            boolQueryBuilder.must(new Query.Builder().match(matchQuery).build());
        }

        // Pour workplace (un peu plus flexible)
        if (attributes.containsKey("city") && !attributes.get("city").isEmpty()) {
            String workplace = attributes.get("city");

            MatchQuery matchQuery = new MatchQuery.Builder()
                    .field("city")
                    .query(workplace)
                    .operator(Operator.And)
                    .fuzziness("2") // Tous les termes doivent correspondre
                    .build();

            boolQueryBuilder.must(new Query.Builder().match(matchQuery).build());
        }

        // Traitement des autres attributs
        for (Map.Entry<String, String> entry : attributes.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            if (!key.equals("name") && !key.equals("city") && !key.equals("query")
                    && value != null && !value.isEmpty()) {
                MatchQuery matchQuery = new MatchQuery.Builder()
                        .field(key)
                        .query(value)
                        .build();

                boolQueryBuilder.must(new Query.Builder().match(matchQuery).build());
            }
        }

        // Création de la requête finale
        BoolQuery builtBoolQuery = boolQueryBuilder.build();

        try {
            // Création de la requête avec pagination fournie par le client
            NativeQuery searchQuery = NativeQuery.builder()
                    .withQuery(q -> q.bool(builtBoolQuery))
                    .withPageable(pageable)  // Utilisation du Pageable fourni par le client
                    .withSort(Sort.by(Sort.Direction.DESC, "_score"))
                    .withTrackTotalHits(true) // 💥 Cette ligne est ESSENTIELLE pour obtenir le vrai total
                    .build();

            // Pour débogage - Affiche la requête générée
            // Décommenter si besoin de voir la requête exacte
            // System.out.println("DEBUG - Requête générée: " + searchQuery.toString());

            // Exécuter la recherche
            SearchHits<RepairShop> searchHits = elasticsearchOperations.search(searchQuery, RepairShop.class);

            // Récupérer le nombre total de résultats
            long totalHits = searchHits.getTotalHits();

            // Récupérer les résultats
            List<RepairShop> usersOnPage = searchHits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .collect(Collectors.toList());

            // Log pour débogage
            System.out.println("Page " + pageable.getPageNumber() + ": " + usersOnPage.size() + " résultats");
            System.out.println("Total résultats trouvés: " + totalHits);

            // Créer un Map contenant la page de résultats et le nombre total
            Map<String, Object> result = new HashMap<>();
            result.put("page", new PageImpl<>(usersOnPage, pageable, totalHits));
            result.put("totalResults", totalHits);

            return result;
        } catch (Exception e) {
            // Log détaillé de l'erreur
            System.err.println("Erreur lors de l'exécution de la requête Elasticsearch: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}