package com.capg.dto;

import com.capg.entity.BookingDetails;
import com.capg.entity.Flights;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailsDTO {

    private int bookingId;
    @NotBlank(message = "First name cannot be blank or null")
    @Size(min = 3, max = 30)
    private String firstName;
    @NotBlank(message = "Last name cannot be blank or null")
    @Size(min = 3, max = 30)
    private String lastName;
    @NotBlank(message = "Gender cannot be blank or null")
    @Size(min = 3, max = 30)
    private String gender;
    @Email(message = "Invalid email", regexp = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
    @NotBlank(message = "Email cannot be blank or null")
    private String email;
    @NotBlank(message = "Phone number cannot be blank or null")
    @Size(min = 10, max = 10)
    private String phoneNo;
    @NotNull
    private Integer requiredSeats;
    private int flightId;
    private Flights flights;

    private LocalDateTime bookedOn;
    private LocalDateTime updatedOn;

    public BookingDetailsDTO(BookingDetails bookingDetails) {
        this.bookingId = bookingDetails.getBookingId();
        this.firstName = bookingDetails.getFirstName();
        this.lastName = bookingDetails.getLastName();
        this.gender = bookingDetails.getGender();
        this.email = bookingDetails.getEmail();
        this.phoneNo = bookingDetails.getPhoneNo();
        this.requiredSeats = bookingDetails.getRequiredSeats();
        this.flightId = bookingDetails.getFlightId();
        this.flights = bookingDetails.getFlights();

        this.bookedOn = bookingDetails.getBookedOn();
        this.updatedOn = bookingDetails.getUpdatedOn();
    }
}
