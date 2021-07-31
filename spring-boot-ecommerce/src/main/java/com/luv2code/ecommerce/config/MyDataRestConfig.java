package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;




@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	//53 右鍵source 然後implement methods
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		
		
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		
		HttpMethod[] theUnsupportedAction = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		//disable HTTP methods for product : put, post, and delete???????????
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedAction))
			.withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedAction)); 
	
		//disable HTTP methods for productCategory : put, post, and delete???????????
		config.getExposureConfiguration()
			.forDomainType(ProductCategory.class)
			.withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedAction))
			.withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedAction)); 
	
		//call an internal helper method to expose the id
		exposeIds(config);
	
	
	
	}
	//幾乎都看不懂!!
	//we have the entity ID at the  productCategory level
	//so we have the id and the categoryName
	//so now our REST API is exposing the entity IDs and it gives us easy access to this data
	private void exposeIds(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		//expose entity ids
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		//- get a list of all entity classes from the entity manager
		List<Class> entityClasses = new ArrayList<>();
		
		//- get the entity types for the entities
		for(EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		//- expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}

	
}
