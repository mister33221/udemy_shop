package com.luv2code.ecommerce.dto;

import lombok.Data;
import lombok.NonNull;

//use this class to send back a java object json
//All together now: A shortcut for @ToString, @EqualsAndHashCode, 
//@Getter on all fields, @Setter on all non-final fields, and 
//@RequiredArgsConstructor!( ex private final String orderTrackingNumber 要有final
@Data

public class PurchaseResponse {

	
	

	private String orderTrackingNumber;

	
	
	public PurchaseResponse(String orderTrackingNumber ) {
		this.orderTrackingNumber = orderTrackingNumber;
		// TODO Auto-generated constructor stub
	}

	public String getOrderTrackingNumber() {
		return orderTrackingNumber;
	}

	public void setOrderTrackingNumber(String orderTrackingNumber) {
		this.orderTrackingNumber = orderTrackingNumber;
	}



}
