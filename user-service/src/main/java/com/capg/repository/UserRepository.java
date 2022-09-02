package com.capg.repository;

import com.capg.entity.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserData, Integer> {

    Optional<UserData> getUserDataByEmail(String email);

    Optional<UserData> getUserDataByUsername(String username);
}
