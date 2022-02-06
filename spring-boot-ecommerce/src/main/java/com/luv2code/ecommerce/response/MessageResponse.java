package com.luv2code.ecommerce.response;

import lombok.Data;

@Data
public class MessageResponse {

	private String message;

	public MessageResponse(String message) {
		super();
		this.message = message;
	}
	
	
	
}
