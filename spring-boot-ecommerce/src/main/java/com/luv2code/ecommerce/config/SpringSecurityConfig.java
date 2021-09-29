package com.luv2code.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().
		disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS, "/**")
			.permitAll()
			.anyRequest()
			.authenticated()
			.and()
          .httpBasic();
	}
	
	
    //停用spring security
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//    	 http.csrf().
//    	 disable().
//    	 authorizeRequests().
//    	 anyRequest().
//    	 permitAll().
//    	 and().
//    	 logout().
//    	 permitAll();
//    }
    
	
}
