package com.gary.operation.domain;

import java.util.List;

public class SystemMenu {

	/* in database */
	private String id;
	
	private String menuName;
	
	private String menuClass;
	
	private String extController;
	
	private String springController;
	
	private boolean leaf;
	
	private String icon16;
	
	private String icon24;
	
	private String icon32;
	
	private String icon48;
	
	private int index;
	
	private String parentId;
	
	/* extend */
	private String text;

	private List<SystemMenu> children;
	
	private boolean used = false;

	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean used) {
		this.used = used;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getMenuClass() {
		return menuClass;
	}

	public void setMenuClass(String menuClass) {
		this.menuClass = menuClass;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getIcon16() {
		return icon16;
	}

	public void setIcon16(String icon16) {
		this.icon16 = icon16;
	}

	public String getIcon24() {
		return icon24;
	}

	public void setIcon24(String icon24) {
		this.icon24 = icon24;
	}

	public String getIcon32() {
		return icon32;
	}

	public void setIcon32(String icon32) {
		this.icon32 = icon32;
	}

	public String getIcon48() {
		return icon48;
	}

	public void setIcon48(String icon48) {
		this.icon48 = icon48;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
	public List<SystemMenu> getChildren() {
		return children;
	}

	public void setChildren(List<SystemMenu> children) {
		this.children = children;
	}
	
	public String getExtController() {
		return extController;
	}

	public void setExtController(String extController) {
		this.extController = extController;
	}

	public String getSpringController() {
		return springController;
	}

	public void setSpringController(String springController) {
		this.springController = springController;
	}
	
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
}
