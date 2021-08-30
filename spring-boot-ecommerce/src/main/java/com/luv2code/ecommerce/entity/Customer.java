package com.luv2code.ecommerce.entity;

import java.util.HashSet;
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

//Jpa 宣告此為要搜尋的table
@Entity
//Table名稱
@Table(name = "customer")
//lombok自動產生 我們自己寫就好(使用lombok記得Eclipse也要加入plugin
@Getter
@Setter
public class Customer {

	//其實可以不用寫Colummn 以filed的名稱作為對照表格的名稱 但養成習慣自己寫比較好! 比較清楚 也比較好維護
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "email")
	private String email;
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private Set<Order> orders =  new HashSet<Order>();
	
	
	public void add(Order order) {
		if(order != null) {
			if (orders == null) {
				orders = new HashSet<Order>();
			}
			orders.add(order);
			order.setCustomer(this);
		}
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public Set<Order> getOrders() {
		return orders;
	}
	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
