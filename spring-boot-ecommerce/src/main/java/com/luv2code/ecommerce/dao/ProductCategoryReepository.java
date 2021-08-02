package com.luv2code.ecommerce.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.ProductCategory;


@CrossOrigin("http://localhost:4200")
//???????? collectionResourceRel=name of json entry, path=/product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryReepository extends JpaRepository<ProductCategory, Long> {


}
