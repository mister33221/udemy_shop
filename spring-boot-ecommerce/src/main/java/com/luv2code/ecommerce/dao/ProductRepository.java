package com.luv2code.ecommerce.dao;



import java.util.List;

import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;


//這樣才能從8080轉到4200
@CrossOrigin("http://localhost:4200")
//extends JpaRepository<Entity型別, PK型別 >
public interface ProductRepository extends JpaRepository<Product, Long > {

	//page(import org.springframework.data.domain.Page;)
	//pageable(import org.springframework.data.domain.Pageable;)
	//spring會依照我們的方法名稱 findBy   CategoryId 自動產生query 找到我們提供的@RequestParam("id") 
	// spring 依照方法名稱自動產生query   -Select * from product where category_id = ?

	Page<Product> findByCategoryId(@RequestParam("id") Long id , Pageable pageable);
	
	
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
	
	
	List<Product> findAll();
}
