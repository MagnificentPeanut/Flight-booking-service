package com.capg.exception;

public class FlightNotFoundException extends RuntimeException {

    public FlightNotFoundException (String message) {
        super(message);
    }
}
