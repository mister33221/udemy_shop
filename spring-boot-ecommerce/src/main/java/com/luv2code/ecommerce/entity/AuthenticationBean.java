package com.luv2code.ecommerce.entity;

//create an authenticationBean, which is used to return a success message to client
public class AuthenticationBean {

	
	public String message;
	
	public AuthenticationBean(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		//%s是甚麼意思??
		return String.format("HelloWorldBean [message=%s]", message);
	}
	
	
	
	
}
