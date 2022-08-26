package com.capg.service;

import com.capg.entity.BookingSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;

    public int getSequenceNumber(String sequenceName) {

        BookingSequence counter = mongoOperations.findAndModify(Query.query(where("_id").is(sequenceName)),
                new Update().inc("sequence", 1),
                options().returnNew(true).upsert(true),
                BookingSequence.class);

        return !Objects.isNull(counter) ? counter.getSequence() : 1;
    }
}