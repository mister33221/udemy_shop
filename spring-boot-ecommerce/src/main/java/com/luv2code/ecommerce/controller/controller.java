package com.luv2code.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.luv2code.ecommerce.dao.ProductCategoryReepository;
import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

@Controller
@CrossOrigin("http://localhost:4200")
public class controller {

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ProductCategoryReepository productCategoryReepository;
	
	@GetMapping("/findAllProduct")
	public String findAllProduct() {
		List<Product> productList = new ArrayList<Product>();
		productList = productRepository.findAll();
		
		for (int i = 0; i < productList.size(); i++) {
			System.out.println(productList.get(i).getName());
		}
		
		return "";
	}
	
	@GetMapping("/findAllCategory")
	public String findAllCategory() {
		List<ProductCategory> productCategoryList = new ArrayList<ProductCategory>();
		productCategoryList = productCategoryReepository.findAll();
		
		for (int i = 0; i < productCategoryList.size(); i++) {
			System.out.println(productCategoryList.get(i).getCategoryName());
		}
		
		return "";
	}

}
