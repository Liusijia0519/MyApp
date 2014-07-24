package com.gary.operation.domain;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class SystemDepartment {

	/* in database */
	private String id;
	
	private String departmentName;
	
	private Date createDate;
	
	private String parentId;

	private int index;
	
	private boolean leaf;

	private boolean availabl;
	
	/* extend */
	private String text;

	@JsonInclude(Include.NON_EMPTY)  
	private List<SystemDepartment> children;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
	public List<SystemDepartment> getChildren() {
		return children;
	}

	public void setChildren(List<SystemDepartment> children) {
		this.children = children;
	}
	
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isAvailabl() {
		return availabl;
	}

	public void setAvailabl(boolean availabl) {
		this.availabl = availabl;
	}
	
}
