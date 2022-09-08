package com.capg.service;

import com.capg.dto.FlightsDTO;

import java.util.List;
import java.util.Optional;

public interface FlightService {

    List<FlightsDTO> getFlights();
    FlightsDTO getFlight(Integer id);

    List<FlightsDTO> flightByOriginAndDestination(String origin, String destination);

    FlightsDTO newFlight(FlightsDTO flightsDTO);
    FlightsDTO updateFlight(Integer id, FlightsDTO flightsDTO);
    void deleteFlight(Integer id);
    void deleteAll();

}
