package com.capg.repository;

import com.capg.entity.Flights;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlightRepository extends MongoRepository<Flights, Integer> {

}
