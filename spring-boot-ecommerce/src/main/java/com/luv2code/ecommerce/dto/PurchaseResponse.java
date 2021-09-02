package com.luv2code.ecommerce.dto;

import lombok.Data;
import lombok.NonNull;

//use this class to send back a java object json
//All together now: A shortcut for @ToString, @EqualsAndHashCode, 
//@Getter on all fields, @Setter on all non-final fields, and 
//@RequiredArgsConstructor!( ex private final String orderTrackingNumber 要有final
@Data
public class PurchaseResponse {

	
	

	private final String orderTrackingNumber;

	public PurchaseResponse(String orderTrackingNumber) {
		this.orderTrackingNumber = orderTrackingNumber;
	}

	
	//response沒有getter 得到406的http錯誤
	public String getOrderTrackingNumber() {
		return orderTrackingNumber;
	}

	


}
