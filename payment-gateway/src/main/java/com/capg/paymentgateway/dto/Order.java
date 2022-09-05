package com.capg.paymentgateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    public Double price;
    public String currency;
    public String method;
    public String intent;
    public String description;
}
