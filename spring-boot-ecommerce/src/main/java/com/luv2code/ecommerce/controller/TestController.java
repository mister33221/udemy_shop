package com.luv2code.ecommerce.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

	@Operation(summary = "測試公開資源", security = @SecurityRequirement(name = "Bearer Authentication"))
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@Operation(summary = "測試用戶資源", security = @SecurityRequirement(name = "Bearer Authentication"))
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@Operation(summary = "測試管理員資源", security = @SecurityRequirement(name = "Bearer Authentication"))
	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@Operation(summary = "測試管理員資源", security = @SecurityRequirement(name = "Bearer Authentication"))
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
	
}
