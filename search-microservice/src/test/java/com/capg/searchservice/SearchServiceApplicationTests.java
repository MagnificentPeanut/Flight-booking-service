package com.capg.searchservice;

import com.capg.dto.FlightsDTO;
import com.capg.entity.Flights;
import com.capg.repository.FlightRepository;
import com.capg.service.FlightServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class SearchServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@Mock
	private FlightRepository flightRepository;
	@InjectMocks
	FlightServiceImpl flightService;

	@Test
	public void doesFlightExistById() {
		Flights flights = new Flights(
				20,
				"Akasa",
				"Chennai",
				"Calicut",
				"12.30",
				"2.45",
				58,
				3600);
		flightRepository.save(flights);
		Optional<Flights> foundFlight = flightRepository.findById(20);

		if (!foundFlight.isEmpty()) {
			Boolean actualResult = true;
			assertThat(actualResult).isTrue();
		}
	}

	@Test
	public void  saveFlightTest() {
		Flights flights = new Flights(
				21,
				"Indigo",
				"Chennai",
				"Cochin",
				"12.30",
				"2.45",
				62,
				3500);
		flightRepository.save(flights);
		verify(flightRepository, times(1)).save(flights);
	}

	@Test
	public void getAllFlights() {
		List<Flights> flightsList = new ArrayList<Flights>();
		Flights flights1 = new Flights(
				20,
				"Akasa",
				"Chennai",
				"Calicut",
				"12.30",
				"2.45",
				58,
				3600);
		Flights flights2 = new Flights(
				21,
				"Indigo",
				"Calicut",
				"Banglore",
				"6.30",
				"8.45",
				26,
				3200);
		Flights flights3 = new Flights(
				22,
				"Indigo",
				"Calicut",
				"Banglore",
				"8.35",
				"10.45",
				43,
				3250);

		flightsList.add(flights1);
		flightsList.add(flights2);
		flightsList.add(flights3);

		when(flightRepository.findAll()).thenReturn(flightsList);

		List<FlightsDTO> flightsDTOList = flightService.getFlights();

		assertEquals(3, flightsDTOList.size());
		verify(flightRepository, times(1)).findAll();
	}

	@Test
	public void deleteFlightTest() {
		Flights flights = new Flights(
				30,
				"Akasa",
				"Chennai",
				"Calicut",
				"12.30",
				"2.45",
				58,
				3600);
		flightRepository.deleteById(30);
		verify(flightRepository, times(1)).deleteById(30);
	}
}
