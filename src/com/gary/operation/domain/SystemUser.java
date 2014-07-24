package com.gary.operation.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SystemUser {

	private String id;
	
	private String username;
	
	private String realName;
	
	@JsonIgnore()
	private String password;
	
	private String email;
	
	private String phone;
	
	private String gender;
	
	private Date createDate;
	
	private String departmentID;
	
	private String departmentName;

	private String pinyinCode;
	
	private String[] roles;
	
	// lock  normal
	private String state;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	public String getDepartmentID() {
		return departmentID;
	}

	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	
	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	public String getPinyinCode() {
		return pinyinCode;
	}

	public void setPinyinCode(String pinyinCode) {
		this.pinyinCode = pinyinCode;
	}
	
	public String[] getRoles() {
		return roles;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
}
