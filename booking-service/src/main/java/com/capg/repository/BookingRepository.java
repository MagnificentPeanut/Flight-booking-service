package com.capg.repository;

import com.capg.entity.BookingDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<BookingDetails, Integer>{
}
