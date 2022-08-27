package com.capg.service;

import com.capg.entity.Flights;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FlightsInfo {

    @Autowired
    private RestTemplate restTemplate;

    //@HystrixCommand(fallbackMethod = "getFallbackFlightDetails")
    public Flights getFlightDetails(int flightId) {
        Flights flights = restTemplate.getForObject("http://search-microservice/flights/get/" + flightId,
                Flights.class);
        return flights;
    }
}
