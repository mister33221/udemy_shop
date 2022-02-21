package com.luv2code.ecommerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.luv2code.ecommerce.config.jwt.AuthEntryPointJwt;
import com.luv2code.ecommerce.config.jwt.AuthTokenFilter;
import com.luv2code.ecommerce.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// securedEnabled = true,
		// jsr250Enabled = true,
		prePostEnabled = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

//	protected void configure(HttpSecurity http) throws Exception {
//		http.csrf().
//		disable()
//			.authorizeRequests()
//			.antMatchers(HttpMethod.OPTIONS, "/**")
//			.permitAll()
//			.anyRequest()
//			.authenticated()
//			.and()
//          .httpBasic();
//	}

	// 停用spring security
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

	private final UserDetailsServiceImpl userDetailsService;

	private AuthEntryPointJwt unauthorizedHandler;

	public SpringSecurityConfig(UserDetailsServiceImpl userDetailsService, AuthEntryPointJwt unauthorizedHandler) {
		super();
		this.userDetailsService = userDetailsService;
		this.unauthorizedHandler = unauthorizedHandler;
	}

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
		.antMatchers("/api/auth/**").permitAll()
		.antMatchers("/api/test/**").permitAll()
		.antMatchers("/api/**").permitAll()
		
//		// 所有/trace/user/ 的所有請求 都放行
//		.antMatchers("/trace/users/**").permitAll()
//		// swagger start 改用下面的public void configure(WebSecurity web)比較簡短 也可以分開寫 比較清楚
//		.antMatchers("/swagger-ui/**").permitAll()
//		.antMatchers("/swagger-ui.html").permitAll()
//		.antMatchers("/swagger-resources/**").permitAll()
//		.antMatchers("/images/**").permitAll()
//		.antMatchers("/webjars/**").permitAll()
//		.antMatchers("/v3/api-docs").permitAll()
//		.antMatchers("/v3/api-docs/**").permitAll()
//		.antMatchers("/configuration/ui").permitAll()
//		.antMatchers("/configuration/security").permitAll()
//		
		.anyRequest()
		.authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}


	//swagger 網址 http://localhost:8080/swagger-ui.html
	//允許swagger 不需要通過security  可以開啟畫面 但還是顯示Failed to load remote configuration.
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**",
        							"/v3/api-docs/**");
    }

}
