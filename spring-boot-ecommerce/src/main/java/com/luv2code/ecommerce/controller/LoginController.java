package com.luv2code.ecommerce.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.ecommerce.entity.AuthenticationBean;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth/v1")
public class LoginController {

	@GetMapping(path = "/authentication")
	public AuthenticationBean authentication() {
		System.out.println("in authentication");
		
		AuthenticationBean authenticationBean = new AuthenticationBean(null);
		authenticationBean.setMessage("Success");
		
		return authenticationBean;
	}
}
