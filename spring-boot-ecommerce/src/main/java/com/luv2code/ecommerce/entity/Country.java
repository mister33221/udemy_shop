package com.luv2code.ecommerce.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "country")
public class Country {

//	PK
	@Id
//	流水號
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	欄位名稱
	@Column(name = "id")
	private int id;
	@Column(name = "code")
	private String code;
	@Column(name = "name")
	private String name;
	
	//TODO: set up one to many with states
	//一對多 這邊用的mappedBy是使用java中的名稱 是country而非db中的名稱country_id
	@OneToMany(mappedBy = "country")
	@JsonIgnore //用了這個它就會在給予json格式時 忽略此項(就不會提供state的資料 
	private List<State> state;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<State> getState() {
		return state;
	}
	public void setState(List<State> state) {
		this.state = state;
	}
	

	
	
}
