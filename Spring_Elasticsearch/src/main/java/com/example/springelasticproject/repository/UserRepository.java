package com.example.springelasticproject.repository;

import com.example.springelasticproject.model.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface UserRepository extends ElasticsearchRepository<User,Long> {
    // Recherche par prénom
    List<User> findByFirstNameContaining(String firstName);

    // Recherche par nom
    List<User> findByLastNameContaining(String lastName);

    // Recherche par prénom ou nom
    List<User> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}
