package com.capg.controller;

import com.capg.dto.BookingDetailsDTO;
import com.capg.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<BookingDetailsDTO> bookFlight(@Valid @RequestBody BookingDetailsDTO bookingDetailsDTO) {
        return new ResponseEntity<BookingDetailsDTO>(bookingService.newBooking(bookingDetailsDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public List<BookingDetailsDTO> bookingDetails() {
        return bookingService.getBookingDetails();
    }

    @GetMapping("/get/{id}")
    public BookingDetailsDTO bookingDetailsById(@PathVariable Integer id) {
        return bookingService.getBookingDetailsById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookingDetailsDTO> update(@PathVariable Integer id, @Valid @RequestBody BookingDetailsDTO bookingDetailsDTO) {
        return new ResponseEntity<BookingDetailsDTO>(bookingService.updateBookingDetails(id, bookingDetailsDTO), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        bookingService.deleteBookingDetailsById(id);
        return "Booking details with ID: " + id + " was deleted successfully";
    }

    @DeleteMapping("/deleteAll")
    public String deleteAll() {
        bookingService.deleteAll();
        return "All booking data was deleted successfully";
    }
}
