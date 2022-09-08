package com.capg.service;

import com.capg.dto.FlightsDTO;
import com.capg.entity.Flights;
import com.capg.exception.FlightNotFoundException;
import com.capg.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightService{

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    //Get all flight details
    @Override
    public List<FlightsDTO> getFlights() {
        List<Flights> flights = flightRepository.findAll();
        return flights.stream().map(FlightsDTO::new).collect(Collectors.toList());
    }
    //Find flight by ID
    @Override
    public FlightsDTO getFlight(Integer id) {
        Flights flights = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight does not exist with id: " + id));
        return new FlightsDTO(flights);
    }

    @Override
    public List<FlightsDTO> flightByOriginAndDestination(String origin, String destination) {
        List<Flights> flights = flightRepository.findBy(origin, destination);
        return flights.stream().map(FlightsDTO::new).collect(Collectors.toList());
    }

    //Create new flight
    @Override
    public FlightsDTO newFlight(FlightsDTO flightsDTO) {
        Flights flights = new Flights(flightsDTO);
        flights.setFlightId(sequenceGeneratorService.getSequenceNumber(Flights.SEQUENCE_NAME));
        return new FlightsDTO(flightRepository.save(flights));
    }
    //Update flight
    @Override
    public FlightsDTO updateFlight(Integer id, FlightsDTO flightsDTO) {
        Flights flights = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight does not exist with id: " + id));

        Optional<Flights> optionalFlights = flightRepository.findById(id);
        flightRepository.delete(flights);

        if (optionalFlights.isPresent()) {
            Flights flightsSave = optionalFlights.get();

            flightsSave.setFlightId(flights.getFlightId());
            flightsSave.setFlightName(flightsDTO.getFlightName() != null ? flightsDTO.getFlightName() : flightsSave.getFlightName());
            flightsSave.setOrigin(flightsDTO.getOrigin() != null ? flightsDTO.getOrigin() : flightsSave.getOrigin());
            flightsSave.setDestination(flightsDTO.getDestination() != null ? flightsDTO.getDestination() : flightsSave.getDestination());
            flightsSave.setDepartureTime(flightsDTO.getDepartureTime() != null ? flightsDTO.getDepartureTime() : flightsSave.getDepartureTime());
            flightsSave.setArrivalTime(flightsDTO.getArrivalTime() != null ? flightsDTO.getArrivalTime() : flightsSave.getArrivalTime());
            flightsSave.setSeats(flightsDTO.getSeats() != null ? flightsDTO.getSeats() : flightsSave.getSeats());
            flightsSave.setFare(flightsDTO.getFare() != null ? flightsDTO.getFare() : flightsSave.getFare());

            flightRepository.save(flightsSave);
            return new FlightsDTO(flightsSave);
        }
        return new FlightsDTO(flights);
    }
    //Delete flight with given ID
    @Override
    public void deleteFlight(Integer id) {
        Flights flights = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight does not exist with id: " + id));
        flightRepository.delete(flights);
    }
    //Delete all flights
    @Override
    public void deleteAll() {
        flightRepository.deleteAll();
    }
}
