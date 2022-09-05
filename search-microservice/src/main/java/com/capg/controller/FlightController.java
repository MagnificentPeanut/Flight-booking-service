package com.capg.controller;

import com.capg.dto.FlightsDTO;
import com.capg.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    @PostMapping("/create")
    public ResponseEntity<FlightsDTO> createFlight(@Valid @RequestBody FlightsDTO flightsDTO) {
        return new ResponseEntity<FlightsDTO>(flightService.newFlight(flightsDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public List<FlightsDTO> flights(){
        return flightService.getFlights();
    }

    @GetMapping("/get/{id}")
    public FlightsDTO flightById(@PathVariable Integer id) {
        return flightService.getFlight(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FlightsDTO> update(@PathVariable Integer id, @Valid @RequestBody FlightsDTO flightsDTO) {
        return new ResponseEntity<FlightsDTO>(flightService.updateFlight(id, flightsDTO), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        flightService.deleteFlight(id);
        return "Flight with ID: " + id + " was deleted successfully";
    }

    @DeleteMapping("/deleteAll")
    public String deleteAll() {
        flightService.deleteAll();
        return "All flights were deleted successfully";
    }
}
