package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.State;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRespository extends JpaRepository<State	, Integer>  {

	//to retrieve states for a given country code
	// http://localhost:8080/api/states/search/findByCountryCodeCode?code=IN
	List<State> findByCountryCode(@Param("code") String code);
}
