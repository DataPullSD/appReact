package com.example.springelasticproject.controller;


import com.example.springelasticproject.Services.ExportService;
import com.example.springelasticproject.model.User;
import com.example.springelasticproject.Services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "*") // Permet les requêtes cross-origin (important pour React)
// Autorise les requêtes provenant de l'application React
public class UserController {



    private final UserService userService;
    private final ExportService exportService;


    @Autowired
    public UserController(UserService userService, ExportService exportService) {
        this.userService = userService;
        this.exportService = exportService;
    }

    // Récupérer tous les utilisateurs
    @GetMapping("")
    public Iterable<User> getAllUsers() {
        return userService.findAllUsers();
    }

    // Créer un nouvel utilisateur
    @PostMapping("")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Mettre à jour un utilisateur existant
    @PutMapping("/update")
    public User updateUser(@RequestBody User user) throws Exception {
        if (user.getUserId() != 0) {
            return userService.saveUser(user);
        }
        throw new Exception("Id is required");
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Deleted");
    }

    // Recherche par prénom ou nom
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam(value = "firstName", required = false) String firstName,
                                  @RequestParam(value = "lastName", required = false) String lastName) {
        return userService.searchUsersByFirstNameOrLastName(firstName, lastName);
    }

    // Trouver un utilisateur par ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long userId) {
        Optional<User> user = userService.findUserById(userId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/import")
    public ResponseEntity<String> importCsv(@RequestParam("file") MultipartFile file) {
        try {
            File tempFile = File.createTempFile("upload", ".csv");
            file.transferTo(tempFile);
            userService.importCsv(tempFile);
            return ResponseEntity.ok("Import terminé");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'import : " + e.getMessage());
        }
    }

    @GetMapping("/countUsers")
    public ResponseEntity<Long> countUsers() {
        long count = userService.countUsers();
        return ResponseEntity.ok(count);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllUsers() {
        userService.deleteAllUsers();
        return ResponseEntity.ok("All users deleted");
    }

    // Endpoint pour effectuer une recherche dynamique
    @PostMapping("/searchByA")
    public List<User> searchUsers(@RequestBody Map<String, String> attributes) {
        return userService.searchByAttributes(attributes);
    }
    // Endpoint pour effectuer une recherche dynamique
    @PostMapping("/searchByA01")
    public List<User> searchUsers01(@RequestBody Map<String, String> attributes) {
        return userService.searchByAttributes01(attributes);
    }

    @PostMapping("/count")
    public ResponseEntity<Long> countUsers(@RequestBody Map<String, String> searchCriteria) {
        try {
            List<User> users = userService.searchByAttributes(searchCriteria);
            return new ResponseEntity<>((long) users.size(), HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error counting users: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }
    @PostMapping("/searchByA02")
    public ResponseEntity<Page<User>> searchUsers01(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        Page<User> users = userService.searchByAttributes02(attributes, pageable);

        return ResponseEntity.ok(users);
    }


    @PostMapping("/searchByA03")
    public ResponseEntity<Page<User>> searchUsers03(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10000") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        // Création de l'objet Pageable avec les paramètres fournis
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        // Appel du service avec les paramètres de pagination
        Page<User> users = userService.searchByAttributes03(attributes, pageable);

        return ResponseEntity.ok(users);
    }

    @PostMapping("/searchByA04")
    public ResponseEntity<Map<String, Object>> searchUsersByAttribute(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10000") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        // Création de l'objet Pageable pour la pagination
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));


        // Création d'une Map avec l'attribut de recherche


        // Appel à la méthode de recherche
        Map<String, Object> searchResults = userService.searchByAttributes04(attributes, pageable);


        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/protectedData/{idS}")
    public ResponseEntity<Map<String, String>> getProtectedData(
            @PathVariable("idS") Long idS,
            @RequestParam("type") String type) {

        String value = userService.getProtectedData(idS, type);
        return ResponseEntity.ok(Map.of("value", value));
    }
    @PostMapping("/searchByA04NoFus")
    public ResponseEntity<Map<String, Object>> searchByAttributes04NoFus(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10000") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        // Création de l'objet Pageable pour la pagination
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        // Appel à la méthode de recherche
        Map<String, Object> searchResults = userService.searchByAttributes04NoFus(attributes, pageable);


        return ResponseEntity.ok(searchResults);
    }
    @PostMapping("/searchByA04NoFusNumb")
    public ResponseEntity<Long> searchByAttributes04NoFusnumb(
            @RequestBody Map<String, String> attributes,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10000") int size,
            @RequestParam(defaultValue = "_score") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        // Création de l'objet Pageable pour la pagination
        Sort.Direction sortDirection = direction.equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        // Appel à la méthode de recherche
       Long searchResults = userService.searchByAttributes04NoFusNumb(attributes, pageable);


        return ResponseEntity.ok(searchResults);
    }


    @PostMapping("/search/advanced")
    public ResponseEntity<Map<String, Object>> advancedSearch(@RequestBody AdvancedSearchRequest request) {
        try {
            // Créer l'objet Pageable à partir des paramètres de pagination
            Pageable pageable = PageRequest.of(
                    request.getPage() != null ? request.getPage() : 0,
                    request.getSize() != null ? request.getSize() : 10
            );

            // Effectuer la recherche avec les filtres fournis
            Map<String, Object> searchResults = userService.searchWithMultipleFilters(
                    request.getGender(),
                    request.getDepartments(),
                    request.getRegions(),
                    request.getCities(),
                    request.getAdditionalAttributes(),
                    pageable
            );

            // Extraire les résultats
            Page<User> userPage = (Page<User>) searchResults.get("page");
            long totalResults = (long) searchResults.get("totalResults");

            // Construire la réponse
            Map<String, Object> response = new HashMap<>();
            response.put("content", userPage.getContent());
            response.put("currentPage", userPage.getNumber());
            response.put("totalItems", totalResults);
            response.put("totalPages", userPage.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la recherche: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/export-csvPS")
    public void exportUsersToCsv(@RequestBody Map<String, String> attributes, HttpServletResponse response) throws IOException {
        exportService.ExportSeachDataPS(attributes ,response); // méthode modifiée pour retourner une liste
    }

    @PostMapping("/export-csvMS")
    public void searchAndExportUsersToCsv(@RequestBody AdvancedSearchRequest request, HttpServletResponse response) throws IOException {
        exportService.ExportSeachDataMS(
                request.getGender(),
                request.getDepartments(),
                request.getRegions(),
                request.getCities(),
                request.getAdditionalAttributes(),
                response
        );
    }








}
class AdvancedSearchRequest {
    private String gender;
    private List<String> departments;
    private List<String> regions;
    private List<String> cities;
    private Map<String, String> additionalAttributes;
    private Integer page;
    private Integer size;

    public List<String> getCities() {
        return cities;
    }

    public void setCities(List<String> cities) {
        this.cities = cities;
    }

    // Getters et Setters
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<String> getDepartments() {
        return departments;
    }

    public void setDepartments(List<String> departments) {
        this.departments = departments;
    }

    public List<String> getRegions() {
        return regions;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }

    public Map<String, String> getAdditionalAttributes() {
        return additionalAttributes;
    }

    public void setAdditionalAttributes(Map<String, String> additionalAttributes) {
        this.additionalAttributes = additionalAttributes;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}

