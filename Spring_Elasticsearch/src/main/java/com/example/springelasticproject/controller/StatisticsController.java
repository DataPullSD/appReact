package com.example.springelasticproject.controller;

import com.example.springelasticproject.Services.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "*") // Permettre les requêtes CORS de votre frontend
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    /**
     * Endpoint pour obtenir les statistiques par département
     */
    @GetMapping("/departments")
    public ResponseEntity<List<Map<String, Object>>> getDepartmentStatistics(
            @RequestParam(defaultValue = "20") int limit) {
        Map<String, Long> stats = statisticsService.getDepartmentStatistics(limit);
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Endpoint pour obtenir les statistiques par région
     */
    @GetMapping("/regions")
    public ResponseEntity<List<Map<String, Object>>> getRegionStatistics() {
        Map<String, Long> stats = statisticsService.getRegionStatistics();
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Endpoint pour obtenir les statistiques par statut relationnel
     */
    @GetMapping("/relationship-status")
    public ResponseEntity<List<Map<String, Object>>> getRelationshipStatusStatistics() {
        Map<String, Long> stats = statisticsService.getRelationshipStatusStatistics();
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Endpoint pour obtenir les statistiques par genre
     */
    @GetMapping("/gender")
    public ResponseEntity<List<Map<String, Object>>> getGenderStatistics() {
        Map<String, Long> stats = statisticsService.getGenderStatistics();
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Endpoint pour obtenir les statistiques par ville
     */
    @GetMapping("/cities")
    public ResponseEntity<List<Map<String, Object>>> getCityStatistics(
            @RequestParam(defaultValue = "20") int limit) {
        Map<String, Long> stats = statisticsService.getCityStatistics(limit);
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Endpoint générique pour obtenir des statistiques par attribut personnalisé
     */
    @PostMapping("/custom")
    public ResponseEntity<List<Map<String, Object>>> getCustomStatistics(
            @RequestParam String attribute,
            @RequestBody List<String> values) {
        Map<String, Long> stats = statisticsService.getStatisticsByAttribute(attribute, values);
        List<Map<String, Object>> formattedStats = formatStatsForCharts(stats);
        return ResponseEntity.ok(formattedStats);
    }

    /**
     * Formate les statistiques pour être facilement utilisables par les graphiques frontend
     */
    private List<Map<String, Object>> formatStatsForCharts(Map<String, Long> stats) {
        return stats.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new java.util.HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("count", entry.getValue());
                    return item;
                })
                .collect(Collectors.toList());
    }
}