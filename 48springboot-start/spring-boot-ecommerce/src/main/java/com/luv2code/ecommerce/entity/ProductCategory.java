package com.luv2code.ecommerce.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_category")
//@Data -- known bug 當我們使用One to meny或 Many to one的時候會有bug 所以改用
@Getter
@Setter
public class ProductCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	@Column(name = "category_name")
	private String categoryName;
	@OneToMany(cascade = CascadeType.ALL,
				mappedBy = "category")
	private Set<Product> products;
	
}
