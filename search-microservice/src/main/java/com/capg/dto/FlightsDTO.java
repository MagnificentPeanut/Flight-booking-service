package com.capg.dto;

import com.capg.entity.Flights;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightsDTO {

    private int flightId;

    @NotBlank(message = "Flight name cannot be blank or null")
    @Size(min = 3, max = 30)
    private String flightName;

    @NotBlank(message = "Origin cannot be blank or null")
    @Size(min = 3, max = 30)
    private String origin;

    @NotBlank(message = "Destination cannot be blank or null")
    @Size(min = 3, max = 30)
    private String destination;

    @NotBlank(message = "Departure time cannot be blank or null")
    private String departureTime;

    @NotBlank(message = "Arrival time cannot be blank or null")
    private String arrivalTime;

    @NotNull
    private Integer seats;

    @NotNull
    private Integer fare;

    public FlightsDTO(Flights flights){
        this.flightId = flights.getFlightId();
        this.flightName = flights.getFlightName();
        this.origin = flights.getOrigin();
        this.destination = flights.getDestination();
        this.departureTime = flights.getDepartureTime();
        this.arrivalTime = flights.getArrivalTime();
        this.seats = flights.getSeats();
        this.fare = flights.getFare();
    }
}
