package com.capg.service;

import com.capg.dto.BookingDetailsDTO;
import com.capg.entity.BookingDetails;
import com.capg.exception.BookingIdNotFoundException;
import com.capg.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    //Get details of all booked flights
    @Override
    public List<BookingDetailsDTO> getBookingDetails() {
        List<BookingDetails> bookingDetails = bookingRepository.findAll();
        return bookingDetails.stream().map(BookingDetailsDTO::new).collect(Collectors.toList());
    }

    //Get booking details for given booking id
    @Override
    public BookingDetailsDTO getBookingDetailsById(Integer id) {
        BookingDetails bookingDetails = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingIdNotFoundException("Booking details do not exist for id: " + id));
        return new BookingDetailsDTO(bookingDetails);
    }

    //Book new flight
    @Override
    public BookingDetailsDTO newBooking(BookingDetailsDTO bookingDetailsDTO) {
        BookingDetails bookingDetails = new BookingDetails(bookingDetailsDTO);
        bookingDetails.setBookingId(sequenceGeneratorService.getSequenceNumber(BookingDetails.SEQUENCE_NAME));
        bookingDetails.bookedTime();
        bookingDetails.updatedTime();
        return new BookingDetailsDTO(bookingRepository.save(bookingDetails));
    }

    //Update booking details
    @Override
    public BookingDetailsDTO updateBookingDetails(Integer id, BookingDetailsDTO bookingDetailsDTO) {
        BookingDetails bookingDetails = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingIdNotFoundException("Booking details do not exist for id: " + id));

        Optional<BookingDetails> optionalBookingDetails = bookingRepository.findById(id);
        bookingRepository.delete(bookingDetails);

        if (optionalBookingDetails.isPresent()) {
            BookingDetails bookingSave = optionalBookingDetails.get();

            bookingSave.setBookingId(bookingDetails.getBookingId());
            bookingSave.setFirstName(bookingDetailsDTO.getFirstName() != null ? bookingDetailsDTO.getFirstName() : bookingSave.getFirstName());
            bookingSave.setLastName(bookingDetailsDTO.getLastName() != null ? bookingDetailsDTO.getLastName() : bookingSave.getLastName());
            bookingSave.setGender(bookingDetailsDTO.getGender() != null ? bookingDetailsDTO.getGender() : bookingSave.getGender());
            bookingSave.setEmail(bookingDetailsDTO.getEmail() != null ? bookingDetailsDTO.getEmail() : bookingSave.getEmail());
            bookingSave.setPhoneNo(bookingDetailsDTO.getPhoneNo() != null ? bookingDetailsDTO.getPhoneNo() : bookingSave.getPhoneNo());
            bookingSave.setRequiredSeats(bookingDetailsDTO.getRequiredSeats() != null ? bookingDetailsDTO.getRequiredSeats() : bookingSave.getRequiredSeats());

            bookingSave.setBookedOn(bookingDetails.getBookedOn());
            bookingSave.updatedTime();
            bookingRepository.save(bookingSave);
            return new BookingDetailsDTO(bookingSave);
        }
        return new BookingDetailsDTO(bookingDetails);
    }

    //Delete booking details for given id
    @Override
    public void deleteBookingDetailsById(Integer id) {
        BookingDetails bookingDetails = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingIdNotFoundException("Booking details do not exist for id: " + id));
        bookingRepository.delete(bookingDetails);
    }

    //Delete all booking data
    @Override
    public void deleteAll() {
        bookingRepository.deleteAll();
    }
}
